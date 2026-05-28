import { logoIcon } from "../../assets/paths";
import { companyData } from "../../data/companyData";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white p-2 shadow-lg shadow-cyan-500/10">
            <img src={logoIcon} alt="Acusonica" className="h-full w-full object-contain" />
          </span>
          <span className="text-[11px] font-semibold leading-4 tracking-[0.22em] uppercase sm:text-xs md:text-sm md:tracking-[0.32em]">
            <span className="hidden sm:inline">{companyData.name}</span>
            <span className="inline sm:hidden">ACUSONICA</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#concept" className="transition hover:text-white">
            Service
          </a>
          <a href="#percorso" className="transition hover:text-white">
            Percorso
          </a>
          <a href="#catalogo" className="transition hover:text-white">
            Catalogo
          </a>
          <a href="#galleria" className="transition hover:text-white">
            Galleria
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contatto
          </a>
        </nav>
      </div>
    </header>
  );
}
