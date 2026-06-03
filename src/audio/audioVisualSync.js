export function applyPulseToContactLogo(contactLogoRef, pulse) {
  const element = contactLogoRef?.current;

  if (!element || !Number.isFinite(pulse)) {
    return;
  }

  const opacity = Math.min(0.58, 0.28 + (pulse - 1) * 0.9);
  const blur = Math.max(0.6, 1.8 - (pulse - 1) * 2.6);

  element.style.transform = `scale(${pulse})`;
  element.style.opacity = String(opacity);
  element.style.filter = `blur(${blur}px)`;
}

export function resetContactLogoPulse(contactLogoRef) {
  applyPulseToContactLogo(contactLogoRef, 1);
}
