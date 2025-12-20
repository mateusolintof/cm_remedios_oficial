"use client";

import { motion } from "framer-motion";
import { Building2, Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Reduzimos o tempo de resposta de horas para minutos — e isso muda totalmente a conversão.",
    author: "Dr. Ricardo Mendes",
    role: "Diretor Clínico",
    company: "Clínica Saúde Total",
    rating: 5,
  },
  {
    quote: "Com confirmações automatizadas e fila de espera ativa, o no-show caiu de forma consistente.",
    author: "Dra. Ana Paula",
    role: "Coordenadora",
    company: "Centro Médico Vida",
    rating: 5,
  },
  {
    quote: "Finalmente conseguimos atender fora do horário comercial sem custos extras.",
    author: "Carlos Eduardo",
    role: "Gestor Administrativo",
    company: "Policlínica Norte",
    rating: 5,
  },
  {
    quote: "O projeto se pagou rápido com recuperação de leads e melhoria no aproveitamento da agenda.",
    author: "Dra. Fernanda Lima",
    role: "Sócia-fundadora",
    company: "Clínica Premium Care",
    rating: 5,
  },
];

interface Partner {
  name: string;
  segment: string;
}

const partners: Partner[] = [
  { name: "Clínica Saúde Total", segment: "Medicina Geral" },
  { name: "Centro Médico Vida", segment: "Especialidades" },
  { name: "Policlínica Norte", segment: "Multi-especialidades" },
  { name: "Premium Care", segment: "Medicina Premium" },
  { name: "Instituto Diagnóstico", segment: "Diagnóstico por Imagem" },
  { name: "Rede Bem-Estar", segment: "Clínicas Populares" },
];

export default function SocialProofMarquee() {
  return (
    <section className="py-12 bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider"
        >
          Metodologia aplicada em clínicas de referência
        </motion.p>
      </div>

      {/* Partners Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        <div className="marquee-container">
          <div className="marquee-content">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm mx-3 hover:border-prime-accent/50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-prime/5 flex items-center justify-center group-hover:bg-prime-accent/10 transition-colors">
                  <Building2 className="w-4 h-4 text-prime" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-800">{partner.name}</span>
                  <span className="text-xs text-slate-400 ml-2">{partner.segment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-7xl px-4 mt-12">
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-prime-accent/10 flex items-center justify-center shrink-0">
                  <Quote className="w-5 h-5 text-prime-accent" />
                </div>
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{testimonial.author}</p>
                      <p className="text-xs text-slate-500">
                        {testimonial.role} - {testimonial.company}
                      </p>
                    </div>
                    {testimonial.rating && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-prime-accent fill-prime-accent" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

// Compact version for smaller spaces
export function SocialProofBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
        <Star className="w-4 h-4 text-prime-accent fill-prime-accent" />
        <span className="text-sm font-medium text-slate-700">Satisfação alta</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
        <Building2 className="w-4 h-4 text-prime" />
        <span className="text-sm font-medium text-slate-700">Clínicas em operação</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
        <span className="text-sm font-medium text-slate-700">Operação 24/7</span>
      </div>
    </div>
  );
}
