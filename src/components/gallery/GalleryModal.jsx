import { groupedMediaSources } from "../../utils/media";
import GalleryModalMedia from "./GalleryModalMedia";

export default function GalleryModal({ item, onClose }) {
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
