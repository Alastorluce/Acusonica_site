import { useEffect, useState } from "react";
import { isVideo } from "../../utils/media";

function checkImageSource(source) {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = source;
  });
}

function checkVideoSource(source) {
  return new Promise((resolve) => {
    const video = document.createElement("video");

    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => {
      video.onloadedmetadata = null;
      video.onerror = null;
      video.removeAttribute("src");
      video.load();
    };

    video.onloadedmetadata = () => {
      cleanup();
      resolve(true);
    };

    video.onerror = () => {
      cleanup();
      resolve(false);
    };

    video.src = source;
  });
}

async function resolveExistingSource(sources) {
  for (const source of sources) {
    const exists = isVideo(source)
      ? await checkVideoSource(source)
      : await checkImageSource(source);

    if (exists) {
      return source;
    }
  }

  return null;
}

export default function GalleryModalMedia({ sources, title }) {
  const [resolvedSource, setResolvedSource] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setResolvedSource(null);
    setChecked(false);

    resolveExistingSource(sources).then((source) => {
      if (cancelled) {
        return;
      }

      setResolvedSource(source);
      setChecked(true);
    });

    return () => {
      cancelled = true;
    };
  }, [sources]);

  if (!checked || !resolvedSource) {
    return null;
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3">
      {isVideo(resolvedSource) ? (
        <video
          src={resolvedSource}
          className="h-full min-h-[220px] w-full rounded-[1.5rem] object-cover"
          controls
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={resolvedSource}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full min-h-[220px] w-full rounded-[1.5rem] object-cover"
        />
      )}
    </div>
  );
}
