import { basePath } from "../assets/paths";

export const ambientAudioDesktop = `${basePath}audio/ambience.mp3`;
export const ambientAudioMobile = `${basePath}audio/ambience-mobile.mp3`;

export function getAmbientAudioSource() {
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
