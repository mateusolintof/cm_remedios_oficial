"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Zap, Clock, HelpCircle, Lock, RefreshCw } from "lucide-react";

interface FAQItem {
  icon: React.ReactNode;
  question: string;
  answer: string;
  category: "seguranca" | "integracao" | "garantia" | "timeline" | "suporte";
}

const faqItems: FAQItem[] = [
  {
    icon: <Shield className="w-5 h-5" />,
    question: "Os dados dos pacientes estão seguros? A solução é compatível com a LGPD?",
    answer: "Sim, 100%. Nossa infraestrutura segue rigorosos padrões de segurança: criptografia de ponta a ponta (AES-256), servidores em data centers certificados ISO 27001 no Brasil, e total conformidade com a LGPD. Além disso, você mantém controle total sobre os dados - eles são seus, e podemos exportá-los ou excluí-los quando desejar.",
    category: "seguranca",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    question: "Como funciona a integração com nosso sistema ERP/agenda atual?",
    answer: "Desenvolvemos integrações customizadas para cada cliente. Trabalhamos com os principais ERPs do mercado de saúde (MV, Tasy, Totvs, Philips, etc.) e sistemas de agenda. A integração é feita via API segura, sem necessidade de substituir seu sistema atual. Durante a fase de kick-off, mapeamos suas necessidades específicas.",
    category: "integracao",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    question: "E se os resultados não forem os esperados? Existe garantia?",
    answer: "Oferecemos um período de 90 dias para validação de resultados. Se após esse período, com uso correto da plataforma, os indicadores não apresentarem melhoria significativa, renegociamos os termos ou encerramos o contrato sem multa. Nosso objetivo é parceria de longo prazo, não contratos forçados.",
    category: "garantia",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    question: "Quanto tempo leva para implementar e ver resultados?",
    answer: "A implementação completa leva de 4 a 6 semanas, dependendo da complexidade das integrações. Os primeiros resultados (redução de tempo de resposta e aumento de leads capturados fora do horário) aparecem já na primeira semana de operação. Resultados consolidados de conversão são visíveis a partir do segundo mês.",
    category: "timeline",
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    question: "Preciso de conhecimento técnico para operar o sistema?",
    answer: "Não! O sistema foi desenhado para ser gerenciado por qualquer pessoa da sua equipe. Oferecemos treinamento completo durante a implementação e suporte contínuo. Alterações nos fluxos, mensagens e configurações podem ser feitas através de uma interface amigável, sem necessidade de código.",
    category: "suporte",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    question: "Posso cancelar o contrato a qualquer momento?",
    answer: "Sim. Trabalhamos com contratos de 12 meses (para garantir tempo adequado de implementação e maturação), mas com possibilidade de cancelamento após os primeiros 90 dias mediante aviso prévio de 30 dias. Não há multas abusivas - apenas cobramos o proporcional ao uso.",
    category: "garantia",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-prime mt-2">
            Perguntas que Você Pode Estar se Fazendo
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Transparência total sobre segurança, integrações, garantias e prazos.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-prime-accent/30 transition-colors"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-prime-accent focus-visible:ring-inset"
                aria-expanded={openIndex === index}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  openIndex === index
                    ? "bg-prime text-white"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {item.icon}
                </div>
                <span className={`flex-1 font-semibold transition-colors ${
                  openIndex === index ? "text-prime" : "text-slate-800"
                }`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className={`w-5 h-5 transition-colors ${
                    openIndex === index ? "text-prime-accent" : "text-slate-400"
                  }`} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pl-20">
                      <p className="text-slate-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-slate-500 text-sm">
            Ainda tem dúvidas?{" "}
            <span className="font-semibold text-prime">
              Estamos à disposição para esclarecer qualquer ponto.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
