import { useEffect } from "react";
import { basePath } from "../assets/paths";
import { galleryItems } from "../data/galleryItems";

export default function LoadOrchestrator() {
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
