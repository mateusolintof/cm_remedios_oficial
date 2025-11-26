"use client";

import { useState } from "react";
import { TrendingUp, Calculator, DollarSign } from "lucide-react";

type FaturamentoInputs = {
  leadsMes: number;
  taxaConversaoAtual: number;
  ticketMedio: number;
};

type Props = {
  preparedFor: string;
  onFinish?: () => void;
};

const investimento = 60000; // Setup único (Ecossistema Full)
const mensalidade = 7000;   // Mensalidade recorrente (Ecossistema Full)

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const defaultFaturamento: FaturamentoInputs = {
  leadsMes: 15000, // Baseado em 500/dia
  taxaConversaoAtual: 15,
  ticketMedio: 100,
};

export default function RoiModalContent({ preparedFor, onFinish }: Props) {
  const [inputs, setInputs] = useState<FaturamentoInputs>(defaultFaturamento);
  const taxaConversaoIA = Math.min(100, Number((inputs.taxaConversaoAtual * 1.5).toFixed(1))); // Sempre 50% maior

  // Cálculos
  const leadsConvertidosAtuais = inputs.leadsMes * (inputs.taxaConversaoAtual / 100);
  const receitaAtual = leadsConvertidosAtuais * inputs.ticketMedio;
  
  const leadsConvertidosNovos = inputs.leadsMes * (taxaConversaoIA / 100);
  const receitaNova = leadsConvertidosNovos * inputs.ticketMedio;
  
  const receitaExtraMensal = receitaNova - receitaAtual;
  const receitaExtraAnual = receitaExtraMensal * 12;
  
  // ROI no primeiro ano (Receita Extra Anual - (Setup + 12x Mensalidade)) / Custo Total
  const custoPrimeiroAno = investimento + (mensalidade * 12);
  const lucroLiquidoPrimeiroAno = receitaExtraAnual - custoPrimeiroAno;
  const roi = (lucroLiquidoPrimeiroAno / custoPrimeiroAno) * 100;

  const handleChange = (key: keyof FaturamentoInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const sliderFill = (value: number, min: number, max: number) => {
    const pct = ((value - min) / (max - min)) * 100;
    return `linear-gradient(90deg, var(--prime-primary) ${pct}%, #e2e8f0 ${pct}%)`;
  };

  return (
    <div className="h-full bg-slate-50 p-4 md:p-8 overflow-auto">
      <span className="sr-only">Simulação personalizada para {preparedFor}</span>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Coluna de Inputs */}
        <div className="md:w-5/12 p-8 bg-slate-50 border-r border-slate-100">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-prime" /> Parâmetros
                </h3>
                <p className="text-sm text-slate-500">Ajuste conforme a realidade do consultório.</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Leads Mensais</label>
                  <span className="text-xs text-slate-400">1000 → 25.000</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={25000}
                  step={500}
                  value={inputs.leadsMes}
                  onChange={(e) => handleChange("leadsMes", Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-prime/20"
                  style={{ accentColor: "var(--prime-primary)", background: sliderFill(inputs.leadsMes, 1000, 25000) }}
                />
                <div className="mt-3 text-2xl font-extrabold text-prime">{inputs.leadsMes.toLocaleString("pt-BR")}</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Ticket Médio (R$)</label>
                  <span className="text-xs text-slate-400">R$ 70 → R$ 1.000</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={1000}
                  step={10}
                  value={inputs.ticketMedio}
                  onChange={(e) => handleChange("ticketMedio", Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-prime/20"
                  style={{ accentColor: "var(--prime-primary)", background: sliderFill(inputs.ticketMedio, 70, 1000) }}
                />
                <div className="mt-3 text-2xl font-extrabold text-prime">{formatCurrency(inputs.ticketMedio)}</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase">Conversão Atual (%)</label>
                  <span className="text-xs text-slate-400">1% → 40%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={0.5}
                  value={inputs.taxaConversaoAtual}
                  onChange={(e) => handleChange("taxaConversaoAtual", Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-prime/20"
                  style={{ accentColor: "var(--prime-primary)", background: sliderFill(inputs.taxaConversaoAtual, 1, 40) }}
                />
                <div className="flex items-center gap-3">
                  <div className="text-xl font-extrabold text-slate-800">{inputs.taxaConversaoAtual.toLocaleString("pt-BR")}%</div>
                  <div className="text-xs text-slate-500">Taxa atual</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">IA (+50%)</span>
                  <span className="text-lg font-bold text-emerald-700">{taxaConversaoIA.toLocaleString("pt-BR")}%</span>
                </div>
                <p className="text-xs text-slate-500">A conversão com IA é sempre 50% maior que a taxa atual selecionada.</p>
              </div>
            </div>
        </div>

        {/* Coluna de Resultados */}
        <div className="md:w-7/12 p-8 flex flex-col justify-center bg-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <DollarSign size={120} />
             </div>

             <div className="relative z-10 space-y-8">
                <div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Potencial de Receita Adicional</div>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-4xl md:text-5xl font-extrabold text-emerald-600">
                            +{formatCurrency(receitaExtraMensal)}
                        </span>
                        <span className="text-slate-500 font-medium">/mês</span>
                    </div>
                    <p className="text-sm text-emerald-700 mt-2 font-medium bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-100">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        {Math.round(leadsConvertidosNovos - leadsConvertidosAtuais)} agendamentos extras mensais
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                    <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Acumulado em 1 Ano</div>
                        <div className="text-xl font-bold text-slate-800 mt-1">+{formatCurrency(receitaExtraAnual)}</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">ROI do Projeto</div>
                        <div className="text-xl font-bold text-prime mt-1">{Math.round(roi)}%</div>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 text-xs text-slate-500 leading-relaxed">
                    * Cálculo considera Investimento de Setup ({formatCurrency(investimento)}) + Mensalidade Anual ({formatCurrency(mensalidade * 12)}). 
                    O ROI indica quantas vezes o lucro cobre o custo total no primeiro ano.
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Estudos do MIT mostram que responder em até 5 minutos aumenta em 10x as chances de conversão em Clínicas Médicas.
                  Nossos agentes de IA oferecem respostas em até 30 segundos, 24 horas por dia, gerando uma possibilidade de aumento
                  da taxa de conversão em até 80%.
                </p>
             </div>
        </div>
      </div>
    </div>
  );
}
