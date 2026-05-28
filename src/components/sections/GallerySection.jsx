import { useState } from "react";
import { motion } from "framer-motion";
import { galleryItems } from "../../data/galleryItems";
import GalleryMedia from "../gallery/GalleryMedia";
import GalleryModal from "../gallery/GalleryModal";

export default function GallerySection() {
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
