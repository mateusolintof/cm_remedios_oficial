"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  DollarSign,
  Zap,
  Target,
  BarChart3,
  ArrowRight,
  Sparkles,
  Calculator,
} from "lucide-react";

type SolutionType = "agendamento" | "faq" | "triagem-noshow" | "pesquisa";

type Props = {
  solution: SolutionType;
};

const benefitsData = {
  agendamento: {
    title: "SDR & Agendamento Inteligente",
    description: "Automatize a recepção e qualificação de pacientes 24/7.",
    tagline: "O agente que nunca dorme",
    investment: {
      setup: 45000,
      monthly: 5000,
    },
    roi: {
      metric: "+40%",
      label: "Conversão",
      description: "Aumento médio na taxa de conversão de leads",
    },
    kpis: [
      { value: "0s", label: "Tempo de Resposta" },
      { value: "24/7", label: "Disponibilidade" },
      { value: "100%", label: "Leads Atendidos" },
    ],
    benefits: [
      {
        icon: Clock,
        title: "Atendimento Imediato (0s)",
        desc: "Elimine o tempo de espera. O paciente é atendido no momento em que envia a mensagem, aumentando a conversão.",
        impact: "Reduz abandono em 70%",
      },
      {
        icon: TrendingUp,
        title: "Aumento de 40% na Conversão",
        desc: "Captura leads fora do horário comercial e garante que nenhuma oportunidade seja perdida por demora na resposta.",
        impact: "+500 leads/mês recuperados",
      },
      {
        icon: DollarSign,
        title: "Qualificação Automática",
        desc: "Separa convênio de particular e prioriza tickets altos, otimizando a agenda dos médicos.",
        impact: "Ticket médio +25%",
      },
      {
        icon: Zap,
        title: "Integração ERP Completa",
        desc: "Agenda unificada com seu sistema atual. Sem retrabalho, sem duplicação de dados.",
        impact: "Zero entrada manual",
      },
    ],
    calculations: {
      scenario: "Se você recebe 1.000 leads/mês e converte 10% (100 pacientes):",
      before: { conversions: 100, avgTicket: 350, revenue: 35000 },
      after: { conversions: 140, avgTicket: 437, revenue: 61180 },
      monthlyGain: 26180,
    },
  },
  faq: {
    title: "FAQ Inteligente & Educacional",
    description: "Tire dúvidas instantaneamente e reduza a carga operacional.",
    tagline: "Base de conhecimento que aprende",
    investment: {
      setup: 15000,
      monthly: 2000,
    },
    roi: {
      metric: "-80%",
      label: "Suporte",
      description: "Redução nas dúvidas repetitivas para equipe",
    },
    kpis: [
      { value: "80%", label: "Dúvidas Resolvidas" },
      { value: "<3s", label: "Tempo de Resposta" },
      { value: "24/7", label: "Disponível" },
    ],
    benefits: [
      {
        icon: ShieldCheck,
        title: "Redução de 80% no Suporte",
        desc: "A IA responde dúvidas repetitivas (preparo, endereço, valores) liberando a equipe para casos complexos.",
        impact: "4h/dia economizadas",
      },
      {
        icon: CheckCircle2,
        title: "Precisão na Informação",
        desc: "Base de conhecimento treinada com os protocolos da clínica, garantindo respostas padronizadas e corretas.",
        impact: "Zero erro humano",
      },
      {
        icon: Clock,
        title: "Disponibilidade 24h",
        desc: "Pacientes tiram dúvidas a qualquer hora, reduzindo a ansiedade e aumentando a confiança na clínica.",
        impact: "NPS +15 pontos",
      },
      {
        icon: Target,
        title: "OCR para Documentos",
        desc: "Leitura automática de carteirinhas, pedidos médicos e documentos para agilizar o atendimento.",
        impact: "Atendimento 3x mais rápido",
      },
    ],
    calculations: {
      scenario: "Se sua equipe gasta 4h/dia respondendo dúvidas (R$ 25/h):",
      before: { hours: 88, cost: 2200, satisfaction: 7.2 },
      after: { hours: 17, cost: 440, satisfaction: 9.1 },
      monthlyGain: 1760,
    },
  },
  "triagem-noshow": {
    title: "Pré-triagem & Anti No-Show",
    description: "Garanta que o paciente compareça à consulta agendada.",
    tagline: "Cada horário vago é receita perdida",
    investment: {
      setup: 15000,
      monthly: 2000,
    },
    roi: {
      metric: "-60%",
      label: "No-Show",
      description: "Redução média na taxa de faltas",
    },
    kpis: [
      { value: "95%", label: "Taxa de Confirmação" },
      { value: "D-2/D-1", label: "Lembretes" },
      { value: "Auto", label: "Fila de Espera" },
    ],
    benefits: [
      {
        icon: TrendingUp,
        title: "Redução de 60% no No-Show",
        desc: "Confirmações automáticas em D-2 e D-1 com reengajamento inteligente via WhatsApp.",
        impact: "De 20% para 8% de faltas",
      },
      {
        icon: DollarSign,
        title: "Recuperação de Receita",
        desc: "Preenche horários vagos automaticamente com lista de espera, evitando buracos na agenda.",
        impact: "+12 consultas/mês recuperadas",
      },
      {
        icon: CheckCircle2,
        title: "Triagem Clínica Prévia",
        desc: "Coleta informações essenciais antes da consulta, agilizando o atendimento médico.",
        impact: "-10min por consulta",
      },
      {
        icon: BarChart3,
        title: "Dashboard de Confirmações",
        desc: "Visualize em tempo real quem confirmou, quem precisa de follow-up e slots disponíveis.",
        impact: "100% de visibilidade",
      },
    ],
    calculations: {
      scenario: "Se você tem 200 consultas/mês com 20% de no-show (40 faltas):",
      before: { noShows: 40, lostRevenue: 14000, utilization: 80 },
      after: { noShows: 16, lostRevenue: 5600, utilization: 92 },
      monthlyGain: 8400,
    },
  },
  pesquisa: {
    title: "Pós-venda & Satisfação",
    description: "Fidelize pacientes e construa uma reputação online sólida.",
    tagline: "Transforme pacientes em promotores",
    investment: {
      setup: 15000,
      monthly: 2000,
    },
    roi: {
      metric: "+300%",
      label: "Avaliações",
      description: "Aumento nas avaliações 5 estrelas no Google",
    },
    kpis: [
      { value: "4.8", label: "Rating Médio" },
      { value: "+50", label: "Reviews/mês" },
      { value: "NPS 70+", label: "Satisfação" },
    ],
    benefits: [
      {
        icon: TrendingUp,
        title: "Aumento de Avaliações 5 Estrelas",
        desc: "Direciona promotores (NPS alto) para avaliar no Google, melhorando o ranqueamento da clínica.",
        impact: "+50 reviews 5 estrelas/mês",
      },
      {
        icon: ShieldCheck,
        title: "Gestão de Crise",
        desc: "Identifica detratores e alerta a gerência antes que uma reclamação pública seja feita.",
        impact: "Previne 90% das reclamações",
      },
      {
        icon: DollarSign,
        title: "LTV (Lifetime Value) Maior",
        desc: "Pacientes satisfeitos retornam e indicam novos pacientes, gerando um ciclo virtuoso de receita.",
        impact: "+35% de retorno",
      },
      {
        icon: Target,
        title: "Análise de Sentimentos",
        desc: "IA analisa feedbacks e identifica padrões para melhoria contínua do atendimento.",
        impact: "Insights acionáveis",
      },
    ],
    calculations: {
      scenario: "Se 10% dos seus pacientes indicam novos (CAC zero):",
      before: { reviews: 5, newPatients: 10, cac: 150 },
      after: { reviews: 55, newPatients: 35, cac: 0 },
      monthlyGain: 5250,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SolutionBenefitsModalContent({ solution }: Props) {
  const data = benefitsData[solution];

  if (!data) return null;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-prime to-prime-dark text-white px-6 md:px-10 py-10 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-prime-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-prime-accent mb-4">
              <Sparkles className="w-3 h-3" />
              {data.tagline}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{data.title}</h2>
            <p className="text-lg text-slate-300 max-w-2xl">{data.description}</p>
          </motion.div>

          {/* KPIs Row */}
          <motion.div
            className="mt-8 grid grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {data.kpis.map((kpi, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
              >
                <div className="text-2xl md:text-3xl font-bold text-white">{kpi.value}</div>
                <div className="text-xs text-slate-300 mt-1">{kpi.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        {/* Benefits Grid */}
        <motion.div
          className="grid gap-4 md:gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {data.benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-prime-accent/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prime/10 to-prime-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-6 w-6 text-prime" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-900">{benefit.title}</h3>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
                      <TrendingUp className="w-3 h-3" />
                      {benefit.impact}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-2">{benefit.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ROI Calculator Section */}
        <motion.div
          className="mt-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-prime-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-prime-accent/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-prime-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Cálculo de Retorno</h3>
                <p className="text-sm text-slate-400">{data.calculations.scenario}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Cenário Atual</div>
                <div className="space-y-3">
                  {Object.entries(data.calculations.before).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-semibold text-white">
                        {typeof value === "number" && key.toLowerCase().includes("revenue") || key.toLowerCase().includes("cost") || key.toLowerCase().includes("lost")
                          ? formatCurrency(value)
                          : value}
                        {key.toLowerCase().includes("utilization") && "%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/20">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Com a Solução
                </div>
                <div className="space-y-3">
                  {Object.entries(data.calculations.after).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-semibold text-emerald-400">
                        {typeof value === "number" && key.toLowerCase().includes("revenue") || key.toLowerCase().includes("cost") || key.toLowerCase().includes("lost")
                          ? formatCurrency(value)
                          : value}
                        {key.toLowerCase().includes("utilization") && "%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Gain */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-xl p-5 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-emerald-300 mb-1">Ganho Mensal Estimado</div>
                  <div className="text-3xl font-bold text-white">{formatCurrency(data.calculations.monthlyGain)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-emerald-300 mb-1">ROI em</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {Math.ceil(data.investment.setup / data.calculations.monthlyGain)} meses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Investment Summary */}
        <motion.div
          className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-prime" />
            Investimento Individual
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Setup (Único)</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(data.investment.setup)}</div>
              <p className="text-xs text-slate-500 mt-2">Desenvolvimento, integração e treinamento</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mensalidade</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(data.investment.monthly)}<span className="text-sm font-normal text-slate-500">/mês</span></div>
              <p className="text-xs text-slate-500 mt-2">Suporte, manutenção e otimizações</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-emerald-600">Dica:</span> Contrate o Ecossistema Full e economize até R$ 24.000
              </div>
              <div className="flex items-center gap-2 text-prime font-semibold text-sm">
                Ver pacote completo
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            Essa solução se paga sozinha apenas com a recuperação de oportunidades perdidas.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
