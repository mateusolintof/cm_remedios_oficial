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
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  "7d": "Ultimos 7 dias",
  "30d": "Ultimos 30 dias",
  "90d": "Ultimos 90 dias",
} as const;

const navItems: { key: TabKey; label: string; icon: ReactNode }[] = [
  { key: "geral", label: "Visao geral", icon: <BarChart3 size={16} /> },
  { key: "ia", label: "Gestao IA", icon: <Brain size={16} /> },
  { key: "vendedores", label: "Atendimento vendedores", icon: <Trophy size={16} /> },
  { key: "clientes", label: "Clientes", icon: <UserRound size={16} /> },
  { key: "insights", label: "Insights + reports", icon: <Lightbulb size={16} /> },
];

const kpisGeral = [
  { label: "Leads/dia", value: "500", delta: "+24%", meta: "Meta 480" },
  { label: "Qualificados", value: "60%", delta: "+8%", meta: "Meta 55%" },
  { label: "Conversao", value: "39%", delta: "+12%", meta: "Meta 32%" },
  { label: "No-show", value: "10%", delta: "-5%", meta: "Meta <= 15%" },
  { label: "Receita", value: "R$ 2,3M", delta: "+18%", meta: "Meta R$ 2,0M" },
  { label: "Pipeline", value: "R$ 4,3M", delta: "novo", meta: "Prox. 30 dias" },
];

const leadTrend = [
  { name: "Seg", leads: 210, qualificados: 130, agendados: 90 },
  { name: "Ter", leads: 260, qualificados: 165, agendados: 110 },
  { name: "Qua", leads: 300, qualificados: 182, agendados: 124 },
  { name: "Qui", leads: 320, qualificados: 195, agendados: 138 },
  { name: "Sex", leads: 280, qualificados: 172, agendados: 120 },
  { name: "Sab", leads: 240, qualificados: 150, agendados: 100 },
];

const funnelStageData = [
  { name: "Leads", value: 15000, pct: "100%", fill: "var(--prime-primary)", step: 0 },
  { name: "Qualificados", value: 9000, pct: "60%", fill: "var(--prime-accent)", step: 1 },
  { name: "Agendados", value: 7000, pct: "46.7%", fill: "color-mix(in oklab, var(--prime-primary) 70%, var(--background))", step: 2 },
  { name: "Confirmados", value: 6450, pct: "43.1%", fill: "color-mix(in oklab, var(--prime-accent) 60%, var(--background))", step: 3 },
  { name: "Realizados", value: 5800, pct: "38.9%", fill: "color-mix(in oklab, var(--prime-primary) 85%, var(--background))", step: 4 },
];

const channelPerf = [
  { name: "WhatsApp", conversao: 44 },
  { name: "Instagram", conversao: 36 },
  { name: "Google", conversao: 31 },
  { name: "Indicacao", conversao: 58 },
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
    desc: "Fila de espera tem 47 pacientes e 12 horarios vagos na proxima semana.",
    action: "Disparar campanha de remarcacao",
  },
  {
    title: "Objeçao principal",
    desc: "79% dos leads de cirurgia citam preco alto no primeiro contato.",
    action: "Apresentar parcelamento antes da objeçao",
  },
  {
    title: "Melhor canal",
    desc: "Indicacoes convertem 94% e apresentam LTV 2,4x maior.",
    action: "Ativar programa de indicacoes",
  },
];

const reportCards = [
  {
    title: "Relatorio executivo",
    desc: "Performance comercial, SLA e receita projetada em PDF.",
  },
  {
    title: "Relatorio granular",
    desc: "Detalhe por canal, campanha e funil com segmentacoes.",
  },
  {
    title: "Alertas automacao",
    desc: "Acionamentos, follow-ups e tarefas pendentes da IA.",
  },
];

type FunnelBarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  background?: { x?: number; y?: number; width?: number; height?: number };
  payload?: { step?: number };
};

const funnelSteps = funnelStageData.length;

const FunnelBar = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill = "var(--prime-primary)",
  background,
  payload,
}: FunnelBarProps) => {
  if (width <= 0 || height <= 0) return null;
  const step = payload?.step ?? 0;
  const baseX = background?.x ?? x;
  const baseWidth = background?.width ?? width;
  const centeredX = baseX + (baseWidth - width) / 2;
  const maxInset = Math.min(26, width * 0.22);
  const minInset = Math.min(10, width * 0.1);
  const inset = minInset + (maxInset - minInset) * (step / Math.max(1, funnelSteps - 1));
  const topInset = Math.max(4, inset * 0.45);
  const bottomInset = inset;
  const path = [
    `M ${centeredX + topInset} ${y}`,
    `L ${centeredX + width - topInset} ${y}`,
    `L ${centeredX + width - bottomInset} ${y + height}`,
    `L ${centeredX + bottomInset} ${y + height}`,
    "Z",
  ].join(" ");

  return <path d={path} fill={fill} stroke="rgba(15, 23, 42, 0.12)" strokeWidth={1} />;
};

