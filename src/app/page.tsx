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
  CardFooter,
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Divider,
} from "@heroui/react";
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
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Modal from "./components/Modal";
import { type FlowKind } from "./components/FlowDiagram";

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

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#041e42] text-white py-20 md:py-28" id="hero">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-prime-accent/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
                  base: "bg-emerald-500/10 border border-emerald-500/30",
                  content: "text-emerald-400 text-xs font-bold uppercase tracking-wider",
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
              Transforme 35.000 interações mensais em resultados. Nossa IA centraliza o atendimento, qualifica 15.000 leads/mês e integra sua agenda ERP para máxima conversão.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <div className="flex flex-col border-l-2 border-prime-accent pl-4">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Cliente</span>
                <span className="font-semibold text-white">{preparedFor}</span>
              </div>
              <div className="flex flex-col border-l-2 border-slate-600 pl-4">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Validade</span>
                <span className="font-semibold text-white">{proposalDate}</span>
              </div>
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
                  "Atendimento imediato (Tempo de resposta < 1min)",
                  "Qualificação automática de convênios",
                  "Redução da taxa de No-Show",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <CheckCircle2 className="text-emerald-400 h-5 w-5 flex-shrink-0" />
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

          <motion.div
            className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Sparkles, color: "blue", title: "1. SDR & Agendamento", desc: "Recepciona o paciente, identifica convênio ou particular e realiza o agendamento integrado.", kind: "agendamento" as FlowKind, flowTitle: "SDR & Agendamento" },
              { icon: MessageSquare, color: "emerald", title: "2. FAQ Inteligente", desc: "Base de conhecimento treinada para tirar dúvidas de preparo, valores e localização instantaneamente.", kind: "faq" as FlowKind, flowTitle: "FAQ Educacional" },
              { icon: BellRing, color: "purple", title: "3. Gestão de No-Show", desc: "Automação de confirmações (D-2, D-1) e gestão ativa de fila de espera para preencher lacunas.", kind: "triagem-noshow" as FlowKind, flowTitle: "Anti No-Show" },
              { icon: FileBarChart, color: "amber", title: "4. Pesquisa & Satisfação", desc: "Envia pesquisa de satisfação, analisa sentimentos e direciona promotores para o Google.", kind: null, flowTitle: "" },
            ].map((item, idx) => (
              <MotionCard
                key={idx}
                variants={fadeInUp}
                isPressable={!!item.kind}
                className="bg-white shadow-sm border border-slate-200 hover:border-prime hover:shadow-lg transition-all cursor-pointer group"
                onPress={item.kind ? () => setModal({ type: "solution", kind: item.kind!, title: item.flowTitle }) : undefined}
              >
                <CardHeader className="flex justify-between items-start pb-2">
                  <div className={`w-10 h-10 bg-${item.color}-50 text-${item.color}-600 rounded-xl flex items-center justify-center`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  {item.kind && (
                    <span className="text-xs font-bold text-prime-accent uppercase tracking-wider group-hover:underline flex items-center gap-1">
                      Ver Fluxo <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </CardHeader>
                <CardBody className="pt-2">
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{item.desc}</p>
                </CardBody>
              </MotionCard>
            ))}
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
            className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { value: "+40%", label: "Conversão de Leads", desc: "Resposta imediata aumenta drásticamente o aproveitamento.", color: "emerald" },
              { value: "-60%", label: "Taxa de No-Show", desc: "Confirmações multicanal e fila de espera ativa.", color: "blue" },
              { value: "24h", label: "Operação Comercial", desc: "Captura de pacientes noturnos e finais de semana.", color: "indigo" },
              { value: "100%", label: "Visibilidade", desc: "Dados estruturados para tomada de decisão.", color: "slate" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className={`p-6 bg-${item.color}-50 rounded-2xl border border-${item.color}-100 hover:shadow-lg transition-shadow`}
              >
                <div className={`text-4xl font-bold text-${item.color}-600 mb-2`}>{item.value}</div>
                <div className={`font-semibold text-${item.color}-900`}>{item.label}</div>
                <p className={`text-xs text-${item.color}-800 mt-2`}>{item.desc}</p>
              </motion.div>
            ))}
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
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
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
                      <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
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
            <h2 className="section-title">Proposta Comercial</h2>
            <p className="text-slate-600 mt-3">Escolha um módulo individual ou contrate o ecossistema completo com ancoragem de preço.</p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Card 1: Agente FAQ */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-prime-accent/50 hover:shadow-lg transition-all flex flex-col min-h-[420px]"
            >
              <div className="p-6 pb-4">
                <h3 className="text-lg font-bold text-prime">Agente FAQ + Informações Gerais</h3>
              </div>
              <div className="px-6 pb-4 flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Setup</div>
                  <div className="text-2xl font-bold text-slate-900">R$ 15.000</div>
                  <div className="text-xs text-slate-400">pagamento único</div>
                </div>
                <div className="h-px bg-slate-200 my-4" />
                <div className="mb-5">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Mensalidade</div>
                  <div className="text-xl font-bold text-slate-900">R$ 2.000<span className="text-sm font-normal text-slate-500">/mês</span></div>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Desenvolvimento e Suporte</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Sistema de OCR</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Base de Conhecimento</li>
                </ul>
              </div>
              <div className="p-6 pt-4 mt-auto">
                <Button
                  variant="bordered"
                  className="w-full font-semibold"
                  onPress={() => setModal({ type: "benefits", solution: "faq" })}
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  Ver Detalhes
                </Button>
              </div>
            </motion.div>

            {/* Card 2: Agendamento (Destaque) */}
            <motion.div
              variants={scaleIn}
              className="bg-white rounded-2xl border-2 border-prime shadow-xl relative flex flex-col min-h-[420px] lg:-translate-y-3"
            >
              <Chip
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                color="primary"
                variant="solid"
                classNames={{ base: "bg-prime", content: "text-white font-bold text-[10px] uppercase tracking-wide px-3" }}
              >
                Mais Popular
              </Chip>
              <div className="p-6 pb-4 pt-8">
                <h3 className="text-lg font-bold text-prime">Agendamento Inteligente</h3>
              </div>
              <div className="px-6 pb-4 flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Setup</div>
                  <div className="text-3xl font-extrabold text-slate-900">R$ 45.000</div>
                  <div className="text-xs text-slate-400">pagamento único</div>
                </div>
                <div className="h-px bg-slate-200 my-4" />
                <div className="mb-5">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Mensalidade</div>
                  <div className="text-xl font-bold text-slate-900">R$ 5.000<span className="text-sm font-normal text-slate-500">/mês</span></div>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Qualificação e Agendamento</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Desenvolvimento Personalizado</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Implementação e Treinamentos</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Suporte + Otimizações</li>
                </ul>
              </div>
              <div className="p-6 pt-4 mt-auto">
                <Button
                  color="primary"
                  className="w-full font-semibold bg-prime"
                  onPress={() => setModal({ type: "benefits", solution: "agendamento" })}
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  Ver Detalhes
                </Button>
              </div>
            </motion.div>

            {/* Card 3: Pré-triagem */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-prime-accent/50 hover:shadow-lg transition-all flex flex-col min-h-[420px]"
            >
              <div className="p-6 pb-4">
                <h3 className="text-lg font-bold text-prime">Pré-triagem + Anti No-Show</h3>
              </div>
              <div className="px-6 pb-4 flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Setup</div>
                  <div className="text-2xl font-bold text-slate-900">R$ 15.000</div>
                  <div className="text-xs text-slate-400">pagamento único</div>
                </div>
                <div className="h-px bg-slate-200 my-4" />
                <div className="mb-5">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Mensalidade</div>
                  <div className="text-xl font-bold text-slate-900">R$ 2.000<span className="text-sm font-normal text-slate-500">/mês</span></div>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Desenvolvimento e Suporte</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Base de Conhecimento</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Agente ativo (inicia conversas)</li>
                </ul>
              </div>
              <div className="p-6 pt-4 mt-auto">
                <Button
                  variant="bordered"
                  className="w-full font-semibold"
                  onPress={() => setModal({ type: "benefits", solution: "triagem-noshow" })}
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  Ver Detalhes
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Card Pós-venda */}
          <motion.div
            className="mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Card className="bg-white border border-slate-200 shadow-sm hover:border-prime-accent/50 hover:shadow-lg transition-all">
              <CardBody className="p-5 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-prime mb-4">Agente Pós-venda</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Setup</div>
                        <div className="text-2xl font-bold text-slate-900">R$ 15.000</div>
                        <div className="text-[10px] text-slate-400">pagamento único</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Mensalidade</div>
                        <div className="text-lg font-bold text-slate-900">R$ 2.000<span className="text-sm font-normal text-slate-500">/mês</span></div>
                      </div>
                    </div>
                  </div>
                  <Divider orientation="vertical" className="hidden lg:block h-20" />
                  <Divider className="lg:hidden" />
                  <div className="flex-1">
                    <ul className="space-y-1.5 text-sm text-slate-600 mb-4">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Pesquisa de satisfação automatizada</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Análise de Sentimentos com IA</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Redirecionamento para Google</li>
                    </ul>
                    <Button
                      variant="bordered"
                      className="font-semibold"
                      onPress={() => setModal({ type: "benefits", solution: "pesquisa" })}
                      endContent={<ArrowRight className="w-4 h-4" />}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Ecossistema Full */}
          <motion.div
            className="mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            <Card className="bg-slate-900 text-white overflow-hidden relative group">
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-prime-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <CardBody className="p-8 md:p-12 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Chip
                      startContent={<Sparkles className="h-3 w-3" />}
                      variant="flat"
                      classNames={{
                        base: "bg-prime-accent/20 border border-prime-accent/30",
                        content: "text-prime-accent text-xs font-bold uppercase tracking-wider",
                      }}
                    >
                      Oferta Especial
                    </Chip>
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4 mt-4">Ecossistema Full</h3>
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
                        "Integração ERP Completa",
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

                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardBody className="p-8 space-y-6">
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Investimento Total (Setup)</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-lg text-slate-500 line-through">R$ 90.000</span>
                          <span className="text-4xl font-extrabold text-white">R$ 70.000</span>
                        </div>
                        <Chip color="success" variant="flat" size="sm" className="mt-2">
                          Economia de R$ 20.000 no setup
                        </Chip>
                      </div>

                      <Divider className="bg-white/10" />

                      <div>
                        <div className="text-sm text-slate-400 mb-1">Mensalidade (Recorrência)</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-lg text-slate-500 line-through">R$ 11.000/mês</span>
                          <span className="text-3xl font-bold text-white">R$ 7.000<span className="text-lg font-normal text-slate-400">/mês</span></span>
                        </div>
                        <Chip color="success" variant="flat" size="sm" className="mt-2">
                          Economia de R$ 4.000/mês
                        </Chip>
                      </div>

                      <MotionButton
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-prime-accent text-prime-dark font-bold py-6 shadow-lg"
                        size="lg"
                        onPress={() => setModal({ type: "payback" })}
                      >
                        Projeto com payback em ~1 mês
                      </MotionButton>
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL - CRONOGRAMA */}
      <section className="py-16 md:py-20 bg-white" id="cta">
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
      <Modal open={modal?.type === "crm"} onClose={() => setModal(null)} title="CRM Integrado" size="fullscreen"> <CRMModalLazy /> </Modal>
      <Modal open={modal?.type === "dashboard"} onClose={() => setModal(null)} title="Painel Executivo" size="fullscreen"> <DashboardModalLazy /> </Modal>
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
