"use client";

import { MessageSquare, Filter, Calendar, UserCheck } from "lucide-react";

type Etapa = 1 | 2 | 3 | 4;

const etapaConfig = {
  1: {
    title: "Recepção Digital",
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    desc: "Orquestração inicial e identificação de intenção.",
    details: [
      "Captura imediata do lead (SLA < 5s)",
      "Identificação de paciente recorrente vs novo",
      "Análise de sentimento (Urgência detectada)"
    ]
  },
  2: {
    title: "SDR & Qualificação",
    icon: <Filter className="w-6 h-6 text-white" />,
    desc: "Filtro comercial e validação de elegibilidade.",
    details: [
      "Validação automática de convênio ativo",
      "Coleta estruturada de dados (CPF, Carteirinha)",
      "Roteamento para equipe específica se necessário"
    ]
  },
  3: {
    title: "Agendamento Inteligente",
    icon: <Calendar className="w-6 h-6 text-white" />,
    desc: "Integração direta com slots livres no ERP.",
    details: [
      "Oferta de horários baseada em regras de negócio",
      "Gestão de conflitos de agenda em tempo real",
      "Envio imediato de orientações de preparo"
    ]
  },
  4: {
    title: "Gestão de Comparecimento",
    icon: <UserCheck className="w-6 h-6 text-white" />,
    desc: "Garantia da presença e redução de ociosidade.",
    details: [
      "Confirmação multicanal (WhatsApp/SMS) D-2 e D-1",
      "Reagendamento automático em caso de negativa",
      "Acionamento automático da fila de espera"
    ]
  }
};

export default function EtapaModalContent({ etapa }: { etapa: Etapa }) {
  const data = etapaConfig[etapa];

  return (
    <div className="p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-prime rounded-xl shadow-lg shadow-prime/20">
          {data.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
          <p className="text-slate-600 text-sm mt-1">{data.desc}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Funcionalidades Chave</h4>
        <ul className="space-y-3">
          {data.details.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-slate-800 bg-white p-3 rounded border border-slate-200 shadow-sm">
              <span className="w-1.5 h-1.5 bg-prime-accent rounded-full shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}