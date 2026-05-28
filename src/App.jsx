import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Camera,
  Check,
  ClipboardList,
  FileText,
  Layers,
  Mail,
  MapPin,
  MousePointer2,
  Sparkles,
  Volume2,
} from "lucide-react";

const basePath = import.meta.env.BASE_URL;

const logoBackground = `${basePath}logo/acusonica logo sito.png`;
const logoIcon = `${basePath}acusonica icona.png`;
const ambientAudioDesktop = `${basePath}audio/ambience.mp3`;
const ambientAudioMobile = `${basePath}audio/ambience-mobile.mp3`;

function getAmbientAudioSource() {
  if (typeof window === "undefined") {
    return ambientAudioDesktop;
  }

  const userAgent = navigator.userAgent || navigator.vendor || window.opera || "";

  const isMobileUserAgent =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  const isSmallViewport = window.matchMedia("(max-width: 640px)").matches;

  return isMobileUserAgent || isSmallViewport
    ? ambientAudioMobile
    : ambientAudioDesktop;
}

const companyData = {
  name: "ACUSONICA PROFESSIONAL SOUND SOLUTION",
  ceo: "Maiolo Alessio",
  addressLine1: "Piazza Arlini 9, Castelbasso",
  addressLine2: "64020 Castellalto (TE), Italia",
  vat: "P.IVA IT02211800673",
  taxCode: "C.F. MLALSS78T12D869J",
  email: "acusonica@gmail.com",
};

const sections = [
  {
    eyebrow: "Esperienza tecnica",
    title: "Un service moderno per ogni esigenza",
    text: "Noleggio impianti audio, microfoni, radiomicrofoni, mixer digitali, sistemi video, schermi, proiettori, regie, fari, teste mobili, americane, strutture e accessori tecnici. Ogni fornitura può includere trasporto, montaggio, configurazione, assistenza e gestione durante l’evento.",
    icon: Sparkles,
  },
  {
    eyebrow: "Ogni evento è un’esperienza",
    title: "Suono, luce e immagine in un unico spettacolo",
    text: "Concerti, conferenze, spettacoli, eventi privati, produzioni aziendali e installazioni fisse e temporanee. Ogni contesto riceve una soluzione tecnica proporzionata, ordinata e gestita con precisione.",
    icon: MousePointer2,
  },
  {
    eyebrow: "Attrezzature",
    title: "Noleggio audio, video e luci",
    text: "Impianti audio, subwoofer, monitor da palco, mixer digitali, microfoni, radiomicrofoni, sistemi video, schermi, proiettori, regie, fari, teste mobili, barre LED, americane, stativi, cablaggi e accessori tecnici. Ogni noleggio può includere trasporto, montaggio, configurazione, assistenza e gestione operativa.",
    icon: Layers,
  },
];

const horizontalCards = [
  {
    number: "01",
    title: "Catalogo tecnico",
    text: "Seleziona le attrezzature e crea una richiesta ordinata per il preventivo.",
    href: "#catalogo",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Galleria eventi",
    text: "Guarda concerti, conferenze, eventi privati, palchi esterni, spettacoli e installazioni fisse e temporanee.",
    href: "#galleria",
    icon: Camera,
  },
  {
    number: "03",
    title: "Progetti CAD",
    text: "Layout tecnici, planimetrie e configurazioni per eventi.",
    href: "#cad",
    icon: FileText,
  },
  {
    number: "04",
    title: "Preventivo",
    text: "Invia una richiesta completa con dati evento, servizi e note operative.",
    href: "#preventivo",
    icon: Mail,
  },
];

const catalogItems = {
  Audio: [
    "Impianto audio principale",
    "Subwoofer",
    "Monitor da palco",
    "Mixer digitale",
    "Microfoni cablati",
    "Radiomicrofoni",
    "Aste microfoniche",
    "DI box",
  ],
  Video: [
    "Schermi",
    "Proiettori",
    "Regia video",
    "Monitor di servizio",
    "Distribuzione segnale",
    "Cavi HDMI e SDI",
  ],
  Luci: [
    "Fari LED",
    "Teste mobili",
    "Barre LED",
    "Wash",
    "Beam",
    "Centralina luci",
    "Dimmer e controllo DMX",
  ],
  Strutture: [
    "Americane",
    "Stativi",
    "Supporti",
    "Pedane",
    "Cablaggi di potenza",
    "Quadri elettrici",
  ],
};

