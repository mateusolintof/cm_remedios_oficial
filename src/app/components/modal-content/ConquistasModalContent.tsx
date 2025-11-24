"use client";

import { TrendingUp, Clock, Shield } from "lucide-react";

export default function ConquistasModalContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 flex gap-4 items-start">
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><TrendingUp size={24} /></div>
            <div>
                <h4 className="font-bold text-slate-900">Aumento de Receita</h4>
                <p className="text-sm text-slate-600 mt-1">Captura imediata de leads fora do horário comercial e recuperação de pacientes que desistiriam pela espera no atendimento.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 flex gap-4 items-start">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Clock size={24} /></div>
            <div>
                <h4 className="font-bold text-slate-900">Eficiência Operacional</h4>
                <p className="text-sm text-slate-600 mt-1">Recepção deixa de ser call center e foca no atendimento presencial e casos complexos, enquanto a IA cuida do volume repetitivo.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 flex gap-4 items-start">
            <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Shield size={24} /></div>
            <div>
                <h4 className="font-bold text-slate-900">Agenda Blindada</h4>
                <p className="text-sm text-slate-600 mt-1">Redução drástica de buracos na agenda através da confirmação ativa e reagendamento automático imediato.</p>
            </div>
          </div>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
         <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Impacto Estimado</p>
         <div className="grid grid-cols-3 gap-4 divide-x divide-slate-200">
             <div>
                <div className="text-lg font-bold text-slate-900">+30%</div>
                <div className="text-xs text-slate-500">Agendamentos</div>
             </div>
             <div>
                <div className="text-lg font-bold text-slate-900">-2h</div>
                <div className="text-xs text-slate-500">Tempo Ocioso/dia</div>
             </div>
             <div>
                <div className="text-lg font-bold text-slate-900">Zero</div>
                <div className="text-xs text-slate-500">Leads Perdidos</div>
             </div>
         </div>
      </div>
    </div>
  );
}
