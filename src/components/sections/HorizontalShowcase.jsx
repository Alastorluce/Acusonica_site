import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { horizontalCards } from "../../data/horizontalCards";

export default function HorizontalShowcase() {
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
