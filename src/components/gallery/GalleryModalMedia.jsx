import { useState } from "react";
import { isVideo } from "../../utils/media";

export default function GalleryModalMedia({ sources, title }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const currentSource = sources[sourceIndex];
  const hasSource = sourceIndex < sources.length;

  if (!hasSource) {
    return null;
  }

  const handleError = () => setSourceIndex((current) => current + 1);

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3">
      {isVideo(currentSource) ? (
        <video
          src={currentSource}
          onError={handleError}
          className="h-full min-h-[220px] w-full rounded-[1.5rem] object-cover"
          controls
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={currentSource}
          alt={title}
          onError={handleError}
          loading="lazy"
          decoding="async"
          className="h-full min-h-[220px] w-full rounded-[1.5rem] object-cover"
        />
      )}
    </div>
  );
}