const leadTrendChartConfig = {
  leads: { label: "Leads", color: "var(--prime-primary)" },
  agendados: { label: "Agendados", color: "var(--prime-accent)" },
} satisfies ChartConfig;

const funnelChartConfig = {
  value: { label: "Volume", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const channelChartConfig = {
  conversao: { label: "Conversao", color: "var(--prime-primary)" },
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
  const [selectedClientId, setSelectedClientId] = useState<number>(clients[0].id);

  const selectedClient = clients.find((client) => client.id === selectedClientId) ?? clients[0];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-prime">Dashboard executivo</p>
            <div className="text-2xl font-bold text-slate-900">Visao completa do atendimento comercial</div>
            <div className="text-sm text-slate-600">KPIs, funis e insights com suporte de IA</div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(rangeOptions) as Array<keyof typeof rangeOptions>).map((key) => (
              <button
                key={key}
                onClick={() => setRange(key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
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
      </header>

      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        <aside className="w-full border-b border-prime/30 bg-prime px-5 py-6 text-white lg:w-72 lg:border-b-0 lg:border-r lg:overflow-y-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold">AI</div>
            <div>
              <div className="text-sm font-semibold">Dashboard</div>
              <div className="text-xs text-white/60">Menu principal</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">Main</div>
            <div className="mt-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6">
        {tab === "geral" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {kpisGeral.map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {kpi.label}
                    <CheckCircle2 size={14} className="text-prime-accent" />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
                  <div className="text-sm font-semibold text-prime">{kpi.delta}</div>
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
                <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                  <ChartContainer config={funnelChartConfig} className="h-56 w-full">
                    <BarChart data={funnelStageData} layout="vertical" barCategoryGap={14} margin={{ top: 6, right: 16, bottom: 6, left: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" hide />
                      <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                      <Bar dataKey="value" shape={<FunnelBar />} isAnimationActive>
                        {funnelStageData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                  <div className="space-y-3">
                    {funnelStageData.map((stage) => (
                      <div key={stage.name} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.fill }} />
                          <span className="font-semibold text-slate-900">{stage.name}</span>
                        </div>
                        <span className="text-xs text-slate-500">{stage.pct}</span>
                      </div>
                    ))}
                    <div className="rounded-lg border border-prime-accent/40 bg-prime-accent/10 px-3 py-2 text-xs text-prime">
                      Perdas mapeadas: reforcar follow-up nos primeiros 20 minutos.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Target size={16} className="text-prime" />
                  Conversao por canal
                </div>
                <div className="mt-4">
                  <ChartContainer config={channelChartConfig} className="h-44 w-full">
                    <BarChart data={channelPerf}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="conversao" fill="var(--color-conversao)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="mt-2 text-xs text-slate-500">Indicacao continua com maior conversao.</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarCheck2 size={16} className="text-prime" />
                  Agenda diaria
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Ocupacao</span>
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
                { label: "Atendimentos IA", value: "1.420", meta: "Semana" },
                { label: "Leads qualificados", value: "860", meta: "Qualificados" },
                { label: "Escalados", value: "320", meta: "Para humano" },
                { label: "Tempo medio", value: "6 min", meta: "SLA" },
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
                  Resolucao IA vs escalados
                </div>
                <div className="mt-4">
                  <ChartContainer config={iaVolumeChartConfig} className="h-52 w-full">
                    <AreaChart data={iaVolume}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="resolvidos" stroke="var(--color-resolvidos)" fill="var(--color-resolvidos)" fillOpacity={0.12} />
                      <Area type="monotone" dataKey="escalados" stroke="var(--color-escalados)" fill="var(--color-escalados)" fillOpacity={0.18} />
                    </AreaChart>
                  </ChartContainer>
                </div>
                <div className="mt-2 text-xs text-slate-500">IA resolve 68% sem interacao humana.</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MessageSquare size={16} className="text-prime" />
                  Principais intencoes
                </div>
                <div className="mt-4">
                  <ChartContainer config={iaIntentChartConfig} className="h-52 w-full">
                    <BarChart data={iaIntentos}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="var(--color-volume)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="mt-2 text-xs text-slate-500">FAQ e reagendamento reduziram 22% de chamadas humanas.</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ShieldCheck size={16} className="text-prime" />
                Qualidade e compliance
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-3 text-sm text-slate-600">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="font-semibold text-slate-900">LGPD em dia</div>
                  <div>Consentimentos registrados em 100% dos leads.</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="font-semibold text-slate-900">SLA controlado</div>
                  <div>98% dos contatos respondidos em menos de 10 min.</div>
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
                { label: "Deals fechados", value: "91", meta: "Ultimos 30 dias" },
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
                <div className="text-sm text-slate-600">Clique para abrir analise IA do lead</div>
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
                  <span className="font-semibold text-slate-900">Proxima acao:</span> {selectedClient.analise.proximaAcao}
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
                <div className="text-sm text-slate-600">Recomendacoes acionaveis e relatorios executivos</div>
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
                Score de oportunidades por periodo
              </div>
              <div className="mt-4">
                <ChartContainer config={insightChartConfig} className="h-48 w-full">
                  <LineChart data={leadTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
