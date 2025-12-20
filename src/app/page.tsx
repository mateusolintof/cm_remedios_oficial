"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import {
  BarChart3,
  BellRing,
  CheckCircle2,
  Clock3,
  FileBarChart,
  KanbanSquare,
  MessageSquare,
  Sparkles,
  Target,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Modal from "./components/Modal";
import { type FlowKind } from "./components/FlowDiagram";
import SectionProgress from "./components/SectionProgress";
import { ProposalCountdown } from "./components/ValidityCountdown";
import SocialProofMarquee from "./components/SocialProofMarquee";
import CaseStudySection from "./components/CaseStudy";
import FAQAccordion from "./components/FAQAccordion";

// Configurações da Proposta
const preparedFor = "CM Remédios";
const proposalDate = "Outubro 2025";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

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
const CostReductionModalLazy = dynamic(() => import("./components/modal-content/CostReductionModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });
const PaybackModalLazy = dynamic(() => import("./components/modal-content/PaybackModalContent"), { ssr: false, loading: () => <ModalContentFallback /> });

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
  | { type: "costs" }
  | { type: "payback" }
  | { type: "benefits"; solution: "agendamento" | "faq" | "triagem-noshow" | "pesquisa" }
  | null;

// Motion Components
const MotionButton = motion.create(Button);
const MotionCard = motion.create(Card);

export default function Home() {
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* HEADER / NAV */}
      <Navbar
        isBlurred
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/50"
        maxWidth="xl"
      >
        <NavbarBrand>
          <Image src="/branding/cmremedios-logo.png" alt={`Logo ${preparedFor}`} width={140} height={48} className="h-10 w-auto" />
        </NavbarBrand>
        <NavbarContent className="hidden md:flex gap-6" justify="end">
          <NavbarItem>
            <Link href="#diagnostico" className="text-slate-600 hover:text-prime transition-colors font-medium">
              Diagnóstico
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#solucoes" className="text-slate-600 hover:text-prime transition-colors font-medium">
              Soluções
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#entregaveis" className="text-slate-600 hover:text-prime transition-colors font-medium">
              Entregáveis
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#investimento" className="text-slate-600 hover:text-prime transition-colors font-medium">
              Investimento
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Section Progress Indicator */}
      <SectionProgress />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden hero-gradient-mesh text-white py-28 md:py-36" id="hero">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5"></div>
        {/* Primary blob - enhanced */}
        <motion.div
          className="absolute top-10 right-10 md:top-20 md:right-20 w-72 md:w-[500px] h-72 md:h-[500px] bg-prime-accent/25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary blob - offset timing */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-prime-accent/15 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Tertiary accent blob */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-40 h-40 bg-prime-accent/10 rounded-full blur-2xl"
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="mx-auto max-w-7xl px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Chip
                startContent={<Target className="w-3 h-3" />}
                variant="flat"
                classNames={{
                  base: "bg-prime-accent/15 border border-prime-accent/30",
                  content: "text-prime-accent text-xs font-bold uppercase tracking-wider",
                }}
              >
                Plano de Expansão Comercial
              </Chip>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6 mt-6"
            >
              Agentes Inteligentes & <span className="text-prime-accent">Gestão Unificada</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300 leading-relaxed max-w-xl">
              Centralize WhatsApp, Instagram e Google em um inbox unificado. A IA qualifica, roteia e agenda automaticamente — e o time humano foca em fechar e atender com qualidade.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col border-l-2 border-prime-accent pl-4">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Cliente</span>
                  <span className="font-semibold text-white">{preparedFor}</span>
                </div>
                <div className="flex flex-col border-l-2 border-slate-600 pl-4">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Data</span>
                  <span className="font-semibold text-white">{proposalDate}</span>
                </div>
              </div>
              {/* Validity Countdown */}
              <ProposalCountdown variant="hero" />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden md:block"
            initial="hidden"
            animate="visible"
            variants={slideInRight}
          >
            <Card className="bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <CardHeader className="border-b border-white/10 pb-4">
                <h3 className="text-white font-semibold">Objetivos do Projeto</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                {[
                  "Inbox unificado com IA + time humano",
                  "Qualificação e roteamento (convênio vs particular)",
                  "Agendamento integrado ao ERP e CRM",
                  "Relatórios e insights acionáveis",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <CheckCircle2 className="text-prime-accent h-5 w-5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* DIAGNÓSTICO */}
      <section className="py-16 md:py-20 bg-slate-50" id="diagnostico">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Diagnóstico Operacional</h2>
            <p className="subtitle mt-4 text-slate-600">
              Identificamos os principais pontos de fricção que impedem o consultório de escalar sua eficiência comercial hoje.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "1. Atendimento ineficiente",
                items: [
                  { main: "Atendimento online sobrecarregado:", sub: ["Não consegue qualificar ou agendar corretamente.", "Não consegue buscar de forma eficiente as dúvidas e informações.", "Atendimento presencial fica limitado porque são muitas tarefas a serem executadas."] },
                ],
              },
              {
                title: "2. Alto volume sem atendimento",
                items: [
                  { main: "61% do tempo total da semana não tem atendimento humano (101 horas):", sub: ["Estudos mostram que 50% a 70% dos usuários que iniciam contato fora do horário comercial e só recebem resposta no dia seguinte não dão continuidade à conversa.", "Se o volume mensal é de 1000 pessoas, isso representa uma perda de ao menos 500 possíveis agendamentos."] },
                ],
              },
              {
                title: "3. Múltiplos gaps",
                items: [
                  { main: "Com alto volume de atendimento presencial e online, não é possível conferir corretamente:", sub: ["Taxa de no-show e remarcação.", "Informações sobre exames e procedimentos, o que pode acarretar em retrabalho e tempo que poderia ser destinado à conversão ou a um atendimento de qualidade."] },
                ],
              },
            ].map((card, idx) => (
              <MotionCard
                key={idx}
                variants={fadeInUp}
                className="bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold text-prime mb-3">{card.title}</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    {card.items.map((item, i) => (
                      <li key={i}>
                        <strong>{item.main}</strong>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1 text-slate-600">
                          {item.sub.map((s, j) => (
                            <li key={j}>{s}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </MotionCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DESAFIO ATUAL */}
      <section className="py-16 md:py-20 bg-slate-50" id="desafio">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Desafio Atual</h2>
            <p className="subtitle mt-2">Contexto da CM Remédios: Alto Volume de Leads sem atendimento adequado, muita insatisfação e reclamações sobre Atendimento.</p>
          </motion.div>

          <motion.div
            className="mt-10 grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn} className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/avaliacao.png" alt="Avaliações de atendimento — CM Remédios" className="w-full rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow" />
            </motion.div>
            <motion.div variants={scaleIn} className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/reclameaqui1.png" alt="Reclamações — Reclame Aqui (1) — CM Remédios" className="w-full rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/reclameaqui2.png" alt="Reclamações — Reclame Aqui (2) — CM Remédios" className="w-full rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* O IMPACTO REAL - Seção narrativa */}
      <section className="py-20 md:py-28 bg-prime text-white relative overflow-hidden" id="impacto">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-prime-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto max-w-5xl px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Chip
              variant="flat"
              classNames={{
                base: "bg-prime-accent/15 border border-prime-accent/30",
                content: "text-prime-accent text-xs font-bold uppercase tracking-wider",
              }}
            >
              O Custo da Inação
            </Chip>
            <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-4">O Impacto Real</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Cada dia sem uma solução automatizada representa oportunidades perdidas e receita que não volta.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-3 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Clock3 className="h-5 w-5 text-prime-accent" />,
                title: "Janela sem atendimento",
                label: "Fora do horário comercial",
                desc: "Leads chegam quando não há cobertura humana. A primeira resposta vira o gargalo e a conversa esfria.",
              },
              {
                icon: <Target className="h-5 w-5 text-prime-accent" />,
                title: "Conversas sem follow-up",
                label: "Falta de cadência e priorização",
                desc: "Sem processo e automação, o time perde timing, esquece retornos e não sabe quem atacar primeiro.",
              },
              {
                icon: <BarChart3 className="h-5 w-5 text-prime-accent" />,
                title: "Falta de visibilidade",
                label: "Gestão às cegas",
                desc: "Sem dados por canal, etapa e equipe, fica difícil corrigir gargalos, reduzir no-show e preencher lacunas da agenda.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={scaleIn}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-semibold">{card.title}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">
                      {card.label}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 rounded-full px-6 py-3">
              <CheckCircle2 className="w-5 h-5 text-prime-accent" />
              <span className="text-white/90 font-semibold">
                A solução: automatizar com IA e recuperar cada lead com governança.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF MARQUEE */}
      <SocialProofMarquee />

      {/* SOLUÇÕES */}
      <section className="py-16 md:py-20 bg-white" id="solucoes">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Arquitetura da Solução</h2>
            <p className="subtitle mt-2">Implementação de 4 Agentes Especializados + Ecossistema de Gestão.</p>
          </motion.div>

          {/* Bento Grid Layout */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* SDR & Agendamento - Large Card (2x2) */}
            <motion.div
              variants={scaleIn}
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-50 via-white to-prime-accent/10 rounded-2xl border border-slate-200 p-6 md:p-8 cursor-pointer group hover:border-prime hover:shadow-xl transition-all relative overflow-hidden"
              onClick={() => setModal({ type: "solution", kind: "agendamento", title: "SDR & Agendamento" })}
            >
              {/* Decorative blob */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-prime-accent/15 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-prime-accent/15 text-prime rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-bold text-prime-accent uppercase tracking-wider group-hover:underline flex items-center gap-1">
                    Ver Fluxo <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <h3 className="font-bold text-2xl md:text-3xl text-slate-900 mb-3">1. SDR & Agendamento</h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                  Recepciona o paciente, identifica convênio ou particular e realiza o agendamento integrado com seu sistema ERP.
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                  {[
                    "Inbox unificado (IA + humano)",
                    "Roteamento convênio/particular",
                    "Agendamento integrado ao ERP",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* FAQ Inteligente - Small Card (1x1) */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer group hover:border-prime hover:shadow-lg transition-all"
              onClick={() => setModal({ type: "solution", kind: "faq", title: "FAQ Educacional" })}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-prime-accent/15 text-prime rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-prime-accent/70 group-hover:translate-x-1 group-hover:text-prime-accent transition-transform" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">2. FAQ Inteligente</h3>
              <p className="text-sm text-slate-600 mt-2">Base de conhecimento treinada para tirar dúvidas instantaneamente.</p>
            </motion.div>

            {/* Gestão No-Show - Small Card (1x1) */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer group hover:border-prime hover:shadow-lg transition-all"
              onClick={() => setModal({ type: "solution", kind: "triagem-noshow", title: "Anti No-Show" })}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-prime-accent/15 text-prime rounded-xl flex items-center justify-center">
                  <BellRing className="h-5 w-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-prime-accent/70 group-hover:translate-x-1 group-hover:text-prime-accent transition-transform" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">3. Gestão de No-Show</h3>
              <p className="text-sm text-slate-600 mt-2">Automação de confirmações e gestão ativa de fila de espera.</p>
            </motion.div>

            {/* Pesquisa & Satisfação - Wide Card (3x1) */}
            <motion.div
              variants={fadeInUp}
              className="md:col-span-3 bg-slate-50 rounded-2xl border border-slate-200 p-5 md:p-6 group hover:border-prime hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-prime-accent/15 text-prime rounded-xl flex items-center justify-center shrink-0">
                    <FileBarChart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">4. Pesquisa & Satisfação</h3>
                    <p className="text-sm text-slate-600">Envia pesquisa de satisfação, analisa sentimentos e direciona promotores para o Google.</p>
                  </div>
                </div>
                <div className="md:ml-auto flex items-center gap-6 text-center">
                  <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                    <div className="text-lg font-bold text-prime">NPS</div>
                    <div className="text-xs text-slate-500">Automático</div>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                    <div className="text-lg font-bold text-prime">Google</div>
                    <div className="text-xs text-slate-500">Reviews</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Ferramentas de Gestão */}
          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Card className="bg-slate-50 border border-slate-200 shadow-sm">
              <CardBody className="p-8">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
                  <KanbanSquare className="text-prime" /> Ferramentas de Controle
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">CRM Integrado</h4>
                    <p className="text-sm text-slate-600 mb-4">Visualização clara do funil de vendas, com status de cada paciente e histórico de conversas.</p>
                    <Button
                      variant="light"
                      color="primary"
                      onPress={() => setModal({ type: "crm" })}
                      className="font-bold"
                      endContent={<ArrowRight className="w-4 h-4" />}
                    >
                      Abrir Demonstração CRM
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Dashboard Executivo</h4>
                    <p className="text-sm text-slate-600 mb-4">Acompanhamento em tempo real de KPIs: Taxa de conversão, Faturamento projetado e Eficiência dos canais.</p>
                    <Button
                      variant="light"
                      color="primary"
                      onPress={() => setModal({ type: "dashboard" })}
                      className="font-bold"
                      endContent={<ArrowRight className="w-4 h-4" />}
                    >
                      Abrir Demonstração Dashboard
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* GANHOS ESPERADOS */}
      <section className="py-16 md:py-20 bg-white" id="ganhos">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Ganhos Esperados</h2>
            <p className="subtitle mt-2">Impacto direto nos indicadores chave do consultório.</p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-7 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Indicadores acompanhados</h3>
              <p className="mt-2 text-sm text-slate-600">
                KPIs que aparecem no CRM e no Dashboard, com filtros por canal, equipe, campanha e período.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    icon: <Clock3 className="h-5 w-5 text-prime" />,
                    title: "Tempo de primeira resposta",
                    desc: "SLA por canal e por etapa (IA vs humano), com priorização automática.",
                  },
                  {
                    icon: <Target className="h-5 w-5 text-prime" />,
                    title: "Qualificação e taxa de agendamento",
                    desc: "Conversão por funil, origem e responsável — com histórico da conversa.",
                  },
                  {
                    icon: <BellRing className="h-5 w-5 text-prime" />,
                    title: "No-show e reaproveitamento de agenda",
                    desc: "Confirmações, fila de espera e remarcação guiada para reduzir lacunas.",
                  },
                  {
                    icon: <BarChart3 className="h-5 w-5 text-prime" />,
                    title: "Receita e previsibilidade",
                    desc: "Pipeline, perdas por etapa e oportunidades de recuperação com ações sugeridas.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-prime-accent/10">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-xs text-slate-500">
                Metas e números são ilustrativos nesta proposta. Ajustamos após a imersão e leitura dos dados reais da CM Remédios.
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">O que muda na prática</h3>
              <p className="mt-2 text-sm text-slate-600">Menos ruído operacional e mais controle sobre o funil.</p>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hoje</div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li>Leads entram em múltiplos canais e se perdem no processo.</li>
                    <li>Follow-up sem cadência e sem priorização por intenção.</li>
                    <li>Sem clareza de gargalos por etapa, canal e equipe.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-prime-accent/40 bg-prime-accent/10 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-prime">Com a solução</div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li>Inbox único com automação + escalonamento para o humano.</li>
                    <li>CRM com pipelines (IA, humano e follow-up) e próximos passos claros.</li>
                    <li>Dashboard com métricas acionáveis e relatórios para gestão.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <MotionButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variant="bordered"
              className="font-semibold border-2 border-prime/20 hover:border-prime hover:bg-prime/5"
              onPress={() => setModal({ type: "conquistas" })}
              endContent={<ChevronRight className="w-4 h-4" />}
            >
              Detalhar Ganhos Operacionais
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variant="bordered"
              className="font-semibold border-2 border-prime/20 hover:border-prime hover:bg-prime/5"
              onPress={() => setModal({ type: "inteligencia" })}
              endContent={<ChevronRight className="w-4 h-4" />}
            >
              Ver Inteligência de Dados
            </MotionButton>
          </motion.div>
        </div>
      </section>

      {/* ENTREGÁVEIS */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200" id="entregaveis">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2
            className="section-title mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            O Que Será Entregue
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={slideInLeft}>
              <h3 className="text-lg font-bold text-prime mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> Setup Tecnológico
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Configuração dos Agentes:", desc: "Desenvolvimento e treino dos 4 fluxos (SDR, FAQ, No-Show, Pós-venda) com a base de conhecimento da Clínica" },
                  { title: "Integração ERP:", desc: "Conector seguro para deixar tudo integrado." },
                  { title: "Painel de Controle:", desc: "Setup do CRM e Dashboard com as métricas definidas no diagnóstico." },
                ].map((item, idx) => (
                  <Card key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardBody className="flex flex-row items-start gap-3 p-4">
                      <CheckCircle2 className="h-5 w-5 text-prime-accent shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-700">
                        <strong>{item.title}</strong> {item.desc}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </motion.div>
            <motion.div variants={slideInRight}>
              <h3 className="text-lg font-bold text-prime mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Serviços & Garantias
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Treinamento da Equipe:", desc: "Workshop de 4h para secretárias sobre como operar o CRM e interagir com a IA." },
                  { title: "Acompanhamento Assistido:", desc: "30 dias de monitoramento intensivo pós-Go-Live para ajustes finos." },
                  { title: "Garantia de Performance:", desc: "SLA de estabilidade e suporte técnico prioritário." },
                ].map((item, idx) => (
                  <Card key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardBody className="flex flex-row items-start gap-3 p-4">
                      <CheckCircle2 className="h-5 w-5 text-prime-accent shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-700">
                        <strong>{item.title}</strong> {item.desc}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CALCULADORA ROI */}
      <section className="py-16 md:py-20 bg-white" id="roi">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Viabilidade Financeira</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Utilize nossa calculadora para projetar o retorno sobre o investimento com base na recuperação de leads e redução de custos operacionais.
            </p>
          </motion.div>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <MotionButton
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -15px rgba(4, 30, 66, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              color="primary"
              size="lg"
              className="bg-prime-accent text-prime-dark font-bold shadow-lg"
              onPress={() => setModal({ type: "roi" })}
            >
              Abrir Calculadora de ROI
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -15px rgba(4, 30, 66, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              color="primary"
              size="lg"
              className="bg-prime-accent text-prime-dark font-bold shadow-lg"
              onPress={() => setModal({ type: "costs" })}
            >
              Calcule a Redução de Custos
            </MotionButton>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <CaseStudySection />

      {/* INVESTIMENTO */}
      <section className="py-16 md:py-20 bg-slate-50" id="investimento">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="section-title">Investimento</h2>
            <p className="text-slate-600 mt-3">Escolha módulos individuais ou o pacote completo com ancoragem de preço.</p>
          </motion.div>

          {/* Módulos Individuais */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: "FAQ Inteligente",
                setup: "R$ 10.000",
                monthly: "R$ 800",
                tag: null,
                bullets: ["Tira-dúvidas 24/7", "Base de Conhecimento Educacional"],
                modal: "faq" as const,
              },
              {
                title: "SDR + Agendamento",
                setup: "R$ 20.000",
                monthly: "R$ 2.200",
                tag: "Core / Principal",
                bullets: ["Qualificação de Leads", "Integração Tasy (Leitura/Escrita)"],
                modal: "agendamento" as const,
              },
              {
                title: "Anti No-Show",
                setup: "R$ 10.000",
                monthly: "R$ 1.000",
                tag: null,
                bullets: ["Confirmação D-2 e D-1", "Gestão de Fila de Espera"],
                modal: "triagem-noshow" as const,
              },
            ].map((module) => (
              <motion.div
                key={module.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-prime-accent/40 hover:shadow-md transition-all flex flex-col min-h-[380px] ${
                  module.tag ? "border-prime/40" : ""
                }`}
              >
                <div className="p-6 pb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-prime">{module.title}</h3>
                    <div className="text-sm text-slate-600 mt-1">Setup + mensalidade recorrente</div>
                  </div>
                  {module.tag ? (
                    <Chip
                      size="sm"
                      variant="flat"
                      classNames={{
                        base: "bg-prime-accent/15 border border-prime-accent/30",
                        content: "text-prime text-[11px] font-bold uppercase tracking-wide",
                      }}
                    >
                      {module.tag}
                    </Chip>
                  ) : null}
                </div>

                <div className="px-6 pb-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Setup</div>
                      <div className="text-2xl font-bold text-slate-900">{module.setup}</div>
                      <div className="text-xs text-slate-500">pagamento único</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Mensal</div>
                      <div className="text-2xl font-bold text-slate-900">{module.monthly}</div>
                      <div className="text-xs text-slate-500">por mês</div>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-sm text-slate-700 flex-1">
                    {module.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-prime-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-4 mt-auto">
                  <Button
                    variant={module.tag ? "solid" : "bordered"}
                    color="primary"
                    className={module.tag ? "w-full font-semibold bg-prime hover:bg-prime-dark" : "w-full font-semibold"}
                    onPress={() => setModal({ type: "benefits", solution: module.modal })}
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ecossistema + Condições */}
          <motion.div
            className="mt-10 grid gap-6 lg:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn}>
              <Card className="bg-slate-900 text-white overflow-hidden relative group">
                <motion.div
                  className="absolute top-0 right-0 w-96 h-96 bg-prime-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <CardBody className="p-8 md:p-10 relative z-10">
                  <Chip
                    startContent={<Sparkles className="h-3 w-3" />}
                    variant="flat"
                    classNames={{
                      base: "bg-prime-accent/20 border border-prime-accent/30",
                      content: "text-prime-accent text-xs font-bold uppercase tracking-wider",
                    }}
                  >
                    Melhor custo-benefício
                  </Chip>

                  <h3 className="text-3xl font-extrabold mt-4">Ecossistema Full</h3>
                  <p className="text-slate-300 mt-3 text-sm leading-relaxed">
                    Tudo que você precisa para atendimento 24/7, agendamento integrado e gestão comercial com visibilidade.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      "SDR + Agendamento",
                      "FAQ Inteligente",
                      "Anti No-Show",
                      "Integração Tasy completa",
                      "CRM + Dashboard executivo",
                      "Treinamento + 30 dias assistidos",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-prime-accent/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-3 w-3 text-prime-accent" />
                        </div>
                        <span className="text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400">Setup</div>
                        <div className="mt-2 flex items-baseline gap-3">
                          <span className="text-sm text-slate-500 line-through">R$ 40.000</span>
                          <span className="text-3xl font-extrabold text-white">R$ 25.000</span>
                        </div>
                        <div className="mt-2 text-xs text-prime-accent font-semibold">-37% no setup</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400">Mensalidade</div>
                        <div className="mt-2 flex items-baseline gap-3">
                          <span className="text-sm text-slate-500 line-through">R$ 4.000/mês</span>
                          <span className="text-3xl font-extrabold text-white">
                            R$ 2.500<span className="text-base font-normal text-slate-400">/mês</span>
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-prime-accent font-semibold">Economia de R$ 1.500/mês</div>
                      </div>
                    </div>

                    <MotionButton
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 w-full bg-prime-accent text-prime-dark font-bold py-6 shadow-lg"
                      size="lg"
                      onPress={() => setModal({ type: "payback" })}
                    >
                      Selecionar Pacote Completo
                    </MotionButton>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-white border border-slate-200 shadow-sm">
                <CardBody className="p-6 md:p-8 space-y-5">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Condições de Pagamento</div>
                    <p className="text-sm text-slate-600 mt-2">
                      Opções flexíveis para setup + mensalidade, com início da recorrência após o Go-Live.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-slate-700">
                    {[
                      { title: "À vista (PIX/TED)", desc: "5% de desconto no setup." },
                      { title: "Entrada + 4 boletos", desc: "Parcelamento do setup em 5 pagamentos mensais." },
                      { title: "Até 3x sem juros (cartão corporativo)", desc: "Parcelamento do setup com processamento financeiro." },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        <div className="text-sm text-slate-600 mt-1">{item.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-prime-accent/30 bg-prime-accent/10 p-4 text-sm text-prime">
                    Mensalidade inicia 30 dias após o Go-Live. Pagamento via boleto mensal ou PIX recorrente.
                  </div>

                  <div className="text-xs text-slate-500 leading-relaxed">
                    Valores incluem infraestrutura (servidores e banco de dados), suporte, backups e manutenção evolutiva do ecossistema durante a vigência do contrato.
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>

          {/* Validity Countdown - Pricing Section */}
          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <ProposalCountdown variant="pricing" />
          </motion.div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <FAQAccordion />

      {/* CTA FINAL - CRONOGRAMA */}
      <section className="py-16 md:py-20 bg-white" id="cronograma">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Cronograma de Execução</h2>
            <p className="text-slate-600 mt-4">Próximos passos após a aprovação.</p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { step: 1, title: "Kick-off", desc: "Reunião de alinhamento e acessos" },
              { step: 2, title: "Desenvolvimento", desc: "Configuração dos fluxos e integrações" },
              { step: 3, title: "Validação", desc: "Testes assistidos com a equipe" },
              { step: 4, title: "Go-Live", desc: "Virada de chave oficial" },
            ].map((s) => (
              <MotionCard
                key={s.step}
                variants={fadeInUp}
                isPressable
                className="bg-slate-50 border border-slate-100 hover:border-prime-accent/50 hover:shadow-lg transition-all text-left"
                onPress={() => setModal({ type: "phases", phase: s.step as 1 | 2 | 3 | 4 })}
              >
                <CardBody className="p-4">
                  <Chip size="sm" variant="flat" color="primary" className="mb-2">
                    Fase 0{s.step}
                  </Chip>
                  <h4 className="font-bold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-500 mt-2">{s.desc}</p>
                  <span className="text-xs text-prime mt-3 block font-medium flex items-center gap-1">
                    Ver detalhes <ChevronRight className="w-3 h-3" />
                  </span>
                </CardBody>
              </MotionCard>
            ))}
          </motion.div>

          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-sm text-slate-500">
              Dúvidas técnicas? <Link href="#" className="text-prime underline font-medium">Fale com o especialista</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs">
        <div className="mx-auto max-w-7xl px-4">
          <p>&copy; 2025 Convert.AI - Tecnologia para Clínicas.</p>
        </div>
      </footer>

      {/* MODALS RENDERER */}
      <Modal open={modal?.type === "solution"} onClose={() => setModal(null)} title={(modal && modal.type === "solution" && modal.title) || "Fluxo"} scrollContent={false} size="fullscreen">
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
      <Modal open={modal?.type === "crm"} onClose={() => setModal(null)} title="CRM Integrado" size="fullscreen" scrollContent={false}> <CRMModalLazy /> </Modal>
      <Modal open={modal?.type === "dashboard"} onClose={() => setModal(null)} title="Painel Executivo" size="fullscreen" scrollContent={false}> <DashboardModalLazy /> </Modal>
      <Modal open={modal?.type === "phases"} onClose={() => setModal(null)} title={`Fase ${modal?.type === "phases" ? modal.phase : 1}: Detalhamento`} size="md"> <PhaseDetailModalLazy phase={modal?.type === "phases" ? modal.phase : 1} /> </Modal>
      <Modal open={modal?.type === "conquistas"} onClose={() => setModal(null)} title="Ganhos Operacionais"> <ConquistasModalLazy /> </Modal>
      <Modal open={modal?.type === "inteligencia"} onClose={() => setModal(null)} title="Inteligência de Dados"> <InteligenciaModalLazy /> </Modal>
      <Modal open={modal?.type === "insights"} onClose={() => setModal(null)} title="Insights de Negócio"> <InsightsModalLazy /> </Modal>
      <Modal open={modal?.type === "relatorios"} onClose={() => setModal(null)} title="Relatórios Gerenciais"> <RelatoriosModalLazy /> </Modal>
      <Modal open={modal?.type === "etapa"} onClose={() => setModal(null)} title={modal?.type === "etapa" ? `Etapa ${modal.etapa} - ${getEtapaTitle(modal.etapa)}` : "Etapa"} size="md"> <EtapaModalLazy etapa={modal?.type === "etapa" ? modal.etapa : 1} /> </Modal>
      <Modal open={modal?.type === "benefits"} onClose={() => setModal(null)} title="Benefícios Tangíveis"> <SolutionBenefitsModalLazy solution={modal?.type === "benefits" ? modal.solution : "agendamento"} /> </Modal>
      <Modal open={modal?.type === "costs"} onClose={() => setModal(null)} title="Redução de Custos" titleAlign="center"> <CostReductionModalLazy /> </Modal>
      <Modal open={modal?.type === "payback"} onClose={() => setModal(null)} title="Viabilidade do Ecossistema" titleAlign="center"> <PaybackModalLazy /> </Modal>
    </div>
  );
}
