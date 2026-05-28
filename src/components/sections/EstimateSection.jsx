import { useState } from "react";
import { Mail } from "lucide-react";

export default function EstimateSection() {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx1D7AWwH6PVRRV7T4qpqKZzCu7mOJLg5-kXuM8eAae_RnlkezGjpOv-WXzBQb-A4Hhjg/exec";

  const [estimateData, setEstimateData] = useState({
    nome: "",
    telefono: "",
    email: "",
    data: "",
    luogo: "",
    richiesta: "",
  });

  const [isSending, setIsSending] = useState(false);

  const updateEstimateField = (field, value) => {
    setEstimateData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const sendEstimateRequest = async () => {
    if (isSending) {
      return;
    }

    if (!estimateData.email.trim() || !estimateData.richiesta.trim()) {
      alert("Inserisci almeno email e richiesta.");
      return;
    }

    const formData = new URLSearchParams();

    formData.append("nome", estimateData.nome);
    formData.append("telefono", estimateData.telefono);
    formData.append("email", estimateData.email);
    formData.append("dataEvento", estimateData.data);
    formData.append("luogo", estimateData.luogo);
    formData.append("richiesta", estimateData.richiesta);

    try {
      setIsSending(true);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      alert(
        "Richiesta inviata correttamente. Acusonica ti risponderà appena possibile."
      );

      setEstimateData({
        nome: "",
        telefono: "",
        email: "",
        data: "",
        luogo: "",
        richiesta: "",
      });
    } catch (error) {
      alert(
        "Errore durante l’invio. Riprova oppure scrivi direttamente a acusonica@gmail.com."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="preventivo" className="bg-white px-6 py-28 text-black">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-black/40">
            Preventivo
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Racconta l’evento, Acusonica prepara la soluzione tecnica.
          </h2>

          <p className="mt-8 text-lg leading-8 text-black/60">
            Inserisci data, luogo, tipologia evento, numero indicativo di persone
            e servizi richiesti. La richiesta arriva già ordinata per una
            valutazione rapida.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-black p-8 text-white shadow-2xl">
          <div className="grid gap-5 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="text"
              autoComplete="name"
              value={estimateData.nome}
              onChange={(event) =>
                updateEstimateField("nome", event.target.value)
              }
              placeholder="Nome"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="tel"
              autoComplete="tel"
              value={estimateData.telefono}
              onChange={(event) =>
                updateEstimateField("telefono", event.target.value)
              }
              placeholder="Telefono"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="email"
              autoComplete="email"
              value={estimateData.email}
              onChange={(event) =>
                updateEstimateField("email", event.target.value)
              }
              placeholder="Email"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
              type="text"
              value={estimateData.data}
              onChange={(event) =>
                updateEstimateField("data", event.target.value)
              }
              placeholder="Data evento"
            />

            <input
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35 md:col-span-2"
              type="text"
              value={estimateData.luogo}
              onChange={(event) =>
                updateEstimateField("luogo", event.target.value)
              }
              placeholder="Luogo evento"
            />

            <textarea
              className="min-h-40 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35 md:col-span-2"
              value={estimateData.richiesta}
              onChange={(event) =>
                updateEstimateField("richiesta", event.target.value)
              }
              placeholder="Tipo evento, persone previste, servizi richiesti, note tecniche"
            />
          </div>

          <button
            type="button"
            onClick={sendEstimateRequest}
            disabled={isSending}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60"
          >
            {isSending ? "Invio in corso" : "Invia richiesta"}
            <Mail size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
