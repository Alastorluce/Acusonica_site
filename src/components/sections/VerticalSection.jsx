import { motion } from "framer-motion";

export default function VerticalSection({ item, index }) {
  const Icon = item.icon;

  return (
    <section id={index === 0 ? "concept" : undefined} className="min-h-screen bg-black/78 px-6 py-28 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-3xl bg-white text-black">
            <Icon size={24} />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/40">{item.eyebrow}</p>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">{item.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur"
        >
          <p className="text-xl leading-9 text-white/72">{item.text}</p>
          <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white" style={{ width: `${42 + index * 22}%` }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
