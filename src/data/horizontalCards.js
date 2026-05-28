import { Camera, ClipboardList, FileText, Mail } from "lucide-react";

export const horizontalCards = [
  {
    number: "01",
    title: "Catalogo tecnico",
    text: "Seleziona le attrezzature e crea una richiesta ordinata per il preventivo.",
    href: "#catalogo",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Galleria eventi",
    text: "Guarda concerti, conferenze, eventi privati, palchi esterni, spettacoli e installazioni fisse e temporanee.",
    href: "#galleria",
    icon: Camera,
  },
  {
    number: "03",
    title: "Progetti CAD",
    text: "Layout tecnici, planimetrie e configurazioni per eventi.",
    href: "#cad",
    icon: FileText,
  },
  {
    number: "04",
    title: "Preventivo",
    text: "Invia una richiesta completa con dati evento, servizi e note operative.",
    href: "#preventivo",
    icon: Mail,
  },
];
