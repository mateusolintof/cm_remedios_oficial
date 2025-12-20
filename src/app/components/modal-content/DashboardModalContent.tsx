"use client";

import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  BarChart3,
  Brain,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Gauge,
  Lightbulb,
  Menu,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type TabKey = "geral" | "ia" | "vendedores" | "clientes" | "insights";

type FunnelStage = {
  key: string;
  name: string;
  value: number;
  fill: string;
};

function FunnelVisualization({ stages }: { stages: FunnelStage[] }) {
  const total = stages[0]?.value ?? 0;
  const viewBoxWidth = 320;
  const viewBoxHeight = 240;
  const gap = 10;
  const segmentHeight = (viewBoxHeight - gap * (stages.length - 1)) / stages.length;
  const maxWidth = viewBoxWidth * 0.86;
  const centerX = viewBoxWidth / 2;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className="h-full w-full"
      role="img"
      aria-label="Funil de vendas"
      focusable="false"
    >
      <defs>
        <filter id="funnelShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(4, 30, 66, 0.18)" />
        </filter>
      </defs>

      {stages.map((stage, idx) => {
        const ratioTop = total > 0 ? stage.value / total : 0;
        const ratioBottom =
          idx < stages.length - 1 && total > 0 ? stages[idx + 1].value / total : Math.max(0.08, ratioTop * 0.78);

        const topWidth = Math.max(32, maxWidth * ratioTop);
        const bottomWidth = Math.max(26, maxWidth * ratioBottom);
        const y = idx * (segmentHeight + gap);
        const xTop = centerX - topWidth / 2;
        const xBottom = centerX - bottomWidth / 2;
        const gradientId = `funnelGradient-${stage.key}`;
        const path = `M ${xTop} ${y} L ${xTop + topWidth} ${y} L ${xBottom + bottomWidth} ${y + segmentHeight} L ${xBottom} ${y + segmentHeight} Z`;

        return (
          <g key={stage.key} filter="url(#funnelShadow)">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--prime-accent)" stopOpacity={0.22} />
                <stop offset="55%" stopColor={stage.fill} stopOpacity={0.92} />
                <stop offset="100%" stopColor={stage.fill} stopOpacity={1} />
              </linearGradient>
            </defs>
            <path
              d={path}
              fill={`url(#${gradientId})`}
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={1}
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

type Client = {
  id: number;
  nome: string;
  etapa: string;
  temperatura: "Quente" | "Morno" | "Frio";
  score: number;
  tags: string[];
  canal: string;
  ticket: string;
  ultimaAcao: string;
  analise: {
    resumo: string;
    sinais: string[];
    riscos: string[];
    proximaAcao: string;
  };
};

const rangeOptions = {
  "7d": "Últimos 7 dias",
  "30d": "Últimos 30 dias",
  "90d": "Últimos 90 dias",
} as const;

const navItems: { key: TabKey; label: string; icon: ReactNode }[] = [
  { key: "geral", label: "Visão geral", icon: <BarChart3 size={16} /> },
  { key: "ia", label: "Gestão IA", icon: <Brain size={16} /> },
  { key: "vendedores", label: "Atendimento vendedores", icon: <Trophy size={16} /> },
  { key: "clientes", label: "Clientes", icon: <UserRound size={16} /> },
  { key: "insights", label: "Insights + reports", icon: <Lightbulb size={16} /> },
];

const kpisGeral = [
  { label: "Leads/dia", value: "150", meta: "Média 7 dias" },
  { label: "Qualificados", value: "55%", meta: "Por intenção" },
  { label: "Agendamentos", value: "38%", meta: "Lead → agenda" },
  { label: "No-show", value: "14%", meta: "Últimos 30 dias" },
  { label: "Receita (pipeline)", value: "R$ 1,2M", meta: "Próx. 30 dias" },
  { label: "Pipeline", value: "R$ 2,1M", meta: "Em negociação" },
];

const leadTrend = [
  { name: "Seg", leads: 138, qualificados: 82, agendados: 52 },
  { name: "Ter", leads: 156, qualificados: 92, agendados: 58 },
  { name: "Qua", leads: 172, qualificados: 101, agendados: 64 },
  { name: "Qui", leads: 184, qualificados: 110, agendados: 70 },
  { name: "Sex", leads: 168, qualificados: 98, agendados: 62 },
  { name: "Sab", leads: 142, qualificados: 85, agendados: 54 },
];

const funnelStageData: FunnelStage[] = [
  { key: "leads", name: "Leads", value: 4500, fill: "var(--prime-primary)" },
  { key: "qualificados", name: "Qualificados", value: 2500, fill: "var(--prime-accent)" },
  { key: "agendados", name: "Agendados", value: 1700, fill: "color-mix(in oklab, var(--prime-primary) 70%, var(--background))" },
  { key: "confirmados", name: "Confirmados", value: 1500, fill: "color-mix(in oklab, var(--prime-accent) 60%, var(--background))" },
  { key: "realizados", name: "Realizados", value: 1300, fill: "color-mix(in oklab, var(--prime-primary) 85%, var(--background))" },
];

const compactNumberFormatter = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });
const formatCompactNumber = (value: number) => compactNumberFormatter.format(value);

const channelPerf = [
  { name: "WhatsApp", conversao: 44 },
  { name: "Instagram", conversao: 36 },
  { name: "Google", conversao: 31 },
  { name: "Indicação", conversao: 58 },
];

const iaVolume = [
  { name: "Seg", resolvidos: 180, escalados: 60 },
  { name: "Ter", resolvidos: 210, escalados: 70 },
  { name: "Qua", resolvidos: 240, escalados: 82 },
  { name: "Qui", resolvidos: 260, escalados: 90 },
  { name: "Sex", resolvidos: 230, escalados: 78 },
  { name: "Sab", resolvidos: 190, escalados: 65 },
];

const iaIntentos = [
  { name: "Agendamento", volume: 320 },
  { name: "FAQ", volume: 210 },
  { name: "Reagendamento", volume: 160 },
  { name: "Pre-cadastro", volume: 140 },
];

const vendedoresPerf = [
  { name: "Ana", deals: 28, score: 92 },
  { name: "Carlos", deals: 24, score: 89 },
  { name: "Julio", deals: 21, score: 85 },
  { name: "Marina", deals: 18, score: 81 },
];

const tempoAtendimento = [
  { name: "Seg", tempo: 18 },
  { name: "Ter", tempo: 16 },
  { name: "Qua", tempo: 14 },
  { name: "Qui", tempo: 13 },
  { name: "Sex", tempo: 15 },
  { name: "Sab", tempo: 17 },
];

const clients: Client[] = [
  {
    id: 1,
    nome: "Marina Duarte",
    etapa: "Agendado",
    temperatura: "Quente",
    score: 88,
    tags: ["Cirurgia", "Convênio"],
    canal: "WhatsApp",
    ticket: "R$ 4.200",
    ultimaAcao: "Hoje 09:18",
    analise: {
      resumo: "Alta intencao, respondeu rapido e enviou exames completos.",
      sinais: ["Resposta em menos de 4 min", "Aceitou horario sugerido", "Convênio validado"],
      riscos: ["Consulta em horario de pico"],
      proximaAcao: "Confirmar lembrete D-1 e preparar checklist pre-op.",
    },
  },
  {
    id: 2,
    nome: "Rafael Souza",
    etapa: "Proposta",
    temperatura: "Morno",
    score: 72,
    tags: ["Consulta", "Particular"],
    canal: "Instagram",
    ticket: "R$ 1.800",
    ultimaAcao: "Hoje 08:40",
    analise: {
      resumo: "Precisa de reforco de valor e prova social antes de fechar.",
      sinais: ["Engajamento em conteudo educativo", "Perguntou sobre parcelamento"],
      riscos: ["Comparando com concorrentes"],
      proximaAcao: "Enviar depoimentos e simulacao de pagamento.",
    },
  },
  {
    id: 3,
    nome: "Patricia Lima",
    etapa: "Follow-up",
    temperatura: "Frio",
    score: 54,
    tags: ["Follow-up"],
    canal: "Google",
    ticket: "R$ 980",
    ultimaAcao: "Ontem 18:20",
    analise: {
      resumo: "Baixa resposta, precisa de reengajamento com oferta de horario.",
      sinais: ["Leu mensagem, nao respondeu"],
      riscos: ["Risco de abandono"],
      proximaAcao: "Oferecer horario noturno + CTA direto.",
    },
  },
];

const insights = [
  {
    title: "Oportunidade de receita",
    desc: "Fila de espera tem 47 pacientes e 12 horários vagos na próxima semana.",
    action: "Disparar campanha de remarcacao",
  },
  {
    title: "Objeção principal",
    desc: "79% dos leads de cirurgia citam preco alto no primeiro contato.",
    action: "Apresentar parcelamento antes da objeção",
  },
  {
    title: "Melhor canal",
    desc: "Indicações convertem 94% e apresentam LTV 2,4x maior.",
    action: "Ativar programa de indicações",
  },
];

	const reportCards = [
	  {
	    title: "Relatório executivo",
	    desc: "Performance comercial, atendimento e receita projetada em PDF.",
	  },
  {
    title: "Relatório granular",
    desc: "Detalhe por canal, campanha e funil com segmentações.",
  },
  {
    title: "Alertas automação",
    desc: "Acionamentos, follow-ups e tarefas pendentes da IA.",
  },
];

const leadTrendChartConfig = {
  leads: { label: "Leads", color: "var(--prime-primary)" },
  agendados: { label: "Agendados", color: "var(--prime-accent)" },
} satisfies ChartConfig;

const channelChartConfig = {
  conversao: { label: "Conversão", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const iaVolumeChartConfig = {
  resolvidos: { label: "Resolvidos", color: "var(--prime-primary)" },
  escalados: { label: "Escalados", color: "var(--prime-accent)" },
} satisfies ChartConfig;

const iaIntentChartConfig = {
  volume: { label: "Intencoes", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const sellerDealChartConfig = {
  deals: { label: "Deals", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const tempoChartConfig = {
  tempo: { label: "Tempo medio", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const insightChartConfig = {
  qualificados: { label: "Qualificados", color: "var(--prime-primary)" },
} satisfies ChartConfig;

export default function DashboardModalContent() {
  const [tab, setTab] = useState<TabKey>("geral");
  const [range, setRange] = useState<keyof typeof rangeOptions>("30d");
  const [navOpen, setNavOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>(clients[0].id);

  const selectedClient = clients.find((client) => client.id === selectedClientId) ?? clients[0];

  return (
    <div className="relative h-full flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="px-4 py-3 lg:px-6 lg:py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setNavOpen(true)}
                aria-label="Abrir menu"
                className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-prime">Dashboard executivo</p>
                <div className="text-xl font-bold text-slate-900 lg:text-2xl">Visão completa do atendimento comercial</div>
                <div className="text-sm text-slate-600">KPIs, funis e insights com suporte de IA</div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
              {(Object.keys(rangeOptions) as Array<keyof typeof rangeOptions>).map((key) => (
                <button
                  key={key}
                  onClick={() => setRange(key)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition lg:px-4 ${
                    range === key
                      ? "bg-prime text-white shadow"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Clock3 size={14} />
                  {rangeOptions[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex flex-1 min-h-0">
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setNavOpen(false)}
          className={`absolute inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] transition lg:hidden ${
            navOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <aside
          className={`absolute inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-prime/30 bg-prime px-5 py-6 text-white shadow-2xl transition-transform duration-200 lg:static lg:z-auto lg:w-72 lg:max-w-none lg:translate-x-0 lg:border-r lg:shadow-none lg:overflow-y-auto ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold">AI</div>
              <div>
                <div className="text-sm font-semibold">Dashboard</div>
                <div className="text-xs text-white/60">Menu principal</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNavOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/15 lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">Main</div>
	            <div className="mt-3 space-y-1">
	              {navItems.map((item) => (
	                <button
	                  key={item.key}
	                  onClick={() => {
	                    setTab(item.key);
	                    setNavOpen(false);
	                  }}
	                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
	                    tab === item.key ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
	                  }`}
	                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
              Dados anonimizados para demo comercial.
            </div>
          </div>
        </aside>

	        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 lg:p-6">
        {tab === "geral" && (
          <div className="space-y-6">
	            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
	              {kpisGeral.map((kpi) => (
	                <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
	                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
	                    {kpi.label}
	                    <CheckCircle2 size={14} className="text-prime-accent" />
	                  </div>
	                  <div className="mt-2 text-2xl font-bold tabular-nums text-slate-900">{kpi.value}</div>
	                  <div className="text-xs text-slate-500">{kpi.meta}</div>
	                </div>
	              ))}
	            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-slate-900">Leads e agendamentos</div>
                  <div className="text-xs text-slate-500">{rangeOptions[range]}</div>
                </div>
                <div className="mt-4">
                  <ChartContainer config={leadTrendChartConfig} className="h-56 w-full">
                    <AreaChart data={leadTrend}>
	                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="leads" stroke="var(--color-leads)" fill="var(--color-leads)" fillOpacity={0.12} />
                      <Area type="monotone" dataKey="agendados" stroke="var(--color-agendados)" fill="var(--color-agendados)" fillOpacity={0.2} />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>

	              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
	                <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
	                  <Gauge size={18} className="text-prime" />
	                  Funil de vendas
	                </div>
	                <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
	                  <div className="h-60 w-full">
	                    <FunnelVisualization stages={funnelStageData} />
	                  </div>
	                  <div className="space-y-3">
	                    {funnelStageData.map((stage, idx) => {
	                      const total = funnelStageData[0]?.value ?? 0;
	                      const pctTotal = total > 0 ? (stage.value / total) * 100 : 0;
	                      const pctLabel = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(pctTotal) + "%";

	                      return (
	                      <div
	                        key={stage.key}
	                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
	                      >
	                        <div className="flex min-w-0 flex-1 items-center gap-2">
	                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: stage.fill }} />
	                          <span className="whitespace-nowrap font-semibold text-slate-900">{stage.name}</span>
	                        </div>
	                        <div className="flex shrink-0 items-center gap-2 text-xs">
	                          <span className="w-14 text-right tabular-nums font-semibold text-slate-700">
	                            {formatCompactNumber(stage.value)}
	                          </span>
	                          <span className="tabular-nums rounded-full border border-slate-200 bg-white px-2 py-0.5 text-slate-500">
	                            {idx === 0 ? "100%" : pctLabel}
	                          </span>
	                        </div>
	                      </div>
	                      );
	                    })}
	                    <div className="rounded-lg border border-prime-accent/40 bg-prime-accent/10 px-3 py-2 text-xs text-prime">
	                      Oportunidade: reforçar follow-up nos primeiros 20 minutos para reduzir queda entre “Qualificados” e “Agendados”.
	                    </div>
	                  </div>
	                </div>
	              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Target size={16} className="text-prime" />
                  Conversão por canal
                </div>
                <div className="mt-4">
                  <ChartContainer config={channelChartConfig} className="h-44 w-full">
                    <BarChart data={channelPerf}>
	                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="conversao" fill="var(--color-conversao)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="mt-2 text-xs text-slate-500">Indicação continua com maior conversão.</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarCheck2 size={16} className="text-prime" />
                  Agenda diária
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Ocupação</span>
                    <span>82% • 3 lacunas</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div className="h-3 rounded-full bg-prime-accent" style={{ width: "82%" }} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {["08h-10h", "13h-15h", "17h-19h"].map((slot) => (
                      <div key={slot} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                        <div className="font-semibold text-prime">{slot}</div>
                        <div className="text-slate-500">Fila ativa</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-prime-accent/40 bg-prime-accent/10 px-3 py-2 text-xs text-prime">
                  Anti no-show ligado: lembretes 48h, 24h e 2h.
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "ia" && (
	            <div className="space-y-6">
	            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
	              {[
	                { label: "Atendimentos (IA)", value: "820", meta: "Últimos 7 dias" },
	                { label: "Leads qualificados", value: "470", meta: "Últimos 7 dias" },
	                { label: "Escalados", value: "160", meta: "Para humano" },
	                { label: "Tempo de resposta", value: "≈ 6 min", meta: "Média" },
	              ].map((kpi) => (
	                <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
	                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{kpi.label}</div>
	                  <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
	                  <div className="text-xs text-slate-500">{kpi.meta}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
	              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
	                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
	                  <Sparkles size={16} className="text-prime" />
	                  Resolução IA vs escalados
	                </div>
                <div className="mt-4">
                  <ChartContainer config={iaVolumeChartConfig} className="h-52 w-full">
                    <AreaChart data={iaVolume}>
	                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="resolvidos" stroke="var(--color-resolvidos)" fill="var(--color-resolvidos)" fillOpacity={0.12} />
                      <Area type="monotone" dataKey="escalados" stroke="var(--color-escalados)" fill="var(--color-escalados)" fillOpacity={0.18} />
                    </AreaChart>
                  </ChartContainer>
                </div>
	                <div className="mt-2 text-xs text-slate-500">Acompanhe quanto a IA resolve e quanto é escalado para o time.</div>
	              </div>

	              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
	                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
	                  <MessageSquare size={16} className="text-prime" />
	                  Principais intenções
	                </div>
                <div className="mt-4">
                  <ChartContainer config={iaIntentChartConfig} className="h-52 w-full">
                    <BarChart data={iaIntentos}>
	                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="var(--color-volume)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
	                <div className="mt-2 text-xs text-slate-500">Entenda quais intents mais impactam a operação.</div>
	              </div>
            </div>

	            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
	              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
	                <ShieldCheck size={16} className="text-prime" />
	                Qualidade e conformidade
	              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-3 text-sm text-slate-600">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="font-semibold text-slate-900">LGPD em dia</div>
                  <div>Consentimentos registrados em 100% dos leads.</div>
                </div>
	                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
	                  <div className="font-semibold text-slate-900">Tempo de resposta</div>
	                  <div>Relatórios por canal e por etapa (IA vs humano), com priorização.</div>
	                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="font-semibold text-slate-900">Acuracia</div>
                  <div>Classificacao correta em 93% das triagens.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "vendedores" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Tempo medio", value: "14 min", meta: "Atendimento humano" },
                { label: "Score medio", value: "88", meta: "Satisfacao" },
                { label: "Deals fechados", value: "91", meta: "Últimos 30 dias" },
                { label: "Receita", value: "R$ 1,2M", meta: "Com humano" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
                  <div className="text-xs text-slate-500">{kpi.meta}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Trophy size={16} className="text-prime" />
                  Deals por vendedor
                </div>
                <div className="mt-4">
                  <ChartContainer config={sellerDealChartConfig} className="h-52 w-full">
                    <BarChart data={vendedoresPerf}>
	                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="deals" fill="var(--color-deals)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Clock3 size={16} className="text-prime" />
                  Tempo medio por dia
                </div>
                <div className="mt-4">
                  <ChartContainer config={tempoChartConfig} className="h-52 w-full">
                    <LineChart data={tempoAtendimento}>
	                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="tempo" stroke="var(--color-tempo)" strokeWidth={3} dot={{ fill: "var(--color-tempo)", r: 4 }} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-700">Score por vendedor</div>
                <span className="text-xs text-slate-500">IA valida qualidade do atendimento</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {vendedoresPerf.map((seller) => (
                  <div key={seller.name} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-900">{seller.name}</div>
                      <div className="text-prime">Score {seller.score}</div>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white">
                      <div className="h-2 rounded-full bg-prime-accent" style={{ width: `${seller.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "clientes" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xl font-bold text-slate-900">Base de clientes qualificados</div>
                <div className="text-sm text-slate-600">Clique para abrir análise IA do lead</div>
              </div>
              <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Exportar lista
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] gap-3 border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <div>Cliente</div>
                  <div>Etapa</div>
                  <div>Canal</div>
                  <div>Score</div>
                  <div>Ticket</div>
                </div>
                <div className="mt-3 space-y-2">
                  {clients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClientId(client.id)}
                      className={`grid w-full grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
                        client.id === selectedClientId
                          ? "border-prime bg-prime/5"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{client.nome}</div>
                        <div className="text-xs text-slate-500">{client.ultimaAcao}</div>
                      </div>
                      <div className="text-slate-700">{client.etapa}</div>
                      <div className="text-slate-600">{client.canal}</div>
                      <div className="text-prime font-semibold">{client.score}</div>
                      <div className="text-slate-700">{client.ticket}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Sparkles size={16} className="text-prime" />
                  Analise IA do cliente
                </div>
                <div className="mt-2 rounded-lg border border-prime-accent/40 bg-prime-accent/10 px-3 py-2 text-xs text-prime">
                  Temperatura {selectedClient.temperatura} • Score {selectedClient.score}
                </div>
                <div className="mt-3 text-sm text-slate-700">{selectedClient.analise.resumo}</div>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sinais positivos</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {selectedClient.analise.sinais.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-prime-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Riscos</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {selectedClient.analise.riscos.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-prime" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Próxima ação:</span> {selectedClient.analise.proximaAcao}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedClient.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "insights" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xl font-bold text-slate-900">Insights e reports IA</div>
                <div className="text-sm text-slate-600">Recomendações acionáveis e relatórios executivos</div>
              </div>
              <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Agendar envio semanal
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {insights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Lightbulb size={16} className="text-prime" />
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm text-slate-700">{item.desc}</div>
                  <div className="mt-3 rounded-lg border border-prime-accent/40 bg-prime-accent/10 px-3 py-2 text-xs text-prime">
                    {item.action}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles size={16} className="text-prime" />
                Score de oportunidades por período
              </div>
              <div className="mt-4">
                <ChartContainer config={insightChartConfig} className="h-48 w-full">
                  <LineChart data={leadTrend}>
	                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="qualificados" stroke="var(--color-qualificados)" strokeWidth={3} dot={{ fill: "var(--color-qualificados)", r: 4 }} />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {reportCards.map((report) => (
                <div key={report.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-sm font-semibold text-slate-900">{report.title}</div>
                  <div className="mt-2 text-sm text-slate-600">{report.desc}</div>
                  <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    Gerar agora
                  </button>
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500">Numeros ilustrativos para demonstracao comercial.</div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
