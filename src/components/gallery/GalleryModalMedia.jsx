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
