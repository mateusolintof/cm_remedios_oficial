"use client";

import { AlertTriangle, TrendingUp, ArrowRight, Lightbulb } from "lucide-react";

export default function InsightsModalContent() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 h-full">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Alerta de Desvio: Taxa de No-Show</h3>
            <p className="text-xs text-slate-500">Detectado em: Terças-feiras (14h-17h)</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="p-3 bg-slate-50 rounded border border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase">Diagnóstico</div>
                <div className="text-sm text-slate-700 mt-1">
                    Elevação atípica de 23% para 38% em faltas de pacientes confirmados.
                </div>
            </div>
            <div className="p-3 bg-red-50 rounded border border-red-100">
                <div className="text-xs font-bold text-red-800 uppercase">Impacto Financeiro</div>
                <div className="text-sm text-red-700 font-bold mt-1">
                    -R$ 12.400 / semana (Projetado)
                </div>
            </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 mb-2">
                <Lightbulb size={16} /> Ação Recomendada pela IA:
            </div>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Ativar Lembrete de Urgência (SMS) 2h antes da consulta.</li>
                <li>Priorizar overbooking estratégico (+1 vaga) neste horário específico.</li>
            </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Oportunidade: Demanda Reprimida</h3>
            <p className="text-xs text-slate-500">Especialidade: Ortopedia Geral</p>
          </div>
        </div>
        
        <div className="text-sm text-slate-700 mb-4">
            Identificamos <strong>47 pacientes na lista de espera</strong> qualificada, enquanto a agenda da próxima semana possui <strong>12 horários vagos</strong> por cancelamentos recentes.
        </div>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
            Disparar Oferta de Antecipação (+R$ 5.640) <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
