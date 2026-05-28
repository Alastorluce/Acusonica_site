import { ArrowRight, FileText } from "lucide-react";
import { cadItems } from "../../data/cadItems";

export default function CadSection() {
  return (
    <section id="cad" className="bg-black/82 px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Progetti CAD</p>
            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Layout tecnici e configurazioni per eventi.
            </h2>
            <p className="mt-8 text-lg leading-8 text-white/65">
              Planimetrie, disposizione impianti, punti luce, regia, strutture e percorsi di segnale vengono organizzati prima dell’allestimento.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              {cadItems.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <FileText className="mb-5 text-cyan-300" />
                  <p className="text-lg font-bold">{item}</p>
                </div>
              ))}
            </div>
            <a
              href="#preventivo"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
            >
              Richiedi progetto tecnico
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
