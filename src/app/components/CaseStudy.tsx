"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, Quote, ArrowUpRight } from "lucide-react";

interface CaseStudyData {
  company: string;
  segment: string;
  challenge: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  quote: string;
  author: string;
  role: string;
  timeToResults: string;
}

const caseStudies: CaseStudyData[] = [
  {
    company: "Centro Médico Vida Nova",
    segment: "Clínica Multi-especialidades",
    challenge: "Alta taxa de no-show e perda de leads fora do horário comercial",
    results: [
      { metric: "Taxa de No-Show", before: "32%", after: "12%", improvement: "-62%" },
      { metric: "Conversão de Leads", before: "18%", after: "41%", improvement: "+128%" },
      { metric: "Tempo de Resposta", before: "2h+", after: "<1min", improvement: "-98%" },
    ],
    quote: "Em 60 dias conseguimos recuperar o investimento. Hoje não conseguimos imaginar operar sem o sistema.",
    author: "Dr. Marcelo Santos",
    role: "Diretor Clínico",
    timeToResults: "60 dias",
  },
  {
    company: "Clínica Premium Diagnósticos",
    segment: "Diagnóstico por Imagem",
    challenge: "Sobrecarga da equipe de atendimento e baixa satisfação dos pacientes",
    results: [
      { metric: "NPS", before: "45", after: "78", improvement: "+73%" },
      { metric: "Agendamentos/mês", before: "850", after: "1.420", improvement: "+67%" },
      { metric: "Custo por Lead", before: "R$ 45", after: "R$ 18", improvement: "-60%" },
    ],
    quote: "A equipe finalmente pode focar no atendimento presencial enquanto a IA cuida do digital.",
    author: "Dra. Carolina Lima",
    role: "Sócia-fundadora",
    timeToResults: "45 dias",
  },
];

export default function CaseStudySection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
            Cases de Sucesso
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-prime mt-2">
            Resultados Reais de Clínicas como a Sua
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Conheça como outras clínicas transformaram seu atendimento e multiplicaram resultados com nossa metodologia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Header */}
              <div className="bg-prime p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{study.company}</h3>
                    <p className="text-prime-accent/80 text-sm mt-1">{study.segment}</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                    <Clock className="w-3 h-3" />
                    {study.timeToResults}
                  </div>
                </div>
                <p className="text-white/70 text-sm mt-4 leading-relaxed">
                  <strong className="text-white">Desafio:</strong> {study.challenge}
                </p>
              </div>

              {/* Results */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.map((result, rIndex) => (
                    <motion.div
                      key={rIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + rIndex * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-xs text-slate-500 mb-1">{result.metric}</div>
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <span className="text-slate-400 line-through">{result.before}</span>
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                        <span className="font-bold text-slate-800">{result.after}</span>
                      </div>
                      <div className={`text-xs font-bold mt-1 ${
                        result.improvement.startsWith("+") ? "text-emerald-600" : "text-blue-600"
                      }`}>
                        {result.improvement}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex gap-3">
                    <Quote className="w-6 h-6 text-prime-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-700 text-sm leading-relaxed italic">
                        &ldquo;{study.quote}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-prime/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-prime" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{study.author}</p>
                          <p className="text-xs text-slate-500">{study.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600">
            <span className="font-semibold text-prime">Sua clínica pode ser o próximo case de sucesso.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Compact mini case study for use in other sections
export function MiniCaseStudy({ company, metric, improvement }: { company: string; metric: string; improvement: string }) {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
        <TrendingUp className="w-3 h-3 text-emerald-600" />
      </div>
      <span className="text-sm">
        <strong className="text-slate-800">{company}</strong>
        <span className="text-slate-500"> → </span>
        <span className="text-emerald-600 font-bold">{improvement}</span>
        <span className="text-slate-400 text-xs ml-1">{metric}</span>
      </span>
    </div>
  );
}