const galleryItems = [
  {
    title: "Concerti live",
    folder: "concerti live",
    text: "Palchi, impianti audio, regia luci e gestione tecnica per musica dal vivo.",
  },
  {
    title: "Conferenze",
    folder: "conferenze",
    text: "Audio parlato, video, microfoni, schermi e gestione tecnica per eventi istituzionali e aziendali.",
  },
  {
    title: "Eventi privati",
    folder: "eventi privati",
    text: "Soluzioni audio, luci e video per feste, ricevimenti e momenti privati.",
  },
  {
    title: "Installazioni fisse e temporanee",
    folder: "installazioni fisse e temporanee",
    text: "Allestimenti tecnici per spazi, locali, eventi stagionali e strutture temporanee.",
  },
  {
    title: "Palchi esterni",
    folder: "palchi esterni",
    text: "Sistemi audio, luci, strutture e cablaggi per eventi all’aperto.",
  },
  {
    title: "Spettacoli",
    folder: "spettacoli",
    text: "Regia tecnica integrata per performance, teatro, show e produzioni dal vivo.",
  },
];

const cadItems = [
  "Layout palco",
  "Pianta impianto audio",
  "Disposizione luci",
  "Schema regia",
  "Americane e strutture",
  "Punti alimentazione e segnale",
];

function isVideo(path) {
  return /\.mp4$/i.test(path);
}

function mediaSources(folder) {
  const fileNames = [
    "01.webp",
    "01.mp4",
  ];

  return fileNames.map((fileName) => `${basePath}picture/${folder}/${fileName}`);
}

function groupedMediaSources(folder) {
  const groups = [];

  for (let index = 1; index <= 12; index += 1) {
    const number = String(index).padStart(2, "0");

    groups.push([
      `${basePath}picture/${folder}/${number}.webp`,
      `${basePath}picture/${folder}/${number}.mp4`,
    ]);
  }

  return groups;
}

function AmbientAudio() {
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
      window.dispatchEvent(
        new CustomEvent("acusonica-audio-pulse", {
          detail: pulse,
        })
      );
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
  }, [audioSource]);

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

