"use client";

import { useState } from "react";
import {
  BarChart3,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  FileBarChart,
  Gauge,
  KanbanSquare,
  MessageSquare,
  PanelsTopLeft,
  Sparkles,
  Target,
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
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type ViewKey = "overview" | "pipelines" | "inbox" | "contacts" | "analytics";

type PipelineKey = "ia" | "humano" | "followup";

type Deal = {
  id: number;
  nome: string;
  interesse: string;
  origem: string;
  valor: number;
  tempo: string;
  score: number;
  temperatura: "quente" | "morno" | "frio";
  responsavel: string;
  proximoPasso: string;
  canal: string;
};

type Conversation = {
  id: number;
  nome: string;
  canal: string;
  preview: string;
  tempo: string;
  status: "ativo" | "pendente" | "aguardando";
  tags: string[];
  unread?: number;
};

type Contact = {
  id: number;
  nome: string;
  etapa: string;
  canal: string;
  score: number;
  temperatura: "quente" | "morno" | "frio";
  tags: string[];
  ultimaInteracao: string;
  responsavel: string;
  especialidade: string;
};

const viewItems: { key: ViewKey; label: string; icon: JSX.Element }[] = [
  { key: "overview", label: "Visao geral", icon: <PanelsTopLeft size={16} /> },
  { key: "pipelines", label: "Pipelines", icon: <KanbanSquare size={16} /> },
  { key: "inbox", label: "Inbox unificado", icon: <MessageSquare size={16} /> },
  { key: "contacts", label: "Gestao de contatos", icon: <UserRound size={16} /> },
  { key: "analytics", label: "Reports", icon: <FileBarChart size={16} /> },
];

const pipelineInfo: Record<PipelineKey, { label: string; desc: string }> = {
  ia: { label: "Atendimento IA", desc: "SDR e triagem automatizada" },
  humano: { label: "Atendimento humano", desc: "Time comercial e negociacao" },
  followup: { label: "Follow-up", desc: "Reativacao e recuperacao" },
};

const pipelineStages: Record<PipelineKey, { key: string; label: string; tone: string; hint: string }[]> = {
  ia: [
    { key: "novo", label: "Novo", tone: "bg-prime", hint: "Entrada 24/7" },
    { key: "triagem", label: "Triagem IA", tone: "bg-prime-accent", hint: "Qualificacao rapida" },
    { key: "qualificado", label: "Qualificado", tone: "bg-prime-dark", hint: "Lead aprovado" },
    { key: "agendado", label: "Agendamento", tone: "bg-prime/80", hint: "Agenda integrada" },
  ],
  humano: [
    { key: "repasse", label: "Repasse", tone: "bg-prime", hint: "Lead escalado" },
    { key: "diagnostico", label: "Diagnostico", tone: "bg-prime-accent", hint: "Descoberta" },
    { key: "proposta", label: "Proposta", tone: "bg-prime-dark", hint: "Negociacao" },
    { key: "fechamento", label: "Fechamento", tone: "bg-prime/80", hint: "Deal fechado" },
  ],
  followup: [
    { key: "sem-resposta", label: "Sem resposta", tone: "bg-prime", hint: "SLA expirado" },
    { key: "reativacao", label: "Reativacao", tone: "bg-prime-accent", hint: "Sequencia IA" },
    { key: "recuperado", label: "Recuperado", tone: "bg-prime-dark", hint: "Voltou ao funil" },
    { key: "perdido", label: "Perdido", tone: "bg-prime/80", hint: "Registrar motivo" },
  ],
};

const dealsByPipeline: Record<PipelineKey, Record<string, Deal[]>> = {
  ia: {
    novo: [
      {
        id: 1,
        nome: "Maria Silva",
        interesse: "Cirurgia LCA",
        origem: "WhatsApp",
        valor: 4200,
        tempo: "4 min",
        score: 82,
        temperatura: "quente",
        responsavel: "IA SDR",
        proximoPasso: "Enviar triagem e validar convenio",
        canal: "WhatsApp",
      },
      {
        id: 2,
        nome: "Joao Santos",
        interesse: "Artroscopia",
        origem: "Instagram",
        valor: 1800,
        tempo: "8 min",
        score: 68,
        temperatura: "morno",
        responsavel: "IA SDR",
        proximoPasso: "Oferecer horarios com menor no-show",
        canal: "Instagram",
      },
    ],
    triagem: [
      {
        id: 3,
        nome: "Carla Mendes",
        interesse: "Dor no joelho",
        origem: "Google",
        valor: 780,
        tempo: "12 min",
        score: 61,
        temperatura: "morno",
        responsavel: "IA SDR",
        proximoPasso: "Coletar documentos e historico",
        canal: "Google",
      },
      {
        id: 4,
        nome: "Pedro Costa",
        interesse: "Artroplastia",
        origem: "Indicacao",
        valor: 9200,
        tempo: "6 min",
        score: 91,
        temperatura: "quente",
        responsavel: "IA SDR",
        proximoPasso: "Escalar para time humano",
        canal: "Indicacao",
      },
    ],
    qualificado: [
      {
        id: 5,
        nome: "Camila Rocha",
        interesse: "Menisco",
        origem: "WhatsApp",
        valor: 1500,
        tempo: "3 min",
        score: 74,
        temperatura: "morno",
        responsavel: "IA SDR",
        proximoPasso: "Enviar proposta + comprovante",
        canal: "WhatsApp",
      },
    ],
    agendado: [
      {
        id: 6,
        nome: "Lucas Vieira",
        interesse: "Consulta premium",
        origem: "Instagram",
        valor: 680,
        tempo: "2 min",
        score: 88,
        temperatura: "quente",
        responsavel: "IA SDR",
        proximoPasso: "Disparar lembretes anti no-show",
        canal: "Instagram",
      },
      {
        id: 7,
        nome: "Juliana Alves",
        interesse: "Artroplastia",
        origem: "Google",
        valor: 9800,
        tempo: "5 min",
        score: 93,
        temperatura: "quente",
        responsavel: "IA SDR",
        proximoPasso: "Confirmar exames pre-op",
        canal: "Google",
      },
    ],
  },
  humano: {
    repasse: [
      {
        id: 8,
        nome: "Rafael Silva",
        interesse: "Cirurgia LCA",
        origem: "IA SDR",
        valor: 6400,
        tempo: "20 min",
        score: 86,
        temperatura: "quente",
        responsavel: "Ana (Closer)",
        proximoPasso: "Diagnostico detalhado",
        canal: "WhatsApp",
      },
      {
        id: 9,
        nome: "Renata Gomes",
        interesse: "Artrose",
        origem: "IA SDR",
        valor: 2200,
        tempo: "18 min",
        score: 70,
        temperatura: "morno",
        responsavel: "Carlos (Closer)",
        proximoPasso: "Confirmar cobertura convenio",
        canal: "WhatsApp",
      },
    ],
    diagnostico: [
      {
        id: 10,
        nome: "Priscila Luz",
        interesse: "Consulta premium",
        origem: "Instagram",
        valor: 780,
        tempo: "35 min",
        score: 64,
        temperatura: "morno",
        responsavel: "Ana (Closer)",
        proximoPasso: "Coletar exames recentes",
        canal: "Instagram",
      },
    ],
    proposta: [
      {
        id: 11,
        nome: "Eduardo Lima",
        interesse: "Artroplastia",
        origem: "Indicacao",
        valor: 11200,
        tempo: "1h",
        score: 89,
        temperatura: "quente",
        responsavel: "Carlos (Closer)",
        proximoPasso: "Negociar pagamento",
        canal: "Indicacao",
      },
    ],
    fechamento: [
      {
        id: 12,
        nome: "Sofia Nunes",
        interesse: "Artroscopia",
        origem: "Google",
        valor: 2400,
        tempo: "2h",
        score: 78,
        temperatura: "morno",
        responsavel: "Ana (Closer)",
        proximoPasso: "Assinar contrato e checklist",
        canal: "Google",
      },
    ],
  },
  followup: {
    "sem-resposta": [
      {
        id: 13,
        nome: "Amanda Reis",
        interesse: "Dor no joelho",
        origem: "WhatsApp",
        valor: 620,
        tempo: "3d",
        score: 55,
        temperatura: "frio",
        responsavel: "IA Follow-up",
        proximoPasso: "Sequencia de reativacao 3/5",
        canal: "WhatsApp",
      },
      {
        id: 14,
        nome: "Thiago Souza",
        interesse: "Consulta premium",
        origem: "Google",
        valor: 840,
        tempo: "2d",
        score: 61,
        temperatura: "morno",
        responsavel: "IA Follow-up",
        proximoPasso: "Oferecer horarios noturnos",
        canal: "Google",
      },
    ],
    reativacao: [
      {
        id: 15,
        nome: "Natalia Porto",
        interesse: "Menisco",
        origem: "Instagram",
        valor: 1350,
        tempo: "1d",
        score: 69,
        temperatura: "morno",
        responsavel: "IA Follow-up",
        proximoPasso: "Enviar depoimentos e CTA",
        canal: "Instagram",
      },
    ],
    recuperado: [
      {
        id: 16,
        nome: "Bruno Silva",
        interesse: "Cirurgia LCA",
        origem: "WhatsApp",
        valor: 5200,
        tempo: "6h",
        score: 84,
        temperatura: "quente",
        responsavel: "IA Follow-up",
        proximoPasso: "Mover para atendimento humano",
        canal: "WhatsApp",
      },
    ],
    perdido: [
      {
        id: 17,
        nome: "Isabela Ramos",
        interesse: "Artrose",
        origem: "Google",
        valor: 980,
        tempo: "12d",
        score: 42,
        temperatura: "frio",
        responsavel: "IA Follow-up",
        proximoPasso: "Registrar motivo e arquivar",
        canal: "Google",
      },
    ],
  },
};

const conversations: Conversation[] = [
  {
    id: 101,
    nome: "Julia Alves",
    canal: "WhatsApp",
    preview: "Preciso confirmar o horario de quarta",
    tempo: "2 min",
    status: "ativo",
    tags: ["Cirurgia", "Convênio"],
    unread: 2,
  },
  {
    id: 102,
    nome: "Marcos Lima",
    canal: "Instagram",
    preview: "Podemos fazer em horario noturno?",
    tempo: "8 min",
    status: "pendente",
    tags: ["Consulta", "Particular"],
  },
  {
    id: 103,
    nome: "Patricia Souza",
    canal: "Google",
    preview: "Enviei os exames agora",
    tempo: "18 min",
    status: "ativo",
    tags: ["Triagem", "Urgente"],
  },
  {
    id: 104,
    nome: "Fernando Oliveira",
    canal: "WhatsApp",
    preview: "Quero reagendar para sexta",
    tempo: "35 min",
    status: "aguardando",
    tags: ["Reagendamento"],
  },
];

const messagesByConversation: Record<number, { from: "lead" | "ia" | "humano"; text: string; time: string }[]> = {
  101: [
    { from: "lead", text: "Preciso confirmar o horario de quarta.", time: "09:18" },
    { from: "ia", text: "Perfeito! Posso confirmar 16h ou 17h. Qual prefere?", time: "09:19" },
    { from: "lead", text: "16h esta otimo.", time: "09:21" },
  ],
  102: [
    { from: "lead", text: "Podemos fazer em horario noturno?", time: "08:52" },
    { from: "humano", text: "Sim, temos vaga as 19h. Confirmo para voce?", time: "08:55" },
  ],
  103: [
    { from: "lead", text: "Enviei os exames agora.", time: "08:40" },
    { from: "ia", text: "Recebido! Vou validar e ja retorno com o proximo passo.", time: "08:41" },
  ],
  104: [
    { from: "lead", text: "Quero reagendar para sexta.", time: "08:12" },
    { from: "ia", text: "Entendido. Posso sugerir horarios entre 10h e 14h.", time: "08:14" },
  ],
};

const leadDetailsByConversation: Record<number, { score: number; temperatura: string; etapa: string; tags: string[]; dados: { label: string; value: string }[] }> = {
  101: {
    score: 84,
    temperatura: "Quente",
    etapa: "Agendado",
    tags: ["Cirurgia", "Convênio", "Alta prioridade"],
    dados: [
      { label: "Procedimento", value: "Reconstrucao LCA" },
      { label: "Canal preferido", value: "WhatsApp" },
      { label: "Convênio", value: "Unimed" },
      { label: "Ultima atividade", value: "Hoje 09:21" },
      { label: "Cidade", value: "Campinas" },
    ],
  },
  102: {
    score: 72,
    temperatura: "Morno",
    etapa: "Triagem",
    tags: ["Consulta", "Particular"],
    dados: [
      { label: "Procedimento", value: "Artroscopia" },
      { label: "Canal preferido", value: "Instagram" },
      { label: "Convênio", value: "Particular" },
      { label: "Ultima atividade", value: "Hoje 08:55" },
      { label: "Cidade", value: "Jundiai" },
    ],
  },
  103: {
    score: 77,
    temperatura: "Morno",
    etapa: "Qualificado",
    tags: ["Triagem", "Urgente"],
    dados: [
      { label: "Procedimento", value: "Menisco" },
      { label: "Canal preferido", value: "Google" },
      { label: "Convênio", value: "Bradesco" },
      { label: "Ultima atividade", value: "Hoje 08:41" },
      { label: "Cidade", value: "Sao Paulo" },
    ],
  },
  104: {
    score: 66,
    temperatura: "Morno",
    etapa: "Reagendamento",
    tags: ["Reagendamento"],
    dados: [
      { label: "Procedimento", value: "Consulta" },
      { label: "Canal preferido", value: "WhatsApp" },
      { label: "Convênio", value: "Amil" },
      { label: "Ultima atividade", value: "Hoje 08:14" },
      { label: "Cidade", value: "Sorocaba" },
    ],
  },
};

const contacts: Contact[] = [
  {
    id: 201,
    nome: "Marina Duarte",
    etapa: "Qualificado",
    canal: "WhatsApp",
    score: 88,
    temperatura: "quente",
    tags: ["Cirurgia", "Convênio"],
    ultimaInteracao: "Hoje 10:12",
    responsavel: "IA SDR",
    especialidade: "Artroplastia",
  },
  {
    id: 202,
    nome: "Rafaela Souza",
    etapa: "Proposta",
    canal: "Instagram",
    score: 74,
    temperatura: "morno",
    tags: ["Consulta", "Particular"],
    ultimaInteracao: "Hoje 09:42",
    responsavel: "Ana (Closer)",
    especialidade: "Artroscopia",
  },
  {
    id: 203,
    nome: "Helio Lima",
    etapa: "Sem resposta",
    canal: "Google",
    score: 54,
    temperatura: "frio",
    tags: ["Follow-up"],
    ultimaInteracao: "Ontem 18:10",
    responsavel: "IA Follow-up",
    especialidade: "Dor no joelho",
  },
  {
    id: 204,
    nome: "Isadora Pinto",
    etapa: "Agendado",
    canal: "WhatsApp",
    score: 91,
    temperatura: "quente",
    tags: ["Cirurgia", "Alta prioridade"],
    ultimaInteracao: "Hoje 08:55",
    responsavel: "IA SDR",
    especialidade: "Reconstrucao LCA",
  },
  {
    id: 205,
    nome: "Paulo Cesar",
    etapa: "Diagnostico",
    canal: "Indicacao",
    score: 79,
    temperatura: "morno",
    tags: ["Consulta", "Indicacao"],
    ultimaInteracao: "Hoje 08:20",
    responsavel: "Carlos (Closer)",
    especialidade: "Artrose",
  },
];

const overviewKpis = [
  { label: "SLA medio", value: "6 min", meta: "Meta < 10 min", tone: "positive" },
  { label: "Leads em atendimento", value: "284", meta: "IA + humano", tone: "positive" },
  { label: "Agendamentos ativos", value: "126", meta: "Proximos 7 dias", tone: "positive" },
  { label: "Receita em pipeline", value: "R$ 1,9M", meta: "Prox. 30 dias", tone: "positive" },
];

const volumeData = [
  { name: "Seg", leads: 220, qualificados: 140, agendados: 95 },
  { name: "Ter", leads: 260, qualificados: 165, agendados: 110 },
  { name: "Qua", leads: 280, qualificados: 172, agendados: 120 },
  { name: "Qui", leads: 310, qualificados: 190, agendados: 132 },
  { name: "Sex", leads: 295, qualificados: 180, agendados: 126 },
  { name: "Sab", leads: 240, qualificados: 150, agendados: 102 },
];

const responseData = [
  { name: "08h", sla: 7 },
  { name: "10h", sla: 6 },
  { name: "12h", sla: 5 },
  { name: "14h", sla: 4 },
  { name: "16h", sla: 6 },
  { name: "18h", sla: 8 },
];

const sourceData = [
  { name: "WhatsApp", value: 42 },
  { name: "Instagram", value: 26 },
  { name: "Google", value: 20 },
  { name: "Indicacao", value: 12 },
];

const pipelineValueData = [
  { name: "IA", value: 420000 },
  { name: "Humano", value: 920000 },
  { name: "Follow-up", value: 260000 },
];

const conversionData = [
  { name: "WhatsApp", rate: 44 },
  { name: "Instagram", rate: 36 },
  { name: "Google", rate: 31 },
  { name: "Indicacao", rate: 58 },
];

const volumeChartConfig = {
  leads: { label: "Leads", color: "var(--prime-primary)" },
  agendados: { label: "Agendados", color: "var(--prime-accent)" },
} satisfies ChartConfig;

const sourceChartConfig = {
  WhatsApp: { label: "WhatsApp", color: "var(--prime-primary)" },
  Instagram: { label: "Instagram", color: "var(--prime-accent)" },
  Google: { label: "Google", color: "color-mix(in oklab, var(--prime-primary) 60%, var(--background))" },
  Indicacao: { label: "Indicacao", color: "color-mix(in oklab, var(--prime-accent) 70%, var(--background))" },
} satisfies ChartConfig;

const responseChartConfig = {
  sla: { label: "SLA", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const conversionChartConfig = {
  rate: { label: "Conversao", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const pipelineValueChartConfig = {
  value: { label: "Pipeline", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const agendadosChartConfig = {
  agendados: { label: "Agendados", color: "var(--prime-accent)" },
} satisfies ChartConfig;

const iaPerformanceChartConfig = {
  sla: { label: "SLA IA", color: "var(--prime-primary)" },
} satisfies ChartConfig;

const temperatureStyles: Record<Deal["temperatura"], string> = {
  quente: "bg-prime-accent/15 text-prime",
  morno: "bg-prime/10 text-prime",
  frio: "bg-slate-100 text-slate-600",
};

const contactSegments = ["Todos", "Qualificados", "Alta prioridade", "Agendados", "Sem resposta"];

export default function CRMModalContent() {
  const [view, setView] = useState<ViewKey>("overview");
  const [pipeline, setPipeline] = useState<PipelineKey>("ia");
  const [selectedConversationId, setSelectedConversationId] = useState<number>(conversations[0].id);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [segment, setSegment] = useState(contactSegments[0]);
  const [selectedContactId, setSelectedContactId] = useState<number>(contacts[0].id);

  const activeStages = pipelineStages[pipeline];
  const activeDeals = dealsByPipeline[pipeline];
  const selectedConversation = conversations.find((item) => item.id === selectedConversationId) ?? conversations[0];
  const messages = messagesByConversation[selectedConversationId] ?? [];
  const leadDetails = leadDetailsByConversation[selectedConversationId];
  const selectedContact = contacts.find((item) => item.id === selectedContactId) ?? contacts[0];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-prime">CRM Comercial</p>
            <div className="text-2xl font-bold text-slate-900">Central unica de atendimento e vendas</div>
            <div className="text-sm text-slate-600">Pipelines multiplos, inbox unificado e analytics em tempo real</div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              <Clock3 size={14} />
              Ultimos 30 dias
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              <Target size={14} />
              Segmento: ortopedia
            </button>
            <span className="inline-flex items-center gap-2 rounded-full bg-prime-accent/15 px-4 py-2 text-sm font-semibold text-prime">
              <Sparkles size={14} />
              IA ativa e treinada
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {viewItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                view === item.key ? "bg-prime text-white shadow-sm" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-hidden lg:flex">
        <aside className="w-full border-b border-slate-200 bg-white px-5 py-4 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Pipelines ativos</div>
          <div className="mt-3 space-y-2">
            {(Object.keys(pipelineInfo) as PipelineKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setPipeline(key);
                  setView("pipelines");
                }}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  pipeline === key
                    ? "border-prime bg-prime text-white shadow"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="text-sm font-semibold">{pipelineInfo[key].label}</div>
                <div className={`text-xs ${pipeline === key ? "text-white/80" : "text-slate-500"}`}>{pipelineInfo[key].desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Gauge size={16} className="text-prime" />
              SLA + performance
            </div>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tempo medio</span>
                <span className="font-semibold text-slate-900">6 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">IA vs humano</span>
                <span className="font-semibold text-slate-900">68% / 32%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Deals abertos</span>
                <span className="font-semibold text-slate-900">412</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-prime-accent/30 bg-prime-accent/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-prime">
              <BellRing size={16} />
              Alertas inteligentes
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="rounded-lg bg-white px-3 py-2 border border-slate-200">
                12 leads com risco de no-show nas proximas 24h
              </div>
              <div className="rounded-lg bg-white px-3 py-2 border border-slate-200">
                3 cirurgias aguardando validacao de convenio
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6">
          {view === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {overviewKpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {kpi.label}
                      <CheckCircle2 size={14} className="text-prime-accent" />
                    </div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
                    <div className="text-xs text-slate-500">{kpi.meta}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-slate-900">Volume de leads e agendamentos</div>
                    <div className="text-xs text-slate-500">Ultima semana</div>
                  </div>
                  <div className="mt-4">
                    <ChartContainer config={volumeChartConfig} className="h-52 w-full">
                      <AreaChart data={volumeData}>
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
                  <div className="text-lg font-bold text-slate-900">Origem dos leads</div>
                  <div className="mt-4">
                    <ChartContainer config={sourceChartConfig} className="h-52 w-full">
                      <PieChart>
                        <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={4}>
                          {sourceData.map((entry) => (
                            <Cell key={entry.name} fill={`var(--color-${entry.name})`} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                    {sourceData.map((item) => (
                      <span key={item.name} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: `var(--color-${item.name})` }} />
                        {item.name} {item.value}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock3 size={16} className="text-prime" />
                    SLA por horario
                  </div>
                  <div className="mt-4">
                    <ChartContainer config={responseChartConfig} className="h-44 w-full">
                      <LineChart data={responseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="sla" stroke="var(--color-sla)" strokeWidth={3} dot={{ fill: "var(--color-sla)", r: 4 }} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                  <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                    Meta de resposta: <span className="font-semibold text-slate-800">10 min</span>. Ajuste automatico quando SLA sobe.
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-slate-900">Conversao por canal</div>
                    <div className="text-xs text-slate-500">Qualificados / Leads</div>
                  </div>
                  <div className="mt-4">
                    <ChartContainer config={conversionChartConfig} className="h-44 w-full">
                      <BarChart data={conversionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="var(--color-rate)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Indicacao tem maior conversao (58%).</div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Google precisa de follow-up mais rapido.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "pipelines" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-bold text-slate-900">{pipelineInfo[pipeline].label}</div>
                  <p className="text-sm text-slate-600">{pipelineInfo[pipeline].desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(pipelineInfo) as PipelineKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setPipeline(key)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        pipeline === key
                          ? "bg-prime text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {pipelineInfo[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {activeStages.map((stage) => (
                  <div key={stage.key} className="w-80 flex-shrink-0">
                    <div className={`${stage.tone} rounded-t-2xl px-4 py-3 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{stage.label}</div>
                        <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">
                          {activeDeals[stage.key]?.length ?? 0}
                        </span>
                      </div>
                      <div className="text-xs text-white/80">{stage.hint}</div>
                    </div>
                    <div className="space-y-3 rounded-b-2xl border border-slate-200 bg-white p-3 shadow-sm min-h-[480px]">
                      {(activeDeals[stage.key] ?? []).map((deal) => (
                        <div
                          key={deal.id}
                          draggable
                          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-base font-semibold text-slate-900">{deal.nome}</div>
                                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${temperatureStyles[deal.temperatura]}`}>
                                  {deal.temperatura}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500">{deal.interesse}</div>
                            </div>
                            <div className="text-sm font-bold text-prime">R$ {deal.valor.toLocaleString("pt-BR")}</div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                            <span className="rounded-full bg-slate-100 px-2 py-1">Origem: {deal.origem}</span>
                            <span className="rounded-full bg-slate-100 px-2 py-1">SLA: {deal.tempo}</span>
                            <span className="rounded-full bg-slate-100 px-2 py-1">Canal: {deal.canal}</span>
                          </div>
                          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-700">Proximo passo</span>
                              <span className="text-slate-500">Score {deal.score}</span>
                            </div>
                            <div className="mt-1 text-slate-800">{deal.proximoPasso}</div>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                            <span>Responsavel: {deal.responsavel}</span>
                            <span className="tracking-[0.2em]">::</span>
                          </div>
                        </div>
                      ))}
                      <button className="w-full rounded-xl border-2 border-dashed border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 hover:border-prime hover:text-prime">
                        + Adicionar deal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "inbox" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-bold text-slate-900">Inbox unificado</div>
                  <div className="text-sm text-slate-600">WhatsApp, Instagram e Google em uma unica timeline</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setLeftOpen((state) => !state)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {leftOpen ? "Ocultar conversas" : "Mostrar conversas"}
                  </button>
                  <button
                    onClick={() => setRightOpen((state) => !state)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {rightOpen ? "Ocultar detalhes" : "Mostrar detalhes"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row">
                {leftOpen && (
                  <aside className="lg:w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-700">Conversas ativas</div>
                      <span className="rounded-full bg-prime-accent/20 px-2 py-1 text-xs font-semibold text-prime">{conversations.length}</span>
                    </div>
                    <div className="mt-3 space-y-3">
                      {conversations.map((conversation) => (
                        <button
                          key={conversation.id}
                          onClick={() => setSelectedConversationId(conversation.id)}
                          className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                            selectedConversationId === conversation.id
                              ? "border-prime bg-prime/5"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-slate-900">{conversation.nome}</div>
                            <div className="text-xs text-slate-500">{conversation.tempo}</div>
                          </div>
                          <div className="mt-1 text-xs text-slate-600">{conversation.preview}</div>
                          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5">{conversation.canal}</span>
                            {conversation.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5">
                                {tag}
                              </span>
                            ))}
                            {conversation.unread ? (
                              <span className="rounded-full bg-prime text-white px-2 py-0.5">{conversation.unread} novas</span>
                            ) : null}
                          </div>
                        </button>
                      ))}
                    </div>
                  </aside>
                )}

                <section className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{selectedConversation.nome}</div>
                      <div className="text-xs text-slate-500">Canal: {selectedConversation.canal}</div>
                    </div>
                    <span className="rounded-full bg-prime-accent/15 px-3 py-1 text-xs font-semibold text-prime">IA assistida ativa</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {messages.map((message, index) => (
                      <div
                        key={`${message.time}-${index}`}
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          message.from === "lead"
                            ? "bg-slate-100 text-slate-700"
                            : "ml-auto bg-prime text-white"
                        }`}
                      >
                        <div>{message.text}</div>
                        <div className={`mt-1 text-[10px] ${message.from === "lead" ? "text-slate-400" : "text-white/70"}`}>
                          {message.from === "ia" ? "IA" : message.from === "humano" ? "Humano" : "Lead"} • {message.time}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-500">
                    Campo de resposta inteligente com sugestoes de roteiro e CTA de agendamento.
                  </div>
                </section>

                {rightOpen && leadDetails && (
                  <aside className="lg:w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">Detalhes do lead</div>
                      <span className="rounded-full bg-prime-accent/15 px-2 py-1 text-xs font-semibold text-prime">Score {leadDetails.score}</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">Temperatura: {leadDetails.temperatura}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {leadDetails.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 space-y-3">
                      {leadDetails.dados.map((item) => (
                        <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                          <div className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</div>
                          <div className="text-sm font-semibold text-slate-900">{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg border border-prime-accent/40 bg-prime-accent/10 px-3 py-2 text-xs text-prime">
                      Proximo passo sugerido: confirmar agenda e disparar lembrete anti no-show.
                    </div>
                  </aside>
                )}
              </div>
            </div>
          )}

          {view === "contacts" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-bold text-slate-900">Gestao de contatos</div>
                  <div className="text-sm text-slate-600">Leads qualificados com tags e segmentacao inteligente</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contactSegments.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSegment(item)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        segment === item
                          ? "bg-prime text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr] gap-3 border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <div>Lead</div>
                    <div>Etapa</div>
                    <div>Canal</div>
                    <div>Tags</div>
                    <div>Score</div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {contacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => setSelectedContactId(contact.id)}
                        className={`grid w-full grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr] items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
                          contact.id === selectedContactId
                            ? "border-prime bg-prime/5"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-slate-900">{contact.nome}</div>
                          <div className="text-xs text-slate-500">{contact.especialidade}</div>
                        </div>
                        <div className="text-slate-700">{contact.etapa}</div>
                        <div className="text-slate-600">{contact.canal}</div>
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${temperatureStyles[contact.temperatura]}`}>
                            {contact.score}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-sm font-semibold text-slate-900">Resumo do contato</div>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                      <div className="text-xs uppercase tracking-wide text-slate-500">Responsavel</div>
                      <div className="font-semibold text-slate-900">{selectedContact.responsavel}</div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                      <div className="text-xs uppercase tracking-wide text-slate-500">Ultima interacao</div>
                      <div className="font-semibold text-slate-900">{selectedContact.ultimaInteracao}</div>
                    </div>
                    <div className="rounded-lg border border-prime-accent/40 bg-prime-accent/10 px-3 py-2">
                      <div className="text-xs uppercase tracking-wide text-prime">Prioridade IA</div>
                      <div className="font-semibold text-prime">Temperatura {selectedContact.temperatura}</div>
                      <div className="text-xs text-slate-600">Score {selectedContact.score} com alto potencial</div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                      <div className="text-xs uppercase tracking-wide text-slate-500">Tags</div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedContact.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                    Acionamentos automaticos baseados em score e etapa do funil.
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "analytics" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-bold text-slate-900">Reports e analytics</div>
                  <div className="text-sm text-slate-600">Atendimento, deals e performance comercial</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Exportar PDF
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Comparar periodos
                  </button>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <BarChart3 size={16} className="text-prime" />
                    Valor de pipeline por canal
                  </div>
                  <div className="mt-4">
                    <ChartContainer config={pipelineValueChartConfig} className="h-40 w-full">
                      <BarChart data={pipelineValueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="var(--color-value)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Pipeline total estimado: R$ 1,6M.</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CalendarCheck2 size={16} className="text-prime" />
                    Agendamentos confirmados
                  </div>
                  <div className="mt-4">
                    <ChartContainer config={agendadosChartConfig} className="h-40 w-full">
                      <AreaChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="agendados" stroke="var(--color-agendados)" fill="var(--color-agendados)" fillOpacity={0.2} />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Show rate atual: 90% com anti no-show.</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Sparkles size={16} className="text-prime" />
                    Performance IA
                  </div>
                  <div className="mt-4">
                    <ChartContainer config={iaPerformanceChartConfig} className="h-40 w-full">
                      <LineChart data={responseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="sla" stroke="var(--color-sla)" strokeWidth={2} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">IA resolve 68% sem escalacao humana.</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Target size={16} className="text-prime" />
                  Proximas acoes recomendadas
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {[
                    "Reforcar follow-up para leads frios",
                    "Aumentar slots noturnos no Tasy",
                    "Criar alerta para leads com score > 85",
                  ].map((item) => (
                    <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-500">Dados ilustrativos para demo comercial.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
