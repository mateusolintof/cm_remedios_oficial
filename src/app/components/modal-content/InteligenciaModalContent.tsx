"use client";

export default function InteligenciaModalContent() {
  return (
    <div className="p-6 space-y-6">
      <p className="text-slate-600 text-sm">
        Diferente de um chatbot comum, nossa solução estrutura dados para fornecer uma visão estratégica do consultório.
      </p>

      <div className="space-y-4">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
                Métricas de Aquisição (Marketing)
            </div>
            <div className="p-4 bg-white text-sm text-slate-600 space-y-2">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span>Custo por Lead (CPL)</span>
                    <span className="font-medium text-slate-900">Monitorado por canal</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span>Canal mais rentável</span>
                    <span className="font-medium text-slate-900">Identificação automática</span>
                </div>
                <div className="flex justify-between">
                    <span>Picos de demanda</span>
                    <span className="font-medium text-slate-900">Mapa de calor por horário</span>
                </div>
            </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
                Métricas de Retenção (Qualidade)
            </div>
            <div className="p-4 bg-white text-sm text-slate-600 space-y-2">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span>Motivos de No-Show</span>
                    <span className="font-medium text-slate-900">Categorização automática</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span>Satisfação (NPS)</span>
                    <span className="font-medium text-slate-900">Coleta pós-consulta</span>
                </div>
                <div className="flex justify-between">
                    <span>LTV (Valor vitalício)</span>
                    <span className="font-medium text-slate-900">Rastreio de recorrência</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}