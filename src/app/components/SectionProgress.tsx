"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Início" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "desafio", label: "Desafio" },
  { id: "solucoes", label: "Soluções" },
  { id: "ganhos", label: "Ganhos" },
  { id: "entregaveis", label: "Entregáveis" },
  { id: "investimento", label: "Investimento" },
  { id: "cronograma", label: "Cronograma" },
];

export default function SectionProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show indicator after scrolling past hero
      setIsVisible(window.scrollY > 300);

      // Find the current section
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1"
        >
          {/* Progress line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-200 rounded-full">
            <motion.div
              className="w-full bg-prime-accent rounded-full"
              initial={{ height: 0 }}
              animate={{
                height: `${((activeIndex + 1) / sections.length) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Section dots */}
          {sections.map((section, index) => {
            const isActive = section.id === activeSection;
            const isPast = index < activeIndex;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="relative group flex items-center"
                aria-label={`Ir para ${section.label}`}
              >
                {/* Dot */}
                <motion.div
                  className={`w-3 h-3 rounded-full border-2 transition-colors z-10 ${
                    isActive
                      ? "bg-prime-accent border-prime-accent scale-125"
                      : isPast
                      ? "bg-prime border-prime"
                      : "bg-white border-slate-300 hover:border-prime-accent"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />

                {/* Label tooltip */}
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-6 whitespace-nowrap bg-prime text-white text-xs px-2 py-1 rounded pointer-events-none"
                >
                  {section.label}
                </motion.span>
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
