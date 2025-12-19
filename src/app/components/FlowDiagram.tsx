"use client";

import { useCallback, useEffect, useMemo, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type Connection,
  type NodeProps,
  Position,
  Handle,
  MarkerType,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  MessageSquare,
  Bot,
  HelpCircle,
  Calendar,
  CreditCard,
  UserCheck,
  Database,
  CheckCircle2,
  User,
  Bell,
  Clock,
  RefreshCw,
  XCircle,
  Users,
  FileText,
  MapPin,
  Stethoscope,
  DollarSign,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export type FlowKind = "agendamento" | "triagem-noshow" | "faq";

// Custom Node Types
type CustomNodeData = {
  label: string;
  icon?: string;
  description?: string;
  variant?: "input" | "primary" | "decision" | "output" | "default";
  color?: string;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Bot,
  HelpCircle,
  Calendar,
  CreditCard,
  UserCheck,
  Database,
  CheckCircle2,
  User,
  Bell,
  Clock,
  RefreshCw,
  XCircle,
  Users,
  FileText,
  MapPin,
  Stethoscope,
  DollarSign,
  Sparkles,
  ArrowRight,
};

const variantStyles: Record<string, { bg: string; border: string; iconBg: string; text: string }> = {
  input: {
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/80",
    border: "border-emerald-300",
    iconBg: "bg-emerald-500",
    text: "text-emerald-900",
  },
  primary: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100/80",
    border: "border-blue-400",
    iconBg: "bg-blue-600",
    text: "text-blue-900",
  },
  decision: {
    bg: "bg-gradient-to-br from-amber-50 to-amber-100/80",
    border: "border-amber-400",
    iconBg: "bg-amber-500",
    text: "text-amber-900",
  },
  output: {
    bg: "bg-gradient-to-br from-purple-50 to-purple-100/80",
    border: "border-purple-400",
    iconBg: "bg-purple-600",
    text: "text-purple-900",
  },
  default: {
    bg: "bg-gradient-to-br from-slate-50 to-slate-100/80",
    border: "border-slate-300",
    iconBg: "bg-slate-500",
    text: "text-slate-800",
  },
};

