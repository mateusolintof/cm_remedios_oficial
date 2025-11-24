"use client";

import { useState } from "react";
import { TrendingUp, ArrowRight, Calculator, DollarSign } from "lucide-react";

type FaturamentoInputs = {
  leadsMes: number;
  taxaConversaoAtual: number;
  taxaConversaoNova: number;
  ticketMedio: number;
};

type Props = {
  preparedFor: string;
};

const investimento = 30000; // Setup único
const mensalidade = 2500;   // Mensalidade recorrente

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const defaultFaturamento: FaturamentoInputs = {
  leadsMes: 4500, // Baseado em 150/dia
  taxaConversaoAtual: 15,
  taxaConversaoNova: 35, // Meta conservadora
  ticketMedio: 400,
};

export default function RoiModalContent({ preparedFor }: Props) {
  const [inputs, setInputs] = useState<FaturamentoInputs>(defaultFaturamento);

  // Cálculos
  const leadsConvertidosAtuais = inputs.leadsMes * (inputs.taxaConversaoAtual / 100);
  const receitaAtual = leadsConvertidosAtuais * inputs.ticketMedio;
  
  const leadsConvertidosNovos = inputs.leadsMes * (inputs.taxaConversaoNova / 100);
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

            <div className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Leads Mensais</label>
                    <input 
                        type="number" 
                        value={inputs.leadsMes} 
                        onChange={(e) => handleChange("leadsMes", Number(e.target.value))}
                        className="w-full p-3 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Conversão Hoje (%)</label>
                        <input 
                            type="number" 
                            value={inputs.taxaConversaoAtual} 
                            onChange={(e) => handleChange("taxaConversaoAtual", Number(e.target.value))}
                            className="w-full p-3 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-emerald-600 uppercase mb-2">Meta com IA (%)</label>
                        <input 
                            type="number" 
                            value={inputs.taxaConversaoNova} 
                            onChange={(e) => handleChange("taxaConversaoNova", Number(e.target.value))}
                            className="w-full p-3 border border-emerald-200 bg-emerald-50 rounded-lg font-bold text-emerald-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ticket Médio (R$)</label>
                    <input 
                        type="number" 
                        value={inputs.ticketMedio} 
                        onChange={(e) => handleChange("ticketMedio", Number(e.target.value))}
                        className="w-full p-3 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                    />
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

                <button className="w-full py-4 bg-prime hover:bg-prime-dark text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-prime/20">
                    Validar Viabilidade Financeira <ArrowRight className="h-5 w-5" />
                </button>
             </div>
        </div>
      </div>
    </div>
  );
}
