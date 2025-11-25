"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock3, Filter } from "lucide-react";

type Lead = {
  id: number;
  nome: string;
  especialidade: string;
  valor: number;
  origem?: string;
  tempo?: string;
  horario?: string;
  status?: string;
  proximoPasso?: string;
  prioridade?: "alta" | "media" | "baixa";
  anotacao?: string;
  tag?: string;
};

const prioridadeClasses = {
  alta: "bg-rose-100 text-rose-800",
  media: "bg-amber-100 text-amber-800",
  baixa: "bg-emerald-100 text-emerald-800",
};

export default function CRMModalContent() {
  const [funil, setFunil] = useState<"principal" | "followup" | "agendados">("principal");

  const pacientes = {
    principal: {
      novo: [
        {
          id: 1,
          nome: "Maria Silva",
          especialidade: "Lesão LCA",
          valor: 450,
          origem: "WhatsApp",
          tempo: "2h",
          proximoPasso: "Enviar pré-consulta + questionário",
          prioridade: "alta",
          tag: "Cirurgia",
          anotacao: "Lead chegou pelo fluxo 24/7; aguardando confirmação de disponibilidade para amanhã.",
        },
        {
          id: 2,
          nome: "João Santos",
          especialidade: "Dor no Joelho",
          valor: 380,
          origem: "Instagram",
          tempo: "5h",
          proximoPasso: "Validar convênio no ERP",
          prioridade: "media",
          tag: "Consulta",
        },
        {
          id: 3,
          nome: "Ana Costa",
          especialidade: "Menisco",
          valor: 320,
          origem: "Google",
          tempo: "1d",
          proximoPasso: "Oferecer horário noturno",
          prioridade: "baixa",
          tag: "Revisão",
        },
      ],
      qualificado: [
        {
          id: 4,
          nome: "Pedro Oliveira",
          especialidade: "Artroplastia",
          valor: 3500,
          origem: "Indicação",
          tempo: "3h",
          proximoPasso: "Liberar estimativa cirúrgica",
          prioridade: "alta",
          tag: "Cirurgia",
          anotacao: "Elegível: convênio validado, exame pré-op recebido.",
        },
        {
          id: 5,
          nome: "Carla Mendes",
          especialidade: "Artrose",
          valor: 850,
          origem: "WhatsApp",
          tempo: "1d",
          proximoPasso: "Enviar vídeo educativo + CTA",
          prioridade: "media",
          tag: "Consulta",
        },
        {
          id: 6,
          nome: "Lucas Ferreira",
          especialidade: "Células‑Tronco",
          valor: 420,
          origem: "Facebook",
          tempo: "2d",
          proximoPasso: "Confirmar preparo pré-exame",
          prioridade: "baixa",
          tag: "Terapia",
        },
      ],
      agendado: [
        {
          id: 7,
          nome: "Beatriz Lima",
          especialidade: "Artroscopia",
          valor: 520,
          origem: "Instagram",
          tempo: "4h",
          horario: "Qua 11:30",
          proximoPasso: "Ativar lembretes anti no-show",
          prioridade: "media",
          tag: "Cirurgia",
        },
        {
          id: 8,
          nome: "Rafael Costa",
          especialidade: "Lesão LCA",
          valor: 680,
          origem: "WhatsApp",
          tempo: "1d",
          horario: "Qui 17:00",
          proximoPasso: "Confirmar convênio + exames",
          prioridade: "alta",
          tag: "Consulta",
        },
      ],
      confirmado: [
        {
          id: 9,
          nome: "Julia Alves",
          especialidade: "Meniscectomia",
          valor: 390,
          origem: "Indicação",
          tempo: "6h",
          horario: "Hoje • 16:30",
          status: "Confirmado",
          proximoPasso: "Checklist pré-op enviado",
          prioridade: "media",
          tag: "Cirurgia",
        },
        {
          id: 10,
          nome: "Marcos Rocha",
          especialidade: "Reconstrução LCA",
          valor: 2800,
          origem: "Google",
          tempo: "2d",
          horario: "Sex • 10:00",
          status: "Confirmado",
          proximoPasso: "Enviar guia de exames",
          prioridade: "alta",
          tag: "Cirurgia",
          anotacao: "Paciente disposto a antecipar se vaga abrir.",
        },
      ],
    },
    followup: {
      aguardando: [
        {
          id: 11,
          nome: "Fernanda Silva",
          especialidade: "Artrose",
          valor: 750,
          origem: "WhatsApp",
          tempo: "3d",
          proximoPasso: "Nurturing + depoimento de sucesso",
          prioridade: "media",
          tag: "Consulta",
        },
        {
          id: 12,
          nome: "Roberto Lima",
          especialidade: "Dor no Joelho",
          valor: 480,
          origem: "Instagram",
          tempo: "5d",
          proximoPasso: "Reforçar proposta com parcelamento",
          prioridade: "baixa",
          tag: "Revisão",
        },
      ],
      contatado: [
        {
          id: 13,
          nome: "Camila Santos",
          especialidade: "Lesão Meniscal",
          valor: 420,
          origem: "Facebook",
          tempo: "1d",
          proximoPasso: "Confirmar horário com acompanhante",
          prioridade: "media",
          tag: "Consulta",
        },
        {
          id: 14,
          nome: "Diego Costa",
          especialidade: "Ruptura LCA",
          valor: 350,
          origem: "Google",
          tempo: "2d",
          proximoPasso: "Enviar simulação de reabilitação",
          prioridade: "media",
          tag: "Cirurgia",
        },
      ],
      reengajado: [
        {
          id: 15,
          nome: "Patricia Mendes",
          especialidade: "Artroplastia",
          valor: 3200,
          origem: "Indicação",
          tempo: "4d",
          proximoPasso: "Agendar call com especialista",
          prioridade: "alta",
          tag: "Cirurgia",
          anotacao: "Aceitou proposta, aguarda liberação de agenda.",
        },
      ],
      perdido: [
        {
          id: 16,
          nome: "Gustavo Alves",
          especialidade: "Dor no Joelho",
          valor: 680,
          origem: "WhatsApp",
          tempo: "15d",
          proximoPasso: "Reativar com pacote preventivo",
          prioridade: "baixa",
          tag: "Revisão",
        },
      ],
    },
    agendados: {
      hoje: [
        {
          id: 17,
          nome: "Amanda Rocha",
          especialidade: "Condromalácia",
          valor: 390,
          horario: "09:00",
          status: "Confirmado",
          proximoPasso: "Check-in digital enviado",
          prioridade: "media",
          tag: "Consulta",
        },
        {
          id: 18,
          nome: "Felipe Santos",
          especialidade: "Lesão LCA",
          valor: 520,
          horario: "10:30",
          status: "Confirmado",
          proximoPasso: "Reforçar preparo pré-exame",
          prioridade: "alta",
          tag: "Cirurgia",
        },
        {
          id: 19,
          nome: "Isabela Costa",
          especialidade: "Artrose",
          valor: 450,
          horario: "14:00",
          status: "Pendente",
          proximoPasso: "Ligar em 15 min (no-show risco)",
          prioridade: "alta",
          tag: "Consulta",
        },
      ],
      amanha: [
        {
          id: 20,
          nome: "Thiago Lima",
          especialidade: "Artroplastia",
          valor: 2900,
          horario: "08:00",
          status: "Confirmado",
          proximoPasso: "Confirmar acompanhante e jejum",
          prioridade: "alta",
          tag: "Cirurgia",
        },
        {
          id: 21,
          nome: "Larissa Mendes",
          especialidade: "Menisco",
          valor: 420,
          horario: "11:00",
          status: "Confirmado",
          proximoPasso: "Enviar orientações pós-anestesia",
          prioridade: "media",
          tag: "Cirurgia",
        },
      ],
      semana: [
        {
          id: 22,
          nome: "Bruno Oliveira",
          especialidade: "Revisão Pós‑op",
          valor: 680,
          horario: "Qua 15:00",
          status: "Confirmado",
          proximoPasso: "Lembrar exame de imagem",
          prioridade: "baixa",
          tag: "Revisão",
        },
        {
          id: 23,
          nome: "Natalia Silva",
          especialidade: "Condromalácia",
          valor: 350,
          horario: "Qui 09:30",
          status: "Pendente",
          proximoPasso: "Confirmar convênio + carta",
          prioridade: "media",
          tag: "Consulta",
        },
        {
          id: 24,
          nome: "Eduardo Costa",
          especialidade: "Dor no Joelho",
          valor: 480,
          horario: "Sex 16:00",
          status: "Confirmado",
          proximoPasso: "Enviar lembrete anti no-show",
          prioridade: "baixa",
          tag: "Consulta",
        },
      ],
      reagendar: [
        {
          id: 25,
          nome: "Vanessa Santos",
          especialidade: "Artrose",
          valor: 420,
          horario: "Cancelado",
          status: "Reagendar",
          proximoPasso: "Abrir fila de espera prioritária",
          prioridade: "alta",
          tag: "Consulta",
          anotacao: "Cancelou por viagem, aceita horário noturno.",
        },
      ],
    },
  };

  const colunas = {
    principal: [
      { key: "novo", label: "Novo", count: pacientes.principal.novo.length, color: "bg-sky-600" },
      { key: "qualificado", label: "Qualificado", count: pacientes.principal.qualificado.length, color: "bg-indigo-600" },
      { key: "agendado", label: "Agendado", count: pacientes.principal.agendado.length, color: "bg-emerald-600" },
      { key: "confirmado", label: "Confirmado", count: pacientes.principal.confirmado.length, color: "bg-prime" },
    ],
    followup: [
      { key: "aguardando", label: "Aguardando Follow-up", count: pacientes.followup.aguardando.length, color: "bg-amber-600" },
      { key: "contatado", label: "Contatado", count: pacientes.followup.contatado.length, color: "bg-blue-600" },
      { key: "reengajado", label: "Reengajado", count: pacientes.followup.reengajado.length, color: "bg-emerald-600" },
      { key: "perdido", label: "Perdido", count: pacientes.followup.perdido.length, color: "bg-rose-600" },
    ],
    agendados: [
      { key: "hoje", label: "Hoje", count: pacientes.agendados.hoje.length, color: "bg-emerald-600" },
      { key: "amanha", label: "Amanhã", count: pacientes.agendados.amanha.length, color: "bg-blue-600" },
      { key: "semana", label: "Esta Semana", count: pacientes.agendados.semana.length, color: "bg-indigo-600" },
      { key: "reagendar", label: "Reagendar", count: pacientes.agendados.reagendar.length, color: "bg-orange-500" },
    ],
  };

  const resumoSLA = [
    { label: "SLA inicial", valor: "6 min", detalhe: "Meta < 10 min", status: "ok" },
    { label: "Follow-up ativo", valor: "94%", detalhe: "3 tentativas automáticas", status: "ok" },
    { label: "Fila de espera", valor: "7 pacientes", detalhe: "Preencher cancelamentos", status: "alert" },
    { label: "Receita em pipeline", valor: "R$ 1,3M", detalhe: "Próximos 30 dias", status: "ok" },
  ];

  const alertas = [
    {
      titulo: "Cirurgias de alto valor",
      detalhe: "3 casos aguardam validação de convênio hoje.",
      acao: "Priorizar no ERP às 14h",
    },
    {
      titulo: "No-show em risco",
      detalhe: "8 pacientes sem confirmação para amanhã.",
      acao: "Disparar lembrete + fila de espera",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prime">CRM Comercial • Visão executiva</p>
            <div className="text-sm text-slate-600">Atualizado há 2 min • Integração ERP + Particular ativa</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100">
              <Clock3 size={16} />
              Últimos 30 dias
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100">
              <Filter size={16} />
              Filtro: alto valor
            </button>

          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {resumoSLA.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-600">
                {item.label}
                {item.status === "ok" ? <CheckCircle2 className="text-emerald-600" size={16} /> : <AlertTriangle className="text-amber-600" size={16} />}
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900">{item.valor}</div>
              <div className="text-xs text-slate-500">{item.detalhe}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-slate-200 bg-slate-50 p-4">
          <div className="font-bold text-slate-900 mb-3 text-lg">Funis</div>
          <div className="space-y-2">
            {[
              { key: "principal", label: "Funil Principal", icon: "🎯" },
              { key: "followup", label: "Follow-up", icon: "🔄" },
              { key: "agendados", label: "Agendados", icon: "📅" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFunil(item.key as "principal" | "followup" | "agendados")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${funil === item.key
                  ? "bg-prime text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            {alertas.map((alerta) => (
              <div key={alerta.titulo} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600" size={18} />
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-amber-900">{alerta.titulo}</div>
                    <div className="text-xs text-amber-800">{alerta.detalhe}</div>
                    <div className="text-xs font-semibold text-amber-900">{alerta.acao}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-4 min-w-max">
            {colunas[funil].map((coluna) => {
              const leadsDaColuna: Lead[] = (pacientes as Record<string, Record<string, Lead[]>>)[funil][coluna.key] ?? [];
              return (
                <div key={coluna.key} className="w-80 flex-shrink-0">
                  <div className={`${coluna.color} text-white rounded-t-lg px-4 py-3 flex items-center justify-between`}>
                    <span className="font-bold">{coluna.label}</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm font-semibold">{coluna.count}</span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-b-lg p-3 space-y-3 shadow-sm min-h-[420px]">
                    {leadsDaColuna.map((lead) => (
                      <div
                        key={lead.id}
                        className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-md hover:ring-prime/10"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold text-slate-900">{lead.nome}</div>
                              {lead.prioridade && (
                                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${prioridadeClasses[lead.prioridade]}`}>
                                  Prioridade {lead.prioridade}
                                </span>
                              )}
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {lead.tag ?? "Consulta"} • {lead.especialidade}
                            </div>
                          </div>
                          <div className="text-sm font-bold text-emerald-700">R$ {lead.valor.toLocaleString("pt-BR")}</div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                          {lead.origem && <span className="rounded-full bg-slate-100 px-2 py-1">Origem: {lead.origem}</span>}
                          {lead.tempo && <span className="rounded-full bg-slate-100 px-2 py-1">SLA: {lead.tempo}</span>}
                          {lead.horario && <span className="rounded-full bg-slate-100 px-2 py-1">Horário: {lead.horario}</span>}
                          {lead.status && (
                            <span
                              className={`rounded-full px-2 py-1 font-semibold ${lead.status === "Confirmado"
                                ? "bg-emerald-100 text-emerald-800"
                                : lead.status === "Pendente"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-orange-100 text-orange-800"
                                }`}
                            >
                              {lead.status}
                            </span>
                          )}
                        </div>

                        {lead.proximoPasso && (
                          <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs">
                            <div className="flex items-center justify-between text-slate-600">
                              <span className="font-semibold">Próximo passo</span>
                              <CheckCircle2 size={14} className="text-emerald-600" />
                            </div>
                            <div className="mt-1 text-slate-800">{lead.proximoPasso}</div>
                          </div>
                        )}

                        {lead.anotacao && <p className="mt-2 border-l-2 border-slate-200 pl-2 text-xs text-slate-500">{lead.anotacao}</p>}
                      </div>
                    ))}

                    <button className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-prime hover:text-prime transition-colors font-medium text-sm">
                      + Adicionar Lead
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
