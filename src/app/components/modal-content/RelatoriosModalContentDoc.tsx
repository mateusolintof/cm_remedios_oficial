"use client";

import { BarChart3, PieChart, ArrowUpRight } from "lucide-react";

export default function RelatoriosModalContentDoc() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 h-full">

      {/* Cabeçalho Executivo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 uppercase font-bold">Receita Consolidada (Mês)</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">R$ 700.000</div>
          <div className="text-xs text-emerald-600 font-medium flex items-center mt-1">
            <ArrowUpRight size={12} /> +42% vs mês anterior
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 uppercase font-bold">Pipeline (Em negociação)</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">R$ 1.3 Mi</div>
          <div className="text-xs text-slate-400 mt-1">87 Cirurgias em análise</div>
        </div>
      </div>

      {/* Análise de Canais (CAC/LTV) */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <PieChart className="text-prime" size={20} /> Performance por Canal
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-500 uppercase border-b border-slate-100 pb-2">
            <div className="col-span-4">Origem</div>
            <div className="col-span-3 text-right">Leads</div>
            <div className="col-span-3 text-right">Conversão</div>
            <div className="col-span-2 text-right">ROI</div>
          </div>

          {[
            { canal: "Google Ads", leads: 850, conv: "18%", roi: "4.5x" },
            { canal: "Indicação (MGM)", leads: 120, conv: "94%", roi: "Inf" },
            { canal: "Instagram Orgânico", leads: 430, conv: "22%", roi: "12x" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 text-sm text-slate-700 py-2 border-b border-slate-50 last:border-0">
              <div className="col-span-4 font-medium">{row.canal}</div>
              <div className="col-span-3 text-right">{row.leads}</div>
              <div className="col-span-3 text-right font-bold text-slate-900">{row.conv}</div>
              <div className="col-span-2 text-right text-emerald-600 font-bold">{row.roi}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Eficiência Operacional */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 className="text-prime" size={20} /> Eficiência da IA
        </h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600">Triagem Automática (Sem humano)</span>
          <span className="font-bold text-slate-900">84%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
          <div className="bg-prime h-2 rounded-full" style={{ width: "84%" }}></div>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600">Recuperação de Agendamento</span>
          <span className="font-bold text-slate-900">32%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "32%" }}></div>
        </div>
      </div>

      <div className="text-xs text-center text-slate-400 mt-2">
        Dados integrados via API ERP + CRM
      </div>
    </div>
  );
}