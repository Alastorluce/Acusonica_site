import { useState } from "react";
import { Camera } from "lucide-react";
import { isVideo, mediaSources } from "../../utils/media";

export default function GalleryMedia({ item }) {
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
