import { useMemo, useState } from "react";
import { Boxes, Check, Mail } from "lucide-react";
import { catalogItems } from "../../data/catalogItems";

export default function CatalogSection() {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx1D7AWwH6PVRRV7T4qpqKZzCu7mOJLg5-kXuM8eAae_RnlkezGjpOv-WXzBQb-A4Hhjg/exec";

  const allItems = Object.values(catalogItems).flat();
  const [selected, setSelected] = useState([]);
  const [isSendingCatalog, setIsSendingCatalog] = useState(false);

  const [catalogContact, setCatalogContact] = useState({
    nome: "",
    telefono: "",
    email: "",
  });

  const updateCatalogContact = (field, value) => {
    setCatalogContact((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleItem = (item) => {
    setSelected((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  };

  const selectedByCategory = useMemo(() => {
    const result = {};

    Object.entries(catalogItems).forEach(([category, items]) => {
      const categoryItems = items.filter((item) => selected.includes(item));

      if (categoryItems.length > 0) {
        result[category] = categoryItems;
      }
    });

    return result;
  }, [selected]);

  const sendCatalogRequest = async () => {
    if (isSendingCatalog) {
      return;
    }

    if (selected.length === 0) {
      alert("Seleziona almeno un elemento dal catalogo.");
      return;
    }

    if (!catalogContact.email.trim()) {
      alert("Inserisci almeno l’email di contatto.");
      return;
    }

    try {
      setIsSendingCatalog(true);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipoModulo: "catalogo",
          nome: catalogContact.nome,
          telefono: catalogContact.telefono,
          email: catalogContact.email,
          catalogo: selectedByCategory,
        }),
      });

      alert(
        "Richiesta catalogo inviata correttamente. Acusonica ti risponderà appena possibile."
      );

      setSelected([]);
      setCatalogContact({
        nome: "",
        telefono: "",
        email: "",
      });
    } catch (error) {
      alert(
        "Errore durante l’invio. Riprova oppure scrivi direttamente a acusonica@gmail.com."
      );
    } finally {
      setIsSendingCatalog(false);
    }
  };

  return (
    <section id="catalogo" className="bg-black/82 px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Catalogo tecnico</p>
            <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Seleziona le attrezzature per creare una richiesta di preventivo.
            </h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-white/70 backdrop-blur">
            <p className="text-lg leading-8">
              Spunta gli elementi utili all’evento. La richiesta viene preparata in modo ordinato e inviata direttamente ad Acusonica.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(catalogItems).map(([category, items]) => (
            <div key={category} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black">
                  <Boxes size={22} />
                </span>
                <h3 className="text-2xl font-black">{category}</h3>
              </div>
              <div className="space-y-3">
                {items.map((item) => {
                  const active = selected.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        active
                          ? "border-cyan-300 bg-cyan-300/15 text-white"
                          : "border-white/10 bg-black/20 text-white/65 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <span className={`grid h-5 w-5 place-items-center rounded-md border ${active ? "border-cyan-300 bg-cyan-300 text-black" : "border-white/25"}`}>
                        {active && <Check size={14} />}
                      </span>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
          <div className="grid gap-5 md:grid-cols-3">
            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-white/35"
              type="text"
              autoComplete="name"
              value={catalogContact.nome}
              onChange={(event) => updateCatalogContact("nome", event.target.value)}
              placeholder="Nome"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-white/35"
              type="tel"
              autoComplete="tel"
              value={catalogContact.telefono}
              onChange={(event) => updateCatalogContact("telefono", event.target.value)}
              placeholder="Telefono"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-white/35"
              type="email"
              autoComplete="email"
              value={catalogContact.email}
              onChange={(event) => updateCatalogContact("email", event.target.value)}
              placeholder="Email di contatto"
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-lg text-white/70">
              Elementi selezionati: <span className="font-bold text-white">{selected.length}</span> su {allItems.length}
            </p>
            <button
              type="button"
              onClick={sendCatalogRequest}
              disabled={isSendingCatalog}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60"
            >
              {isSendingCatalog ? "Invio in corso" : "Crea richiesta"}
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