function PreloadGalleryMedia() {
  useEffect(() => {
    const preloadQueue = galleryItems.map((item) => `${basePath}picture/${item.folder}/01.webp`);
    let cancelled = false;
    let index = 0;
    let idleId = null;
    let timeoutId = null;

    const preloadNext = () => {
      if (cancelled || index >= preloadQueue.length) {
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.loading = "lazy";
      image.src = preloadQueue[index];
      index += 1;

      timeoutId = window.setTimeout(preloadNext, 900);
    };

    const start = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(preloadNext, { timeout: 3500 });
        return;
      }

      timeoutId = window.setTimeout(preloadNext, 5000);
    };

    timeoutId = window.setTimeout(start, 9000);

    return () => {
      cancelled = true;

      if (idleId) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-white/90"
      style={{ scaleX, width: "100%" }}
    />
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white p-2 shadow-lg shadow-cyan-500/10">
            <img src={logoIcon} alt="Acusonica" className="h-full w-full object-contain" />
          </span>
          <span className="text-[11px] font-semibold leading-4 tracking-[0.22em] uppercase sm:text-xs md:text-sm md:tracking-[0.32em]">
            <span className="hidden sm:inline">{companyData.name}</span>
            <span className="inline sm:hidden">ACUSONICA</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#concept" className="transition hover:text-white">
            Service
          </a>
          <a href="#percorso" className="transition hover:text-white">
            Percorso
          </a>
          <a href="#catalogo" className="transition hover:text-white">
            Catalogo
          </a>
          <a href="#galleria" className="transition hover:text-white">
            Galleria
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contatto
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(0,180,255,0.15),transparent_30%),linear-gradient(135deg,#000,#111_45%,#050505)]" />

      <motion.div
        className="absolute inset-0 bg-no-repeat opacity-[0.36] mix-blend-screen [background-position:65%_13%] [background-size:min(62vw,300px)] md:opacity-[0.18] md:[background-position:68%_18%] md:[background-size:min(42vw,560px)]"
        style={{
          backgroundImage: `url("${logoBackground}")`,
        }}
        animate={{
          scale: [1, 1.055, 1.018, 1.075, 1.025, 1.06, 1],
          x: [0, -8, 6, 10, -6, 8, 0],
          y: [0, -5, 3, -8, 5, -3, 0],
          rotate: [0, -0.2, 0.12, 0.28, -0.18, 0.1, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.16, 0.34, 0.52, 0.68, 0.84, 1],
        }}
      />

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
            Un service moderno.
            <span className="block text-white/45">Una soluzione per ogni esigenza.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            Acusonica offre noleggio, installazione e gestione tecnica di sistemi audio, video e luci per eventi, spettacoli, produzioni dal vivo e installazioni fisse e temporanee.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
            >
              Catalogo tecnico
              <ArrowRight size={18} />
            </a>
            <a
              href="#galleria"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/10"
            >
              Galleria eventi
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VerticalSection({ item, index }) {
  const Icon = item.icon;

  return (
    <section id={index === 0 ? "concept" : undefined} className="min-h-screen bg-black/78 px-6 py-28 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-3xl bg-white text-black">
            <Icon size={24} />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/40">{item.eyebrow}</p>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">{item.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur"
        >
          <p className="text-xl leading-9 text-white/72">{item.text}</p>
          <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white" style={{ width: `${42 + index * 22}%` }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalShowcase() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    const max = element.scrollWidth - element.clientWidth;

    setProgress(max > 0 ? element.scrollLeft / max : 0);
  };

  return (
    <section id="percorso" className="bg-white px-6 py-28 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-black/40">Area operativa</p>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Catalogo, galleria, CAD e preventivo.
            </h2>
          </div>

          <div className="w-full max-w-xs">
            <div className="h-2 overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="h-full rounded-full bg-black"
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: "spring", stiffness: 130, damping: 22 }}
              />
            </div>
            <p className="mt-3 text-sm text-black/50">Avanzamento percorso</p>
          </div>
        </div>

        <div
          ref={wrapperRef}
          onScroll={handleScroll}
          className="flex snap-x gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {horizontalCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.a
                href={card.href}
                key={card.number}
                whileHover={{ y: -8 }}
                className="min-w-[82vw] snap-center rounded-[2rem] border border-black/10 bg-black p-8 text-white shadow-2xl md:min-w-[520px]"
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="text-8xl font-black text-white/15">{card.number}</p>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-black">
                    <Icon size={24} />
                  </span>
                </div>
                <h3 className="mt-12 text-4xl font-black">{card.title}</h3>
                <p className="mt-6 text-lg leading-8 text-white/70">{card.text}</p>
                <div className="mt-12 flex h-40 items-end rounded-[1.5rem] bg-white/10 p-5">
                  <div className="h-16 w-full rounded-2xl bg-white/20" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CatalogSection() {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx1D7AWwH6PVRRV7T4qpqKZzCu7mOJLg5-kXuM8eAae_RnlkezGjpOv-WXzBQb-A4Hhjg/exec";

  const allItems = Object.values(catalogItems).flat();
  const [selected, setSelected] = useState([]);
  const [isSendingCatalog, setIsSendingCatalog] = useState(false);

  const [catalogContact, setCatalogContact] = useState({
    nome: "",
    telefono: "",
    email: "",
  });

  const updateCatalogContact = (field, value) => {
    setCatalogContact((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleItem = (item) => {
    setSelected((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  };

  const selectedByCategory = useMemo(() => {
    const result = {};

    Object.entries(catalogItems).forEach(([category, items]) => {
      const categoryItems = items.filter((item) => selected.includes(item));

      if (categoryItems.length > 0) {
        result[category] = categoryItems;
      }
    });

    return result;
  }, [selected]);

  const sendCatalogRequest = async () => {
    if (isSendingCatalog) {
      return;
    }

    if (selected.length === 0) {
      alert("Seleziona almeno un elemento dal catalogo.");
      return;
    }

    if (!catalogContact.email.trim()) {
      alert("Inserisci almeno l’email di contatto.");
      return;
    }

    try {
      setIsSendingCatalog(true);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipoModulo: "catalogo",
          nome: catalogContact.nome,
          telefono: catalogContact.telefono,
          email: catalogContact.email,
          catalogo: selectedByCategory,
        }),
      });

      alert(
        "Richiesta catalogo inviata correttamente. Acusonica ti risponderà appena possibile."
      );

      setSelected([]);
      setCatalogContact({
        nome: "",
        telefono: "",
        email: "",
      });
    } catch (error) {
      alert(
        "Errore durante l’invio. Riprova oppure scrivi direttamente a acusonica@gmail.com."
      );
    } finally {
      setIsSendingCatalog(false);
    }
  };

  return (
    <section id="catalogo" className="bg-black/82 px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Catalogo tecnico</p>
            <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Seleziona le attrezzature per creare una richiesta di preventivo.
            </h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-white/70 backdrop-blur">
            <p className="text-lg leading-8">
              Spunta gli elementi utili all’evento. La richiesta viene preparata in modo ordinato e inviata direttamente ad Acusonica.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(catalogItems).map(([category, items]) => (
            <div key={category} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black">
                  <Boxes size={22} />
                </span>
                <h3 className="text-2xl font-black">{category}</h3>
              </div>
              <div className="space-y-3">
                {items.map((item) => {
                  const active = selected.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        active
                          ? "border-cyan-300 bg-cyan-300/15 text-white"
                          : "border-white/10 bg-black/20 text-white/65 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <span className={`grid h-5 w-5 place-items-center rounded-md border ${active ? "border-cyan-300 bg-cyan-300 text-black" : "border-white/25"}`}>
                        {active && <Check size={14} />}
                      </span>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
          <div className="grid gap-5 md:grid-cols-3">
            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-white/35"
              type="text"
              autoComplete="name"
              value={catalogContact.nome}
              onChange={(event) => updateCatalogContact("nome", event.target.value)}
              placeholder="Nome"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-white/35"
              type="tel"
              autoComplete="tel"
              value={catalogContact.telefono}
              onChange={(event) => updateCatalogContact("telefono", event.target.value)}
              placeholder="Telefono"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-white/35"
              type="email"
              autoComplete="email"
              value={catalogContact.email}
              onChange={(event) => updateCatalogContact("email", event.target.value)}
              placeholder="Email di contatto"
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-lg text-white/70">
              Elementi selezionati: <span className="font-bold text-white">{selected.length}</span> su {allItems.length}
            </p>
            <button
              type="button"
              onClick={sendCatalogRequest}
              disabled={isSendingCatalog}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60"
            >
              {isSendingCatalog ? "Invio in corso" : "Crea richiesta"}
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryMedia({ item }) {
  const sources = mediaSources(item.folder);
  const [sourceIndex, setSourceIndex] = useState(0);
  const currentSource = sources[sourceIndex];
  const hasSource = sourceIndex < sources.length;

  const handleError = () => setSourceIndex((current) => current + 1);

  return (
    <div className="relative grid h-64 place-items-center overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-neutral-700">
      {hasSource && isVideo(currentSource) && (
        <video
          src={currentSource}
          onError={handleError}
          className="h-full w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {hasSource && !isVideo(currentSource) && (
        <img
          src={currentSource}
          alt={item.title}
          onError={handleError}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100"
        />
      )}

      {!hasSource && <Camera size={42} className="text-white/45" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  );
}

function GalleryModalMedia({ sources, title }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const currentSource = sources[sourceIndex];
  const hasSource = sourceIndex < sources.length;

  if (!hasSource) {
    return null;
  }

  const handleError = () => setSourceIndex((current) => current + 1);

  if (isVideo(currentSource)) {
    return (
      <video
        src={currentSource}
        onError={handleError}
        className="h-full min-h-[220px] w-full rounded-[1.5rem] object-cover"
        controls
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={currentSource}
      alt={title}
      onError={handleError}
      loading="lazy"
      decoding="async"
      className="h-full min-h-[220px] w-full rounded-[1.5rem] object-cover"
    />
  );
}

function GalleryModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/85 px-6 py-10 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-neutral-950 p-6 text-white shadow-2xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-white/35">Galleria</p>
            <h3 className="mt-3 text-4xl font-black">{item.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
          >
            Chiudi
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groupedMediaSources(item.folder).map((sources, index) => (
            <div key={`${item.folder}-${index}`} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3">
              <GalleryModalMedia sources={sources} title={`${item.title} ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GallerySection() {
  const [activeGallery, setActiveGallery] = useState(null);

  return (
    <section id="galleria" className="bg-white px-6 py-28 text-black">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-black/40">Galleria eventi</p>
        <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
          Foto e video degli spettacoli, degli allestimenti e delle produzioni realizzate.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-[2rem] border border-black/10 bg-black text-white shadow-2xl"
            >
              <button type="button" onClick={() => setActiveGallery(item)} className="block w-full text-left">
                <GalleryMedia item={item} />
                <div className="p-6">
                  <p className="text-sm font-bold tracking-[0.28em] text-white/30">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
                  <p className="mt-4 text-white/65">{item.text}</p>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Apri galleria</p>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      {activeGallery && <GalleryModal item={activeGallery} onClose={() => setActiveGallery(null)} />}
    </section>
  );
}

function CadSection() {
  return (
    <section id="cad" className="bg-black/82 px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Progetti CAD</p>
            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Layout tecnici e configurazioni per eventi.
            </h2>
            <p className="mt-8 text-lg leading-8 text-white/65">
              Planimetrie, disposizione impianti, punti luce, regia, strutture e percorsi di segnale vengono organizzati prima dell’allestimento.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              {cadItems.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <FileText className="mb-5 text-cyan-300" />
                  <p className="text-lg font-bold">{item}</p>
                </div>
              ))}
            </div>
            <a
              href="#preventivo"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
            >
              Richiedi progetto tecnico
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function EstimateSection() {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx1D7AWwH6PVRRV7T4qpqKZzCu7mOJLg5-kXuM8eAae_RnlkezGjpOv-WXzBQb-A4Hhjg/exec";

  const [estimateData, setEstimateData] = useState({
    nome: "",
    telefono: "",
    email: "",
    data: "",
    luogo: "",
    richiesta: "",
  });

  const [isSending, setIsSending] = useState(false);

  const updateEstimateField = (field, value) => {
    setEstimateData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const sendEstimateRequest = async () => {
    if (isSending) {
      return;
    }

    if (!estimateData.email.trim() || !estimateData.richiesta.trim()) {
      alert("Inserisci almeno email e richiesta.");
      return;
    }

    const formData = new URLSearchParams();

    formData.append("nome", estimateData.nome);
    formData.append("telefono", estimateData.telefono);
    formData.append("email", estimateData.email);
    formData.append("dataEvento", estimateData.data);
    formData.append("luogo", estimateData.luogo);
    formData.append("richiesta", estimateData.richiesta);

    try {
      setIsSending(true);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      alert(
        "Richiesta inviata correttamente. Acusonica ti risponderà appena possibile."
      );

      setEstimateData({
        nome: "",
        telefono: "",
        email: "",
        data: "",
        luogo: "",
        richiesta: "",
      });
    } catch (error) {
      alert(
        "Errore durante l’invio. Riprova oppure scrivi direttamente a acusonica@gmail.com."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="preventivo" className="bg-white px-6 py-28 text-black">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-black/40">
            Preventivo
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Racconta l’evento, Acusonica prepara la soluzione tecnica.
          </h2>

          <p className="mt-8 text-lg leading-8 text-black/60">
            Inserisci data, luogo, tipologia evento, numero indicativo di persone
            e servizi richiesti. La richiesta arriva già ordinata per una
            valutazione rapida.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-black p-8 text-white shadow-2xl">
          <div className="grid gap-5 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="text"
              autoComplete="name"
              value={estimateData.nome}
              onChange={(event) =>
                updateEstimateField("nome", event.target.value)
              }
              placeholder="Nome"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="tel"
              autoComplete="tel"
              value={estimateData.telefono}
              onChange={(event) =>
                updateEstimateField("telefono", event.target.value)
              }
              placeholder="Telefono"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="email"
              autoComplete="email"
              value={estimateData.email}
              onChange={(event) =>
                updateEstimateField("email", event.target.value)
              }
              placeholder="Email"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="text"
              value={estimateData.data}
              onChange={(event) =>
                updateEstimateField("data", event.target.value)
              }
              placeholder="Data evento"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35 md:col-span-2"
              type="text"
              value={estimateData.luogo}
              onChange={(event) =>
                updateEstimateField("luogo", event.target.value)
              }
              placeholder="Luogo evento"
            />

            <textarea
              className="min-h-40 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35 md:col-span-2"
              value={estimateData.richiesta}
              onChange={(event) =>
                updateEstimateField("richiesta", event.target.value)
              }
              placeholder="Tipo evento, persone previste, servizi richiesti, note tecniche"
            />
          </div>

          <button
            type="button"
            onClick={sendEstimateRequest}
            disabled={isSending}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60"
          >
            {isSending ? "Invio in corso" : "Invia richiesta"}
            <Mail size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [audioPulse, setAudioPulse] = useState(1);

  useEffect(() => {
    const handlePulse = (event) => {
      const value = Number(event.detail);

      if (Number.isFinite(value)) {
        setAudioPulse(value);
      }
    };

    window.addEventListener("acusonica-audio-pulse", handlePulse);

    return () => {
      window.removeEventListener("acusonica-audio-pulse", handlePulse);
    };
  }, []);

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-black/70 px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.18),transparent_30%)]" />

      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[260px] w-[94vw] -translate-x-1/2 md:top-[24%] md:h-[420px] md:w-[76vw]">
        <motion.div
          className="h-full w-full bg-center bg-contain bg-no-repeat mix-blend-screen"
          style={{
            backgroundImage: `url("${logoBackground}")`,
          }}
          animate={{
            scale: audioPulse,
            opacity: Math.min(0.58, 0.28 + (audioPulse - 1) * 0.9),
            filter: `blur(${Math.max(0.6, 1.8 - (audioPulse - 1) * 2.6)}px)`,
          }}
          transition={{
            duration: 0.14,
            ease: "easeOut",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[76vh] max-w-5xl flex-col items-center justify-start pt-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-sm font-bold uppercase tracking-[0.35em] text-white/40 md:mb-32"
        >
          Contatto
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="mt-32 grid w-full gap-4 rounded-[2rem] border border-white/10 bg-black/45 p-8 text-left text-base leading-8 text-white/72 shadow-2xl backdrop-blur md:mt-87 md:grid-cols-2"
        >
          <div>
            <p className="font-semibold text-white">CEO</p>
            <p>{companyData.ceo}</p>

            <p className="mt-5 flex items-center gap-2 font-semibold text-white">
              <MapPin size={18} /> Sede
            </p>
            <p>{companyData.addressLine1}</p>
            <p>{companyData.addressLine2}</p>
          </div>

          <div>
            <p className="font-semibold text-white">Dati fiscali</p>
            <p>{companyData.vat}</p>
            <p>{companyData.taxCode}</p>

            <p className="mt-5 flex items-center gap-2 font-semibold text-white">
              <Mail size={18} /> Email
            </p>
            <a href={`mailto:${companyData.email}`} className="text-cyan-300 transition hover:text-cyan-200">
              {companyData.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ModernScrollWebsite() {
  return (
    <main
      className="min-h-screen scroll-smooth bg-black bg-fixed bg-center bg-no-repeat font-sans"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.92))",
      }}
    >
      <ProgressBar />
      <Header />
      <PreloadGalleryMedia />
      <AmbientAudio />
      <Hero />
      {sections.map((item, index) => (
        <VerticalSection key={item.title} item={item} index={index} />
      ))}
      <HorizontalShowcase />
      <CatalogSection />
      <GallerySection />
      <CadSection />
      <EstimateSection />
      <Contact />
    </main>
  );
}