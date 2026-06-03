import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { logoBackground } from "../../assets/paths";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(0,180,255,0.15),transparent_30%),linear-gradient(135deg,#000,#111_45%,#050505)]" />

      <motion.div
        className="absolute inset-0 bg-no-repeat opacity-[0.36] mix-blend-screen [background-position:65%_13%] [background-size:min(62vw,300px)] md:opacity-[0.18] md:[background-position:68%_18%] md:[background-size:min(42vw,560px)]"
        style={{
          backgroundImage: `url("${logoBackground}")`,
        }}
        animate={{
          scale: [1, 1.055, 1.018, 1.075, 1.025, 1.06, 1],
          x: [0, -8, 6, 10, -6, 8, 0],
          y: [0, -5, 3, -8, 5, -3, 0],
          rotate: [0, -0.2, 0.12, 0.28, -0.18, 0.1, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.16, 0.34, 0.52, 0.68, 0.84, 1],
        }}
      />

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
            Un service moderno.
            <span className="block text-white/45">Una soluzione per ogni esigenza.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            Acusonica offre noleggio, installazione e gestione tecnica di sistemi audio, video e luci per eventi, spettacoli, produzioni dal vivo e installazioni fisse e temporanee.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
            >
              Catalogo tecnico
              <ArrowRight size={18} />
            </a>
            <a
              href="#galleria"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/10"
            >
              Galleria eventi
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
