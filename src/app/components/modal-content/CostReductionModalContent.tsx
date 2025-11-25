"use client";

import { useMemo, useState } from "react";
import { Scissors, ShieldCheck, Wallet } from "lucide-react";

type CostInputs = {
  atendentes: number;
  salario: number;
  automacao: number; // % do atendimento automatizado
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const defaultInputs: CostInputs = {
  atendentes: 20,
  salario: 2000,
  automacao: 35,
};

export default function CostReductionModalContent() {
  const [inputs, setInputs] = useState<CostInputs>(defaultInputs);

  const sliderFill = (value: number, min: number, max: number) => {
    const pct = ((value - min) / (max - min)) * 100;
    return `linear-gradient(90deg, var(--prime-primary) ${pct}%, #e2e8f0 ${pct}%)`;
  };

  const resultado = useMemo(() => {
    const custoAtualMensal = inputs.atendentes * inputs.salario;
    const reducaoBrutaMensal = custoAtualMensal * (inputs.automacao / 100);
    const reservaQualidade = reducaoBrutaMensal * 0.15; // 15% reinvestidos em supervisão e auditoria
    const economiaLiquidaMensal = reducaoBrutaMensal - reservaQualidade;
    const economiaAnual = economiaLiquidaMensal * 12;

    return {
      custoAtualMensal,
      reducaoBrutaMensal,
      reservaQualidade,
      economiaLiquidaMensal,
      economiaAnual,
    };
  }, [inputs]);

  return (
    <div className="h-full bg-slate-50 p-4 md:p-8 overflow-auto">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        {/* Coluna de Inputs */}
        <div className="md:w-5/12 p-8 bg-slate-50 border-r border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Scissors className="h-5 w-5 text-prime" /> Redução de Custos Operacionais
            </h3>
            <p className="text-sm text-slate-500">Projete o impacto da automação no time de atendimento.</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Qtd. de Atendentes</label>
                <span className="text-xs text-slate-400">5 → 40</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={inputs.atendentes}
                onChange={(e) => setInputs((prev) => ({ ...prev, atendentes: Number(e.target.value) }))}
                className="w-full h-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-prime/20"
                style={{ accentColor: "var(--prime-primary)", background: sliderFill(inputs.atendentes, 5, 40) }}
              />
              <div className="mt-3 text-2xl font-extrabold text-prime">{inputs.atendentes} pessoas</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Salário Médio (R$)</label>
                <span className="text-xs text-slate-400">R$ 1.500 → R$ 3.500</span>
              </div>
              <input
                type="range"
                min={1500}
                max={3500}
                step={100}
                value={inputs.salario}
                onChange={(e) => setInputs((prev) => ({ ...prev, salario: Number(e.target.value) }))}
                className="w-full h-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-prime/20"
                style={{ accentColor: "var(--prime-primary)", background: sliderFill(inputs.salario, 1500, 3500) }}
              />
              <div className="mt-3 text-2xl font-extrabold text-prime">{formatCurrency(inputs.salario)}</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Cobertura de Automação (%)</label>
                <span className="text-xs text-slate-400">10% → 80%</span>
              </div>
              <input
                type="range"
                min={10}
                max={80}
                step={1}
                value={inputs.automacao}
                onChange={(e) => setInputs((prev) => ({ ...prev, automacao: Number(e.target.value) }))}
                className="w-full h-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-prime/20"
                style={{ accentColor: "var(--prime-primary)", background: sliderFill(inputs.automacao, 10, 80) }}
              />
              <div className="mt-3 text-2xl font-extrabold text-emerald-700">{inputs.automacao}% cobertos</div>
              <p className="text-xs text-slate-500">Considera requalificação e realocação para casos críticos.</p>
            </div>
          </div>
        </div>

        {/* Coluna de Resultados */}
        <div className="md:w-7/12 p-8 flex flex-col justify-center bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Wallet size={120} />
          </div>

          <div className="relative z-10 space-y-8">
            <div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Economia Líquida Estimada</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl md:text-5xl font-extrabold text-emerald-600">
                  +{formatCurrency(resultado.economiaLiquidaMensal)}
                </span>
                <span className="text-slate-500 font-medium">/mês</span>
              </div>
              <p className="text-sm text-emerald-700 mt-2 font-medium bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-100">
                {Math.round((resultado.economiaLiquidaMensal / resultado.custoAtualMensal) * 100)}% de redução líquida na folha operacional
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-6">
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Custo Mensal Atual</div>
                <div className="text-xl font-bold text-slate-800 mt-1">{formatCurrency(resultado.custoAtualMensal)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Economia Anual</div>
                <div className="text-xl font-bold text-prime mt-1">+{formatCurrency(resultado.economiaAnual)}</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600 leading-relaxed space-y-2">
              <p>
                Reservamos 15% da economia bruta para supervisão humana, auditoria de qualidade e treinamento contínuo.
                O restante representa a redução líquida recorrente, sem abrir mão de segurança e compliance.
              </p>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                IA + protocolos humanos = fila atendida, menor ociosidade e menos horas extras.
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Equipes enxutas entregam melhor quando dedicadas a casos críticos. Ao automatizar triagem, confirmações e dúvidas
              recorrentes, liberamos tempo para acolhimento e resolução, reduzindo turnover e overtime. A soma é menos custo fixo,
              mais previsibilidade de caixa e atendimento 24/7 sem sobrecarga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