const CustomNode = memo(({ data, isConnectable }: NodeProps<CustomNodeData>) => {
  const variant = data.variant || "default";
  const styles = variantStyles[variant];
  const IconComponent = data.icon ? iconMap[data.icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative px-4 py-3 rounded-xl border-2 shadow-lg backdrop-blur-sm
        min-w-[180px] max-w-[220px]
        ${styles.bg} ${styles.border}
        hover:shadow-xl hover:scale-[1.02] transition-all duration-200
        cursor-pointer group
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white"
      />

      <div className="flex items-start gap-3">
        {IconComponent && (
          <div className={`w-8 h-8 rounded-lg ${styles.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
            <IconComponent className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-semibold leading-tight ${styles.text}`}>
            {data.label}
          </div>
          {data.description && (
            <div className="text-xs text-slate-500 mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity">
              {data.description}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white"
      />

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity ${styles.iconBg} blur-xl -z-10`} />
    </motion.div>
  );
});

CustomNode.displayName = "CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

function nodesAndEdges(kind: FlowKind): { nodes: Node<CustomNodeData>[]; edges: Edge[] } {
  const edgeDefaults = {
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 2, stroke: "#64748b" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  };

  switch (kind) {
    case "agendamento": {
      const nodes: Node<CustomNodeData>[] = [
        {
          id: "lead",
          position: { x: 0, y: 200 },
          type: "custom",
          data: {
            label: "Lead chega",
            icon: "MessageSquare",
            description: "Via WhatsApp ou Landing Page",
            variant: "input",
          },
        },
        {
          id: "ia",
          position: { x: 280, y: 200 },
          type: "custom",
          data: {
            label: "Agente SDR IA",
            icon: "Bot",
            description: "Primeiro contato automatizado",
            variant: "primary",
          },
        },
        {
          id: "opcao",
          position: { x: 560, y: 200 },
          type: "custom",
          data: {
            label: "Qual a necessidade?",
            icon: "HelpCircle",
            description: "Identificação da intenção",
            variant: "decision",
          },
        },
        {
          id: "duvidas",
          position: { x: 840, y: 60 },
          type: "custom",
          data: {
            label: "FAQ Inteligente",
            icon: "FileText",
            description: "Subfluxo de dúvidas",
            variant: "output",
          },
        },
        {
          id: "consulta",
          position: { x: 840, y: 340 },
          type: "custom",
          data: {
            label: "Consulta / Procedimento",
            icon: "Stethoscope",
            description: "Interesse em agendamento",
            variant: "default",
          },
        },
        {
          id: "plano",
          position: { x: 1120, y: 180 },
          type: "custom",
          data: {
            label: "Plano de Saúde",
            icon: "CreditCard",
            description: "Verifica cobertura",
            variant: "default",
          },
        },
        {
          id: "particular",
          position: { x: 1120, y: 360 },
          type: "custom",
          data: {
            label: "Particular",
            icon: "DollarSign",
            description: "Pagamento direto",
            variant: "default",
          },
        },
        {
          id: "qualif",
          position: { x: 1400, y: 270 },
          type: "custom",
          data: {
            label: "Qualificação",
            icon: "UserCheck",
            description: "Coleta dados do paciente",
            variant: "primary",
          },
        },
        {
          id: "disp",
          position: { x: 1680, y: 270 },
          type: "custom",
          data: {
            label: "Agenda Unificada",
            icon: "Calendar",
            description: "ERP + Particular integrados",
            variant: "default",
          },
        },
        {
          id: "agend",
          position: { x: 1960, y: 200 },
          type: "custom",
          data: {
            label: "Agendamento + CRM",
            icon: "CheckCircle2",
            description: "Registro confirmado",
            variant: "output",
          },
        },
        {
          id: "hitl",
          position: { x: 1960, y: 360 },
          type: "custom",
          data: {
            label: "Escalar p/ Humano",
            icon: "User",
            description: "Casos especiais",
            variant: "output",
          },
        },
      ];

      const edges: Edge[] = [
        { id: "a1", source: "lead", target: "ia", ...edgeDefaults },
        { id: "a2", source: "ia", target: "opcao", ...edgeDefaults },
        { id: "a3", source: "opcao", target: "duvidas", ...edgeDefaults, label: "Dúvidas", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#fef3c7", fillOpacity: 0.9 } },
        { id: "a4", source: "opcao", target: "consulta", ...edgeDefaults, label: "Agendar", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#dcfce7", fillOpacity: 0.9 } },
        { id: "a5", source: "consulta", target: "plano", ...edgeDefaults },
        { id: "a6", source: "consulta", target: "particular", ...edgeDefaults },
        { id: "a7", source: "plano", target: "qualif", ...edgeDefaults },
        { id: "a8", source: "particular", target: "qualif", ...edgeDefaults },
        { id: "a9", source: "qualif", target: "disp", ...edgeDefaults },
        { id: "a10", source: "disp", target: "agend", ...edgeDefaults, label: "Sucesso", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#dcfce7", fillOpacity: 0.9 } },
        { id: "a11", source: "disp", target: "hitl", ...edgeDefaults, label: "Exceção", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#fef3c7", fillOpacity: 0.9 } },
      ];

      return { nodes, edges };
    }

    case "triagem-noshow": {
      const nodes: Node<CustomNodeData>[] = [
        {
          id: "agenda",
          position: { x: 0, y: 200 },
          type: "custom",
          data: {
            label: "Agenda de Consultas",
            icon: "Calendar",
            description: "Próximas 48h",
            variant: "input",
          },
        },
        {
          id: "d2",
          position: { x: 280, y: 100 },
          type: "custom",
          data: {
            label: "Lembrete D-2",
            icon: "Bell",
            description: "2 dias antes",
            variant: "default",
          },
        },
        {
          id: "d1",
          position: { x: 280, y: 300 },
          type: "custom",
          data: {
            label: "Lembrete D-1",
            icon: "Clock",
            description: "1 dia antes",
            variant: "default",
          },
        },
        {
          id: "confirma",
          position: { x: 560, y: 200 },
          type: "custom",
          data: {
            label: "Confirma presença?",
            icon: "HelpCircle",
            description: "Aguardando resposta",
            variant: "decision",
          },
        },
        {
          id: "ok",
          position: { x: 840, y: 60 },
          type: "custom",
          data: {
            label: "Confirmado",
            icon: "CheckCircle2",
            description: "Paciente confirmou",
            variant: "output",
          },
        },
        {
          id: "reagendar",
          position: { x: 840, y: 200 },
          type: "custom",
          data: {
            label: "Reagendar",
            icon: "RefreshCw",
            description: "Nova data disponível",
            variant: "primary",
          },
        },
        {
          id: "cancel",
          position: { x: 840, y: 340 },
          type: "custom",
          data: {
            label: "Cancelamento",
            icon: "XCircle",
            description: "Detectado ou solicitado",
            variant: "default",
          },
        },
        {
          id: "fila",
          position: { x: 1120, y: 340 },
          type: "custom",
          data: {
            label: "Fila de Espera",
            icon: "Users",
            description: "Notificar interessados",
            variant: "output",
          },
        },
        {
          id: "preenche",
          position: { x: 1400, y: 340 },
          type: "custom",
          data: {
            label: "Horário Preenchido",
            icon: "Sparkles",
            description: "Vaga ocupada",
            variant: "output",
          },
        },
      ];

      const edges: Edge[] = [
        { id: "n1", source: "agenda", target: "d2", ...edgeDefaults },
        { id: "n2", source: "agenda", target: "d1", ...edgeDefaults },
        { id: "n3", source: "d2", target: "confirma", ...edgeDefaults },
        { id: "n4", source: "d1", target: "confirma", ...edgeDefaults },
        { id: "n5", source: "confirma", target: "ok", ...edgeDefaults, label: "Sim", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#dcfce7", fillOpacity: 0.9 } },
        { id: "n6", source: "confirma", target: "reagendar", ...edgeDefaults, label: "Remarcar", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#dbeafe", fillOpacity: 0.9 } },
        { id: "n7", source: "confirma", target: "cancel", ...edgeDefaults, label: "Não/Sem resposta", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#fee2e2", fillOpacity: 0.9 } },
        { id: "n8", source: "cancel", target: "fila", ...edgeDefaults },
        { id: "n9", source: "fila", target: "preenche", ...edgeDefaults, label: "Match!", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#f3e8ff", fillOpacity: 0.9 } },
      ];

      return { nodes, edges };
    }

    case "faq": {
      const nodes: Node<CustomNodeData>[] = [
        {
          id: "pac",
          position: { x: 0, y: 220 },
          type: "custom",
          data: {
            label: "Paciente",
            icon: "User",
            description: "Inicia contato",
            variant: "input",
          },
        },
        {
          id: "canal",
          position: { x: 280, y: 220 },
          type: "custom",
          data: {
            label: "WhatsApp",
            icon: "MessageSquare",
            description: "Canal de entrada",
            variant: "default",
          },
        },
        {
          id: "faq",
          position: { x: 560, y: 220 },
          type: "custom",
          data: {
            label: "FAQ Inteligente IA",
            icon: "Bot",
            description: "Base de conhecimento",
            variant: "primary",
          },
        },
        {
          id: "proced",
          position: { x: 880, y: 0 },
          type: "custom",
          data: {
            label: "Procedimentos",
            icon: "Stethoscope",
            description: "Como funciona cada exame",
            variant: "output",
          },
        },
        {
          id: "preparo",
          position: { x: 880, y: 110 },
          type: "custom",
          data: {
            label: "Preparo",
            icon: "FileText",
            description: "Instruções pré-exame",
            variant: "output",
          },
        },
        {
          id: "valores",
          position: { x: 880, y: 220 },
          type: "custom",
          data: {
            label: "Valores / Convênios",
            icon: "DollarSign",
            description: "Tabela de preços",
            variant: "output",
          },
        },
        {
          id: "sobre",
          position: { x: 880, y: 330 },
          type: "custom",
          data: {
            label: "Sobre o Médico",
            icon: "UserCheck",
            description: "Currículo e especialidades",
            variant: "output",
          },
        },
        {
          id: "local",
          position: { x: 880, y: 440 },
          type: "custom",
          data: {
            label: "Localização",
            icon: "MapPin",
            description: "Endereço e horários",
            variant: "output",
          },
        },
        {
          id: "escalonamento",
          position: { x: 1200, y: 220 },
          type: "custom",
          data: {
            label: "Escalar p/ Humano",
            icon: "User",
            description: "Dúvida complexa",
            variant: "decision",
          },
        },
      ];

      const edges: Edge[] = [
        { id: "f1", source: "pac", target: "canal", ...edgeDefaults },
        { id: "f2", source: "canal", target: "faq", ...edgeDefaults },
        { id: "f3", source: "faq", target: "proced", ...edgeDefaults },
        { id: "f4", source: "faq", target: "preparo", ...edgeDefaults },
        { id: "f5", source: "faq", target: "valores", ...edgeDefaults },
        { id: "f6", source: "faq", target: "sobre", ...edgeDefaults },
        { id: "f7", source: "faq", target: "local", ...edgeDefaults },
        { id: "f8", source: "faq", target: "escalonamento", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: "#f59e0b", strokeDasharray: "5,5" }, label: "Se necessário", labelStyle: { fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: "#fef3c7", fillOpacity: 0.9 } },
      ];

      return { nodes, edges };
    }
  }
}

const flowDescriptions: Record<FlowKind, { title: string; description: string }> = {
  agendamento: {
    title: "Fluxo de SDR & Agendamento",
    description: "O agente recebe o lead, identifica a necessidade, qualifica convênio/particular e realiza o agendamento automaticamente.",
  },
  "triagem-noshow": {
    title: "Fluxo Anti No-Show",
    description: "Sistema de confirmação D-2/D-1 com gestão inteligente de fila de espera para preencher cancelamentos.",
  },
  faq: {
    title: "FAQ Inteligente",
    description: "Base de conhecimento treinada para responder dúvidas sobre procedimentos, preparo, valores e localização.",
  },
};

export default function FlowDiagram({ kind }: { kind: FlowKind }) {
  const shouldReduceMotion = useReducedMotion();
  const { nodes: initialNodesRaw, edges: initialEdgesRaw } = useMemo(() => nodesAndEdges(kind), [kind]);
  const initialEdges = useMemo(
    () => initialEdgesRaw.map((edge) => ({ ...edge, animated: shouldReduceMotion ? false : edge.animated })),
    [initialEdgesRaw, shouldReduceMotion]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesRaw);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodesRaw);
    setEdges(initialEdges);
  }, [initialNodesRaw, initialEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: shouldReduceMotion ? false : true }, eds)),
    [setEdges, shouldReduceMotion]
  );

  const flowInfo = flowDescriptions[kind];

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 left-4 z-20 pointer-events-none"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-lg px-5 py-4 max-w-sm">
          <h3 className="text-base font-bold text-prime mb-1">{flowInfo.title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{flowInfo.description}</p>
        </div>
      </motion.div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, minZoom: 0.5, maxZoom: 1.5 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
        <MiniMap
          pannable
          zoomable
          position="top-right"
          nodeColor={(node) => {
            const variant = (node.data as CustomNodeData)?.variant || "default";
            const colors: Record<string, string> = {
              input: "#10b981",
              primary: "#3b82f6",
              decision: "#f59e0b",
              output: "#a855f7",
              default: "#64748b",
            };
            return colors[variant];
          }}
          maskColor="rgba(241, 245, 249, 0.8)"
          className="!bg-white/80 !rounded-lg !border !border-slate-200 !shadow-md !top-4 !right-4"
          style={{ width: 150, height: 100 }}
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
          className="!bg-white/90 !rounded-lg !border !border-slate-200 !shadow-md [&>button]:!bg-white [&>button]:!border-slate-200 [&>button:hover]:!bg-slate-50 !left-4 !bottom-4"
        />
      </ReactFlow>

      {/* Legend - posicionado acima dos Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-28 left-4 z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-lg px-3 py-2.5">
          <div className="text-[10px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Legenda</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span className="text-slate-600">Entrada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-blue-600" />
              <span className="text-slate-600">IA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-amber-500" />
              <span className="text-slate-600">Decisão</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-purple-600" />
              <span className="text-slate-600">Saída</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Instructions - posicionado no canto inferior direito */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-4 right-4 z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-lg px-3 py-2.5">
          <div className="text-[10px] font-semibold text-prime mb-1.5 flex items-center gap-1 uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5" />
            Interação
          </div>
          <div className="text-[11px] text-slate-600 space-y-0.5">
            <div>• Arraste nós para reorganizar</div>
            <div>• Scroll para zoom</div>
            <div>• Arraste o fundo para navegar</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
