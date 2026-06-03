import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { logoBackground } from "../../assets/paths";
import { companyData } from "../../data/companyData";

export default function Contact({ contactLogoRef }) {

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-black/70 px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.18),transparent_30%)]" />

      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[260px] w-[94vw] -translate-x-1/2 md:top-[24%] md:h-[420px] md:w-[76vw]">
        <div
          ref={contactLogoRef}
          className="h-full w-full bg-center bg-contain bg-no-repeat mix-blend-screen"
          style={{
            backgroundImage: `url("${logoBackground}")`,
            transform: "scale(1)",
            opacity: 0.28,
            filter: "blur(1.8px)",
            willChange: "transform, opacity, filter",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[76vh] max-w-5xl flex-col items-center justify-start pt-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-sm font-bold uppercase tracking-[0.35em] text-white/40 md:mb-32"
        >
          Contatto
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="mt-32 grid w-full gap-4 rounded-[2rem] border border-white/10 bg-black/45 p-8 text-left text-base leading-8 text-white/72 shadow-2xl backdrop-blur md:mt-87 md:grid-cols-2"
        >
          <div>
            <p className="font-semibold text-white">CEO</p>
            <p>{companyData.ceo}</p>

            <p className="mt-5 flex items-center gap-2 font-semibold text-white">
              <MapPin size={18} /> Sede
            </p>
            <p>{companyData.addressLine1}</p>
            <p>{companyData.addressLine2}</p>
          </div>

          <div>
            <p className="font-semibold text-white">Dati fiscali</p>
            <p>{companyData.vat}</p>
            <p>{companyData.taxCode}</p>

            <p className="mt-5 flex items-center gap-2 font-semibold text-white">
              <Mail size={18} /> Email
            </p>
            <a href={`mailto:${companyData.email}`} className="text-cyan-300 transition hover:text-cyan-200">
              {companyData.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
