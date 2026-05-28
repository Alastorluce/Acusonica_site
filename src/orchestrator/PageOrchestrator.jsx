import { useRef } from "react";
import ProgressBar from "../components/layout/ProgressBar";
import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import VerticalSection from "../components/sections/VerticalSection";
import HorizontalShowcase from "../components/sections/HorizontalShowcase";
import CatalogSection from "../components/sections/CatalogSection";
import GallerySection from "../components/sections/GallerySection";
import CadSection from "../components/sections/CadSection";
import EstimateSection from "../components/sections/EstimateSection";
import Contact from "../components/sections/Contact";
import AmbientAudioController from "../audio/AmbientAudioController";
import LoadOrchestrator from "./LoadOrchestrator";
import { sections } from "../data/sections";

export default function PageOrchestrator() {
  const contactLogoRef = useRef(null);

  return (
    <main
      className="min-h-screen scroll-smooth bg-black bg-fixed bg-center bg-no-repeat font-sans"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.92))",
      }}
    >
      <ProgressBar />
      <Header />
      <LoadOrchestrator />
      <AmbientAudioController contactLogoRef={contactLogoRef} />
      <Hero />
      {sections.map((item, index) => (
        <VerticalSection key={item.title} item={item} index={index} />
      ))}
      <HorizontalShowcase />
      <CatalogSection />
      <GallerySection />
      <CadSection />
      <EstimateSection />
      <Contact contactLogoRef={contactLogoRef} />
    </main>
  );
}
