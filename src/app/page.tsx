"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  BellRing,
  CheckCircle2,
  FileBarChart,
  KanbanSquare,
  MessageSquare,
  Sparkles,
  Target,
  ShieldCheck,
  Briefcase,
  ArrowRight
} from "lucide-react";
import Modal from "./components/Modal";
import { type FlowKind } from "./components/FlowDiagram";

// Configurações da Proposta
const preparedFor = "CM Remédios";
const proposalDate = "Outubro 2025";

const FlowDiagramLazy = dynamic<{ kind: FlowKind }>(
  () => import("./components/FlowDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Carregando fluxo...
      </div>
    ),
  }
);

const ModalContentFallback = () => (
  <div className="flex h-full items-center justify-center p-6 text-sm text-slate-500">
    Carregando conteúdo...
  </div>
);

// Lazy Imports dos Modais
const RoiModalLazy = dynamic<{ preparedFor: string; onFinish?: () => void }>(() => import("./components/modal-content/RoiModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const CRMModalLazy = dynamic(() => import("./components/modal-content/CRMModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const DashboardModalLazy = dynamic(() => import("./components/modal-content/DashboardModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const PhaseDetailModalLazy = dynamic<{ phase: 1 | 2 | 3 | 4 }>(() => import("./components/modal-content/PhaseDetailModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const ConquistasModalLazy = dynamic(() => import("./components/modal-content/ConquistasModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const InteligenciaModalLazy = dynamic(() => import("./components/modal-content/InteligenciaModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const InsightsModalLazy = dynamic(() => import("./components/modal-content/InsightsModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const RelatoriosModalLazy = dynamic(() => import("./components/modal-content/RelatoriosModalContentDoc"), { ssr: false, loading: () => <ModalContentFallback /> });
const SolutionBenefitsModalLazy = dynamic<{ solution: "agendamento" | "faq" | "triagem-noshow" | "pesquisa" }>(() => import("./components/modal-content/SolutionBenefitsModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const EtapaModalLazy = dynamic<{ etapa: 1 | 2 | 3 | 4 }>(() => import("./components/modal-content/EtapaModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });

const getEtapaTitle = (etapa: 1 | 2 | 3 | 4) => {
  const titles = { 1: "Recepção", 2: "Agente SDR", 3: "Triagem", 4: "Atendimento" };
  return titles[etapa];
};

type ModalKind =
  | { type: "solution"; kind: FlowKind; title: string }
  | { type: "crm" }
  | { type: "dashboard" }
  | { type: "phases"; phase: 1 | 2 | 3 | 4 }
  | { type: "valueinfo" }
  | { type: "conquistas" }
  | { type: "inteligencia" }
  | { type: "insights" }
  | { type: "relatorios" }
  | { type: "etapa"; etapa: 1 | 2 | 3 | 4 }
  | { type: "roi" }
  | { type: "benefits"; solution: "agendamento" | "faq" | "triagem-noshow" | "pesquisa" }
  | null;

export default function Home() {
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* HEADER / NAV */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/branding/cmremedios-logo.png" alt={`Logo ${preparedFor}`} width={140} height={48} className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a className="hover:text-prime transition-colors" href="#diagnostico">Diagnóstico</a>
            <a className="hover:text-prime transition-colors" href="#solucoes">Soluções</a>
            <a className="hover:text-prime transition-colors" href="#entregaveis">Entregáveis</a>
            <a className="hover:text-prime transition-colors" href="#investimento">Investimento</a>
            <a className="btn-primary py-2 px-4 text-xs" href="#cta">Aprovar Proposta</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION - Assertivo e Profissional */}
      <section className="section relative overflow-hidden bg-[#041e42] text-white py-20 md:py-28" id="hero">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Target className="w-3 h-3" /> Plano de Expansão Comercial
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Agentes Inteligentes & <span className="text-prime-accent">Gestão Unificada</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              Transforme 35.000 interações mensais em resultados. Nossa IA centraliza o atendimento, qualifica 15.000 leads/mês e integra sua agenda ERP para máxima conversão.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex flex-col border-l-2 border-prime-accent pl-4">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Cliente</span>
                <span className="font-semibold text-white">{preparedFor}</span>
              </div>
              <div className="flex flex-col border-l-2 border-slate-600 pl-4">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Validade</span>
                <span className="font-semibold text-white">{proposalDate}</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
              <h3 className="text-white font-semibold mb-4 border-b border-white/10 pb-2">Objetivos do Projeto</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400 h-5 w-5" />
                  <span>Atendimento imediato (Tempo de resposta &lt; 1min)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400 h-5 w-5" />
                  <span>Qualificação automática de convênios</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400 h-5 w-5" />
                  <span>Redução da taxa de No-Show</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DIAGNÓSTICO - Foco em Oportunidade de Melhoria */}
      <section className="section bg-slate-50" id="diagnostico">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <h2 className="section-title">Diagnóstico Operacional</h2>
            <p className="subtitle mt-4 text-slate-600">
              Identificamos os principais pontos de fricção que impedem o consultório de escalar sua eficiência comercial hoje.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-prime mb-3">1. Atendimento ineficiente</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>Atendimento online sobrecarregado:</strong>
                  <ul className="list-[circle] pl-5 mt-1 space-y-1 text-slate-600">
                    <li>Não consegue qualificar ou agendar corretamente.</li>
                    <li>Não consegue buscar de forma eficiente as dúvidas e informações.</li>
                    <li>Atendimento presencial fica limitado porque são muitas tarefas a serem executadas.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-prime mb-3">2. Alto volume sem atendimento</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>61% do tempo total da semana não tem atendimento humano (101 horas):</strong>
                  <ul className="list-[circle] pl-5 mt-1 space-y-1 text-slate-600">
                    <li>Estudos mostram que 50% a 70% dos usuários que iniciam contato fora do horário comercial e só recebem resposta no dia seguinte não dão continuidade à conversa.</li>
                    <li>Se o volume mensal é de 1000 pessoas, isso representa uma perda de ao menos 500 possíveis agendamentos.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-prime mb-3">3. Múltiplos gaps</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>Com alto volume de atendimento presencial e online, não é possível conferir corretamente:
                  <ul className="list-[circle] pl-5 mt-1 space-y-1 text-slate-600">
                    <li>Taxa de no-show e remarcação.</li>
                    <li>Informações sobre exames e procedimentos, o que pode acarretar em retrabalho e tempo que poderia ser destinado à conversão ou a um atendimento de qualidade.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DESAFIO ATUAL */}
      <section className="section bg-slate-50" id="desafio">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Desafio Atual</h2>
          <p className="subtitle mt-2">Contexto da CM Remédios: Alto Volume de Leads sem atendimento adequado, muita insatisfação e reclamações sobre Atendimento.</p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/avaliacao.png" alt="Avaliações de atendimento — CM Remédios" className="w-full rounded-lg border border-slate-200 shadow-sm" />
            </div>
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/reclameaqui1.png" alt="Reclamações — Reclame Aqui (1) — CM Remédios" className="w-full rounded-lg border border-slate-200 shadow-sm" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/reclameaqui2.png" alt="Reclamações — Reclame Aqui (2) — CM Remédios" className="w-full rounded-lg border border-slate-200 shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES */}
      <section className="section bg-white" id="solucoes">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="section-title">Arquitetura da Solução</h2>
          <p className="subtitle mt-2">Implementação de 3 Agentes Especializados + Ecossistema de Gestão.</p>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="card group cursor-pointer hover:border-prime transition-all" onClick={() => setModal({ type: "solution", kind: "agendamento", title: "SDR & Agendamento" })}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-prime-accent uppercase tracking-wider group-hover:underline">Ver Fluxo</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900">1. SDR & Agendamento</h3>
              <p className="text-sm text-slate-600 mt-2 mb-4">Recepciona o paciente, identifica convênio ou particular e realiza o agendamento integrado.</p>
              <button
                onClick={(e) => { e.stopPropagation(); setModal({ type: "benefits", solution: "agendamento" }); }}
                className="text-xs font-bold text-prime hover:underline flex items-center gap-1"
              >
                Ver Benefícios Tangíveis <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="card group cursor-pointer hover:border-prime transition-all" onClick={() => setModal({ type: "solution", kind: "faq", title: "FAQ Educacional" })}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-prime-accent uppercase tracking-wider group-hover:underline">Ver Fluxo</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900">2. FAQ Inteligente</h3>
              <p className="text-sm text-slate-600 mt-2 mb-4">Base de conhecimento treinada para tirar dúvidas de preparo, valores e localização instantaneamente.</p>
              <button
                onClick={(e) => { e.stopPropagation(); setModal({ type: "benefits", solution: "faq" }); }}
                className="text-xs font-bold text-prime hover:underline flex items-center gap-1"
              >
                Ver Benefícios Tangíveis <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="card group cursor-pointer hover:border-prime transition-all" onClick={() => setModal({ type: "solution", kind: "triagem-noshow", title: "Anti No-Show" })}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <BellRing className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-prime-accent uppercase tracking-wider group-hover:underline">Ver Fluxo</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900">3. Gestão de No-Show</h3>
              <p className="text-sm text-slate-600 mt-2 mb-4">Automação de confirmações (D-2, D-1) e gestão ativa de fila de espera para preencher lacunas.</p>
              <button
                onClick={(e) => { e.stopPropagation(); setModal({ type: "benefits", solution: "triagem-noshow" }); }}
                className="text-xs font-bold text-prime hover:underline flex items-center gap-1"
              >
                Ver Benefícios Tangíveis <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Card 4 */}
            <div className="card group cursor-pointer hover:border-prime transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                  <FileBarChart className="h-5 w-5" />
                </div>
                {/* <span className="text-xs font-bold text-prime-accent uppercase tracking-wider group-hover:underline">Ver Fluxo</span> */}
              </div>
              <h3 className="font-bold text-lg text-slate-900">4. Pesquisa & Satisfação</h3>
              <p className="text-sm text-slate-600 mt-2 mb-4">Envia pesquisa de satisfação, analisa sentimentos e direciona promotores para o Google.</p>
              <button
                onClick={(e) => { e.stopPropagation(); setModal({ type: "benefits", solution: "pesquisa" }); }}
                className="text-xs font-bold text-prime hover:underline flex items-center gap-1"
              >
                Ver Benefícios Tangíveis <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Ferramentas de Gestão */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <KanbanSquare className="text-prime" /> Ferramentas de Controle
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">CRM Integrado</h4>
                <p className="text-sm text-slate-600 mb-4">Visualização clara do funil de vendas, com status de cada paciente e histórico de conversas.</p>
                <button onClick={() => setModal({ type: "crm" })} className="text-sm font-bold text-prime hover:underline">Abrir Demonstração CRM →</button>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Dashboard Executivo</h4>
                <p className="text-sm text-slate-600 mb-4">Acompanhamento em tempo real de KPIs: Taxa de conversão, Faturamento projetado e Eficiência dos canais.</p>
                <button onClick={() => setModal({ type: "dashboard" })} className="text-sm font-bold text-prime hover:underline">Abrir Demonstração Dashboard →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GANHOS ESPERADOS - Simplificado */}
      <section className="section bg-white" id="ganhos">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="section-title">Ganhos Esperados</h2>
          <p className="subtitle mt-2">Impacto direto nos indicadores chave do consultório.</p>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">+40%</div>
              <div className="font-semibold text-emerald-900">Conversão de Leads</div>
              <p className="text-xs text-emerald-800 mt-1">Resposta imediata aumenta drásticamente o aproveitamento.</p>
            </div>
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">-60%</div>
              <div className="font-semibold text-blue-900">Taxa de No-Show</div>
              <p className="text-xs text-blue-800 mt-1">Confirmações multicanal e fila de espera ativa.</p>
            </div>
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-600 mb-2">24h</div>
              <div className="font-semibold text-indigo-900">Operação Comercial</div>
              <p className="text-xs text-indigo-800 mt-1">Captura de pacientes noturnos e finais de semana.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-3xl font-bold text-slate-600 mb-2">100%</div>
              <div className="font-semibold text-slate-900">Visibilidade</div>
              <p className="text-xs text-slate-600 mt-1">Dados estruturados para tomada de decisão.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button onClick={() => setModal({ type: "conquistas" })} className="btn-secondary text-sm">Detalhar Ganhos Operacionais</button>
            <button onClick={() => setModal({ type: "inteligencia" })} className="btn-secondary text-sm">Ver Inteligência de Dados</button>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: ENTREGÁVEIS (Tangibilização) */}
      <section className="section bg-slate-50 border-y border-slate-200" id="entregaveis">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title mb-8">O Que Será Entregue</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-prime mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> Setup Tecnológico
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div className="text-sm text-slate-700"><strong>Configuração dos Agentes:</strong> Desenvolvimento e treino dos 3 fluxos (SDR, FAQ, No-Show) com a base de conhecimento do Dr.</div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div className="text-sm text-slate-700"><strong>Integração ERP:</strong> Conector seguro para leitura e escrita na agenda oficial do hospital/clínica.</div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div className="text-sm text-slate-700"><strong>Painel de Controle:</strong> Setup do CRM e Dashboard com as métricas definidas no diagnóstico.</div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-prime mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Serviços & Garantias
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                  <div className="text-sm text-slate-700"><strong>Treinamento da Equipe:</strong> Workshop de 4h para secretárias sobre como operar o CRM e interagir com a IA.</div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                  <div className="text-sm text-slate-700"><strong>Acompanhamento Assistido:</strong> 30 dias de monitoramento intensivo pós-Go-Live para ajustes finos.</div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                  <div className="text-sm text-slate-700"><strong>Garantia de Performance:</strong> SLA de estabilidade e suporte técnico prioritário.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA ROI */}
      <section className="py-16 bg-white" id="roi">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="section-title">Viabilidade Financeira</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Utilize nossa calculadora para projetar o retorno sobre o investimento com base na recuperação de leads e redução de custos operacionais.
          </p>
          <div className="mt-8">
            <button
              onClick={() => setModal({ type: "roi" })}
              className="btn-primary px-8 py-3 shadow-lg shadow-prime/20"
            >
              Abrir Calculadora de ROI
            </button>
          </div>
        </div>
      </section>

      {/* INVESTIMENTO */}
      <section className="section bg-slate-50" id="investimento">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title text-center">Proposta Comercial</h2>
          <p className="text-center text-slate-600 mt-3">Escolha um módulo individual ou contrate o ecossistema completo com ancoragem de preço.</p>

          {/* Linha superior: 3 módulos */}
          {/* Linha 1: 3 Cards Modulares */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Agente FAQ */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-prime-accent/50 transition-colors">
              <h3 className="text-lg font-bold text-prime mb-2">Agente FAQ + Informações Gerais</h3>
              <div className="text-xs text-slate-500 mb-4">Implementação</div>
              <div className="text-2xl font-bold text-slate-900 mb-1">R$ 10.000,00</div>
              <div className="text-xs text-slate-500 mb-4">Pagamento único</div>

              <div className="text-xs text-slate-500 mb-1">Recorrência</div>
              <div className="text-lg font-bold text-slate-900 mb-4">R$ 2.000,00/mês</div>

              <ul className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Desenvolvimento e Suporte
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Implementação sistema de OCR (extrai dados de documentos)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Acesso ao Banco de Conhecimento personalizado
                </li>
              </ul>
            </div>

            {/* Card 2: Agendamento Inteligente (Destaque) */}
            <div className="bg-white rounded-2xl border-2 border-prime shadow-lg p-6 flex flex-col relative transform md:-translate-y-2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-prime text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Mais Popular
              </div>
              <h3 className="text-lg font-bold text-prime mb-2">Agendamento Inteligente</h3>
              <div className="text-xs text-slate-500 mb-4">Implementação</div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">R$ 45.000,00</div>
              <div className="text-xs text-slate-500 mb-4">Pagamento único</div>

              <div className="text-xs text-slate-500 mb-1">Recorrência</div>
              <div className="text-xl font-bold text-slate-900 mb-4">R$ 5.000,00/mês</div>

              <ul className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Qualificação e Agendamento
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Desenvolvimento Personalizado
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Implementação e Treinamentos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Suporte + Otimizações
                </li>
              </ul>
            </div>

            {/* Card 3: Pré-triagem */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-prime-accent/50 transition-colors">
              <h3 className="text-lg font-bold text-prime mb-2">Agente Pré-triagem + Anti No-Show</h3>
              <div className="text-xs text-slate-500 mb-4">Implementação</div>
              <div className="text-2xl font-bold text-slate-900 mb-1">R$ 15.000,00</div>
              <div className="text-xs text-slate-500 mb-4">Pagamento único</div>

              <div className="text-xs text-slate-500 mb-1">Recorrência</div>
              <div className="text-lg font-bold text-slate-900 mb-4">R$ 2.000,00/mês</div>

              <ul className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Desenvolvimento e Suporte
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Acesso ao Banco de Conhecimento
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-prime">•</span> Agente ativo (inicia as conversas)
                </li>
              </ul>
            </div>
          </div>

          {/* Linha 2: Card Pós-venda */}
          <div className="mt-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-prime-accent/50 transition-colors">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-prime mb-2">Agente Pós-venda</h3>
                <div className="grid grid-cols-2 gap-8 mt-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Implementação</div>
                    <div className="text-2xl font-bold text-slate-900">R$ 10.000,00</div>
                    <div className="text-xs text-slate-500">Pagamento único</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Recorrência</div>
                    <div className="text-lg font-bold text-slate-900">R$ 2.000,00/mês</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 border-l border-slate-100 pl-6">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-prime">•</span> Entra em contato com os pacientes e realiza pesquisa de satisfação
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime">•</span> Leitura e Análise de Sentimentos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime">•</span> Sentimento positivo → envia link do Google
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime">•</span> Sentimento negativo → rapport + insight interno
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Linha 3: Ecossistema Full */}
          <div className="mt-12 bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-prime-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-prime-accent/20 transition-all duration-700"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-prime-accent/20 border border-prime-accent/30 px-3 py-1 text-xs font-bold text-prime-accent uppercase tracking-wider mb-6">
                  <Sparkles className="h-3 w-3" />
                  Oferta Especial
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Ecossistema Full</h3>
                <p className="text-slate-300 text-lg mb-8">
                  Contrate todos os 4 agentes integrados + CRM + Dashboard e economize significativamente no setup e na recorrência.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "SDR + Agendamento",
                    "FAQ Inteligente",
                    "Pré-triagem + Anti No-Show",
                    "Pós-venda + Pesquisa",
                    "CRM + Dashboard Executivo",
                    "Integração ERP Completa"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Investimento Total (Setup)</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg text-slate-500 line-through">R$ 80.000</span>
                      <span className="text-4xl font-extrabold text-white">R$ 60.000</span>
                    </div>
                    <div className="text-emerald-400 text-sm font-bold mt-1">Economia de R$ 20.000 no setup</div>
                  </div>

                  <div className="w-full h-px bg-white/10"></div>

                  <div>
                    <div className="text-sm text-slate-400 mb-1">Mensalidade (Recorrência)</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg text-slate-500 line-through">R$ 11.000/mês</span>
                      <span className="text-3xl font-bold text-white">R$ 7.000<span className="text-lg font-normal text-slate-400">/mês</span></span>
                    </div>
                    <div className="text-emerald-400 text-sm font-bold mt-1">Economia de R$ 4.000/mês</div>
                  </div>

                  <button className="w-full mt-4 bg-prime-accent hover:bg-sky-400 text-prime-dark font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-prime-accent/20">
                    Garantir Ecossistema Completo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section bg-white" id="cta">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="section-title">Cronograma de Execução</h2>
          <p className="text-slate-600 mt-4">Próximos passos após a aprovação.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: "Kick-off", desc: "Reunião de alinhamento e acessos" },
              { step: 2, title: "Desenvolvimento", desc: "Configuração dos fluxos e integrações" },
              { step: 3, title: "Validação", desc: "Testes assistidos com a equipe" },
              { step: 4, title: "Go-Live", desc: "Virada de chave oficial" }
            ].map((s) => (
              <div key={s.step} className="p-4 rounded-lg border border-slate-100 bg-slate-50 text-left hover:border-prime-accent/50 transition-colors cursor-pointer" onClick={() => setModal({ type: "phases", phase: s.step as 1 | 2 | 3 | 4 })}>
                <span className="text-xs font-bold text-prime-accent uppercase">Fase 0{s.step}</span>
                <h4 className="font-bold text-slate-900 mt-1">{s.title}</h4>
                <p className="text-xs text-slate-500 mt-2">{s.desc}</p>
                <span className="text-xs text-prime mt-2 block font-medium">Ver detalhes →</span>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <button className="btn-primary text-lg px-10 py-4">
              Formalizar Contratação
            </button>
            <p className="mt-4 text-sm text-slate-400">Dúvidas técnicas? <a href="#" className="text-prime underline">Fale com o especialista</a>.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs">
        <div className="mx-auto max-w-7xl px-4">
          <p>&copy; 2025 Convert.AI - Tecnologia para Clínicas.</p>
        </div>
      </footer>

      {/* MODALS RENDERER */}
      <Modal open={modal?.type === "solution"} onClose={() => setModal(null)} title={(modal && modal.type === "solution" && modal.title) || "Fluxo"} scrollContent={false}>
        <div className="h-full">{modal && modal.type === "solution" ? <FlowDiagramLazy kind={modal.kind} /> : null}</div>
      </Modal>
      <Modal open={modal?.type === "roi"} onClose={() => setModal(null)} title="Simulador de ROI" titleAlign="center" closeLabel="Fechar">
        <RoiModalLazy
          preparedFor={preparedFor}
          onFinish={() => {
            setModal(null);
            document.getElementById("investimento")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </Modal>
      <Modal open={modal?.type === "crm"} onClose={() => setModal(null)} title="CRM Integrado"> <CRMModalLazy /> </Modal>
      <Modal open={modal?.type === "dashboard"} onClose={() => setModal(null)} title="Painel Executivo"> <DashboardModalLazy /> </Modal>
      <Modal open={modal?.type === "phases"} onClose={() => setModal(null)} title={`Fase ${modal?.type === "phases" ? modal.phase : 1}: Detalhamento`} size="md"> <PhaseDetailModalLazy phase={modal?.type === "phases" ? modal.phase : 1} /> </Modal>
      <Modal open={modal?.type === "conquistas"} onClose={() => setModal(null)} title="Ganhos Operacionais"> <ConquistasModalLazy /> </Modal>
      <Modal open={modal?.type === "inteligencia"} onClose={() => setModal(null)} title="Inteligência de Dados"> <InteligenciaModalLazy /> </Modal>
      <Modal open={modal?.type === "insights"} onClose={() => setModal(null)} title="Insights de Negócio"> <InsightsModalLazy /> </Modal>
      <Modal open={modal?.type === "relatorios"} onClose={() => setModal(null)} title="Relatórios Gerenciais"> <RelatoriosModalLazy /> </Modal>
      <Modal open={modal?.type === "etapa"} onClose={() => setModal(null)} title={modal?.type === "etapa" ? `Etapa ${modal.etapa} - ${getEtapaTitle(modal.etapa)}` : "Etapa"} size="md"> <EtapaModalLazy etapa={modal?.type === "etapa" ? modal.etapa : 1} /> </Modal>
      <Modal open={modal?.type === "benefits"} onClose={() => setModal(null)} title="Benefícios Tangíveis"> <SolutionBenefitsModalLazy solution={modal?.type === "benefits" ? modal.solution : "agendamento"} /> </Modal>
    </div>
  );
}
