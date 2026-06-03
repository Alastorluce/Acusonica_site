import { useEffect, useRef, useState } from "react";
import { getAmbientAudioSource } from "./audioSources";
import { applyPulseToContactLogo } from "./audioVisualSync";

export default function AmbientAudioController({ contactLogoRef }) {
  const [audioSource] = useState(() => getAmbientAudioSource());
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const cacheControllerRef = useRef(null);
  const hasStartedRef = useRef(false);
  const isStartingRef = useRef(false);
  const hasAnalyzerStartedRef = useRef(false);
  const previousBassRef = useRef(0);
  const transientPeakRef = useRef(0);

  useEffect(() => {
    const isMobileAudio = window.matchMedia("(max-width: 768px)").matches;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const constrainedConnection = Boolean(
      connection &&
      (connection.saveData || ["slow-2g", "2g", "3g"].includes(connection.effectiveType))
    );

    const targetVolume = isMobileAudio ? 0.2 : 0.22;
    const analyzerInterval = constrainedConnection ? 120 : isMobileAudio ? 84 : 0;

    const emitPulse = (pulse) => {
      applyPulseToContactLogo(contactLogoRef, pulse);
    };

    const clearAnimation = () => {
      if (!animationRef.current) {
        return;
      }

      if (analyzerInterval > 0 || document.hidden) {
        window.clearTimeout(animationRef.current);
      } else {
        window.cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = null;
    };

    const clearFade = () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };

    const removeStartListeners = () => {
      document.removeEventListener("pointerdown", startAudio, true);
      document.removeEventListener("touchstart", startAudio, true);
      document.removeEventListener("keydown", startAudio, true);
    };

    const addStartListeners = () => {
      document.addEventListener("pointerdown", startAudio, {
        capture: true,
        passive: true,
        once: false,
      });
      document.addEventListener("touchstart", startAudio, {
        capture: true,
        passive: true,
        once: false,
      });
      document.addEventListener("keydown", startAudio, true);
    };

    const injectAudioPreload = () => {
      const existing = document.querySelector('link[data-acusonica-audio="true"]');

      if (existing) {
        return;
      }

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "audio";
      link.href = audioSource;
      link.type = "audio/mpeg";
      link.setAttribute("data-acusonica-audio", "true");
      document.head.appendChild(link);
    };

    const warmAudioElement = () => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      audio.loop = true;
      audio.muted = false;
      audio.playsInline = true;
      audio.preload = "auto";
      audio.src = audioSource;
      audio.load();
    };

    const cacheAudioAfterStart = () => {
      if (!window.fetch || cacheControllerRef.current) {
        return;
      }

      const run = async () => {
        const controller = new AbortController();
        cacheControllerRef.current = controller;

        try {
          await fetch(audioSource, {
            cache: "force-cache",
            signal: controller.signal,
          });
        } catch (error) {
          if (controller.signal.aborted) {
            return;
          }
        }
      };

      window.setTimeout(run, isMobileAudio ? 3500 : 1800);
    };

    const startFade = (audio) => {
      const fadeDuration = isMobileAudio ? 360 : 760;
      const steps = isMobileAudio ? 12 : 24;
      const stepTime = fadeDuration / steps;
      const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
      const volumeStep = (targetVolume - startVolume) / steps;
      let currentStep = 0;

      clearFade();

      fadeIntervalRef.current = window.setInterval(() => {
        currentStep += 1;
        audio.volume = Math.min(targetVolume, startVolume + volumeStep * currentStep);

        if (currentStep >= steps) {
          audio.volume = targetVolume;
          clearFade();
        }
      }, stepTime);
    };

    const startAnalyzer = async (audio) => {
      if (hasAnalyzerStartedRef.current) {
        return;
      }

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      hasAnalyzerStartedRef.current = true;

      const audioContext = audioContextRef.current || new AudioContextClass({
        latencyHint: "interactive",
      });

      audioContextRef.current = audioContext;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      if (!sourceRef.current) {
        sourceRef.current = audioContext.createMediaElementSource(audio);
      }

      if (!analyserRef.current) {
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = isMobileAudio ? 0.72 : 0.62;

        sourceRef.current.connect(analyser);
        analyser.connect(audioContext.destination);
        analyserRef.current = analyser;
      }

      const analyser = analyserRef.current;
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      const bassWeights = [
        3.6,
        3.2,
        2.8,
        2.3,
        1.8,
        1.4,
        1.1,
        0.8,
        0.6,
        0.45,
        0.3,
        0.2,
        0.15,
      ];
      const weightSum = bassWeights.reduce((sum, value) => sum + value, 0);

      const analyzeBass = () => {
        if (!hasStartedRef.current) {
          emitPulse(1);
          return;
        }

        if (document.hidden || audio.paused || audio.readyState < 2) {
          emitPulse(1);
          animationRef.current = window.setTimeout(analyzeBass, 300);
          return;
        }

        analyser.getByteFrequencyData(frequencyData);

        let weightedBassSum = 0;

        for (let index = 0; index < bassWeights.length; index += 1) {
          weightedBassSum += frequencyData[index + 1] * bassWeights[index];
        }

        const weightedBassAverage = weightedBassSum / weightSum;
        const bassLevel = weightedBassAverage / 255;
        const bassRise = Math.max(0, bassLevel - previousBassRef.current);

        previousBassRef.current = previousBassRef.current * 0.66 + bassLevel * 0.34;

        const transientAmount = Math.min(1, bassRise * 6.4);

        transientPeakRef.current = Math.max(
          transientAmount,
          transientPeakRef.current * 0.88
        );

        const bodyPulse = bassLevel * 0.1;
        const transientPulse = transientPeakRef.current * 0.24;
        const pulse = 1 + bodyPulse + transientPulse;

        emitPulse(pulse);

        if (analyzerInterval > 0) {
          animationRef.current = window.setTimeout(analyzeBass, analyzerInterval);
        } else {
          animationRef.current = window.requestAnimationFrame(analyzeBass);
        }
      };

      clearAnimation();
      analyzeBass();
    };

    const startAnalyzerDeferred = (audio) => {
      window.setTimeout(() => {
        startAnalyzer(audio).catch(() => {
          previousBassRef.current = 0;
          transientPeakRef.current = 0;
          emitPulse(1);
        });
      }, isMobileAudio ? 520 : 220);
    };

    const startAudio = async () => {
      const audio = audioRef.current;

      if (!audio || hasStartedRef.current || isStartingRef.current) {
        return;
      }

      isStartingRef.current = true;
      removeStartListeners();

      audio.volume = 0;
      audio.loop = true;
      audio.muted = false;
      audio.playsInline = true;
      audio.preload = "auto";

      if (!audio.src) {
        audio.src = audioSource;
        audio.load();
      }

      try {
        const playPromise = audio.play();

        if (playPromise && typeof playPromise.then === "function") {
          await playPromise;
        }

        hasStartedRef.current = true;
        startFade(audio);
        startAnalyzerDeferred(audio);
        cacheAudioAfterStart();
      } catch (error) {
        isStartingRef.current = false;
        addStartListeners();
        return;
      }

      isStartingRef.current = false;
    };

    injectAudioPreload();
    warmAudioElement();
    addStartListeners();

    const handleVisibilityChange = () => {
      if (!audioRef.current || !hasStartedRef.current) {
        return;
      }

      if (document.hidden) {
        emitPulse(1);
        return;
      }

      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch(() => {});
      }
    };

    const handleWaiting = () => {
      emitPulse(1);
    };

    const handlePlaying = () => {
      if (audioRef.current && hasStartedRef.current) {
        startFade(audioRef.current);
      }
    };

    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("waiting", handleWaiting);
      audio.addEventListener("stalled", handleWaiting);
      audio.addEventListener("playing", handlePlaying);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      removeStartListeners();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearFade();
      clearAnimation();

      if (audio) {
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("stalled", handleWaiting);
        audio.removeEventListener("playing", handlePlaying);
      }

      if (cacheControllerRef.current) {
        cacheControllerRef.current.abort();
        cacheControllerRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [audioSource, contactLogoRef]);

  return (
    <audio
      ref={audioRef}
      src={audioSource}
      preload="auto"
      loop
      playsInline
    />
  );
}
