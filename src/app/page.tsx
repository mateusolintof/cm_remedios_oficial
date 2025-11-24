"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  CalendarCheck2,
  BellRing,
  MessageSquare,
  KanbanSquare,
  BarChart3,
  UserRound,
  Sparkles,
  CheckCircle2,
  Target,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import Modal from "./components/Modal";
import { type FlowKind } from "./components/FlowDiagram";

// Configurações da Proposta
const preparedFor = "Dr. Maurício Ernesto";
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
const RoiModalLazy = dynamic<{ preparedFor: string }>(() => import("./components/modal-content/RoiModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const CRMModalLazy = dynamic(() => import("./components/modal-content/CRMModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const DashboardModalLazy = dynamic(() => import("./components/modal-content/DashboardModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const PhaseDetailModalLazy = dynamic<{ phase: 1 | 2 | 3 | 4 }>(() => import("./components/modal-content/PhaseDetailModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const ConquistasModalLazy = dynamic(() => import("./components/modal-content/ConquistasModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const InteligenciaModalLazy = dynamic(() => import("./components/modal-content/InteligenciaModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const InsightsModalLazy = dynamic(() => import("./components/modal-content/InsightsModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const RelatoriosModalLazy = dynamic(() => import("./components/modal-content/RelatoriosModalContentDoc"), { ssr: false, loading: () => <ModalContentFallback /> });
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
  | null;

export default function Home() {
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* HEADER / NAV */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/branding/logo.svg" alt={`Logo ${preparedFor}`} width={140} height={48} className="h-10 w-auto" />
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
              Solução tecnológica para centralizar o atendimento, qualificar os 150 leads diários e integrar a agenda Tasy ao fluxo particular.
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

          <div className="mt-10 grid md:grid-cols-4 gap-6">
            {[
                { title: "Volume x Capacidade", desc: "O volume de 150 leads/dia supera a capacidade humana de triagem rápida, gerando fila e desistência.", icon: UserRound },
                { title: "Fragmentação de Agenda", desc: "A falta de integração entre Tasy e Agenda Particular cria risco de overbooking e dificulta encaixes.", icon: CalendarCheck2 },
                { title: "Gestão de Comparecimento", desc: "O processo manual de confirmação não é suficiente para mitigar o impacto financeiro do No-Show.", icon: BellRing },
                { title: "Visibilidade de Dados", desc: "Ausência de métricas consolidadas de conversão impede decisões estratégicas baseadas em dados.", icon: BarChart3 }
            ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <item.icon className="h-8 w-8 text-prime-accent mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÕES */}
      <section className="section bg-white" id="solucoes">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="section-title">Arquitetura da Solução</h2>
          <p className="subtitle mt-2">Implementação de 3 Agentes Especializados + Ecossistema de Gestão.</p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="card group cursor-pointer hover:border-prime transition-all" onClick={() => setModal({ type: "solution", kind: "agendamento", title: "SDR & Agendamento" })}>
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-prime-accent uppercase tracking-wider group-hover:underline">Ver Fluxo</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">1. SDR & Agendamento</h3>
                <p className="text-sm text-slate-600 mt-2">Recepciona o paciente, identifica convênio ou particular e realiza o agendamento integrado.</p>
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
                <p className="text-sm text-slate-600 mt-2">Base de conhecimento treinada para tirar dúvidas de preparo, valores e localização instantaneamente.</p>
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
                <p className="text-sm text-slate-600 mt-2">Automação de confirmações (D-2, D-1) e gestão ativa de fila de espera para preencher lacunas.</p>
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
                            <div className="text-sm text-slate-700"><strong>Integração Tasy:</strong> Conector seguro para leitura e escrita na agenda oficial do hospital/clínica.</div>
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
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                titulo: "FAQ Inteligente",
                setup: "R$ 10.000",
                mensal: "R$ 800/mês",
                itens: ["Tira-dúvidas 24/7", "Base de Conhecimento Educacional"],
                tag: null,
              },
              {
                titulo: "SDR + Agendamento",
                setup: "R$ 20.000",
                mensal: "R$ 2.200/mês",
                itens: ["Qualificação de Leads", "Integração Tasy (Leitura/Escrita)"],
                tag: "Core / Principal",
              },
              {
                titulo: "Anti No-Show",
                setup: "R$ 10.000",
                mensal: "R$ 1.000/mês",
                itens: ["Confirmação D-2 e D-1", "Gestão de Fila de Espera"],
                tag: null,
              },
            ].map((card) => (
              <div key={card.titulo} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
                {card.tag && (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-prime text-white px-3 py-1 text-xs font-semibold mb-3">
                    {card.tag}
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{card.titulo}</h3>
                <div className="mt-4 space-y-1 text-sm text-slate-600">
                  <div className="font-semibold text-slate-800">Investimento Único (Setup): <span className="text-prime">{card.setup}</span></div>
                  <div className="font-semibold text-slate-800">Mensalidade: <span className="text-prime">{card.mensal}</span></div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {card.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Linha inferior: pacote full + condições */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3 bg-white rounded-2xl border-2 border-prime-accent shadow-lg shadow-prime/10 p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                Melhor Custo-Benefício
              </div>
              <p className="text-sm font-semibold text-prime uppercase">Ecossistema Full (Projeto Completo)</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Todos os módulos + Gestão Unificada</h3>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="line-through">R$ 40.000</span>
                  <span className="text-emerald-700 font-bold">-37% OFF</span>
                </div>
                <div className="text-4xl font-extrabold text-slate-900">R$ 25.000</div>
                <p className="text-sm text-slate-600">Investimento Único (Setup)</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="line-through">R$ 4.000/mês</span>
                </div>
                <div className="text-2xl font-bold text-prime">R$ 2.500<span className="text-sm font-normal text-slate-500">/mês</span></div>
                <p className="text-sm text-slate-600">Manutenção e servidores</p>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Agente SDR + Agendamento",
                  "Agente FAQ Inteligente",
                  "Agente Anti No-Show",
                  "Integração Tasy Completa",
                  "CRM + Dashboard Executivo",
                  "Treinamento + 30 dias assistidos",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href="#cta"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-prime-accent px-5 py-3 text-prime-dark font-semibold shadow-md shadow-prime/15 hover:bg-sky-400 transition-colors"
                >
                  Selecionar Pacote Completo
                </a>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900">Condições de Pagamento</h3>
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-800">Investimento Único (Setup)</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li>Opção A: À vista (5% de desconto no PIX/TED)</li>
                  <li>Opção B: Entrada + 4 parcelas (Boleto Bancário)</li>
                  <li>Opção C: Até 3x sem juros (Cartão Corporativo)</li>
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-800">Mensalidade (Recorrência)</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li>Vencimento inicia apenas 30 dias após o Go-Live.</li>
                  <li>Formato: Boleto mensal ou PIX recorrente.</li>
                </ul>
              </div>
              <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
                “O valor mensal já contempla: Custos de servidor, Banco de Dados, Suporte Técnico (SLA 24h úteis), Backups diários e Manutenção evolutiva.”
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
                    <div key={s.step} className="p-4 rounded-lg border border-slate-100 bg-slate-50 text-left hover:border-prime-accent/50 transition-colors cursor-pointer" onClick={() => setModal({ type: "phases", phase: s.step as 1|2|3|4 })}>
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
      <Modal open={modal?.type === "roi"} onClose={() => setModal(null)} title="Simulador de ROI" titleAlign="center" closeLabel="Fechar"> <RoiModalLazy preparedFor={preparedFor} /> </Modal>
      <Modal open={modal?.type === "crm"} onClose={() => setModal(null)} title="CRM Integrado"> <CRMModalLazy /> </Modal>
      <Modal open={modal?.type === "dashboard"} onClose={() => setModal(null)} title="Painel Executivo"> <DashboardModalLazy /> </Modal>
      <Modal open={modal?.type === "phases"} onClose={() => setModal(null)} title={`Fase ${modal?.type === "phases" ? modal.phase : 1}: Detalhamento`} size="md"> <PhaseDetailModalLazy phase={modal?.type === "phases" ? modal.phase : 1} /> </Modal>
      <Modal open={modal?.type === "conquistas"} onClose={() => setModal(null)} title="Ganhos Operacionais"> <ConquistasModalLazy /> </Modal>
      <Modal open={modal?.type === "inteligencia"} onClose={() => setModal(null)} title="Inteligência de Dados"> <InteligenciaModalLazy /> </Modal>
      <Modal open={modal?.type === "insights"} onClose={() => setModal(null)} title="Insights de Negócio"> <InsightsModalLazy /> </Modal>
      <Modal open={modal?.type === "relatorios"} onClose={() => setModal(null)} title="Relatórios Gerenciais"> <RelatoriosModalLazy /> </Modal>
      <Modal open={modal?.type === "etapa"} onClose={() => setModal(null)} title={modal?.type === "etapa" ? `Etapa ${modal.etapa} - ${getEtapaTitle(modal.etapa)}` : "Etapa"} size="md"> <EtapaModalLazy etapa={modal?.type === "etapa" ? modal.etapa : 1} /> </Modal>
    </div>
  );
}
