"use client";

import { useMemo } from "react";
import { Gauge, ArrowUpRight, ShieldCheck, PiggyBank } from "lucide-react";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const assumptions = {
  leadsMensais: 10000,
  conversaoAtual: 15, // %
  conversaoIA: 40, // %
  ticketMedio: 80, // R$
  margemContribuicao: 15, // %
  colaboradoresSubstituidos: 5,
  salarioMedio: 2000, // R$
  setup: 70000,
  mensal: 7000,
};

export default function PaybackModalContent() {
  const {
    leadsMensais,
    conversaoAtual,
    conversaoIA,
    ticketMedio,
    margemContribuicao,
    colaboradoresSubstituidos,
    salarioMedio,
    setup,
    mensal,
  } = assumptions;

  const calculo = useMemo(() => {
    const ganhoConversaoMensalBruto =
      leadsMensais * ((conversaoIA - conversaoAtual) / 100) * ticketMedio;
    const ganhoConversaoMensalLiquido = ganhoConversaoMensalBruto * (margemContribuicao / 100);

    const reducaoCustosMensal = colaboradoresSubstituidos * salarioMedio;

    const ganhoMensalTotal = ganhoConversaoMensalLiquido + reducaoCustosMensal;
    const ganhoAnualTotal = ganhoMensalTotal * 12;

    const custoAnual = setup + mensal * 12;
    const paybackMeses = custoAnual / ganhoMensalTotal;
    const roi = ((ganhoAnualTotal - custoAnual) / custoAnual) * 100;

    return {
      ganhoConversaoMensalLiquido,
      reducaoCustosMensal,
      ganhoMensalTotal,
      ganhoAnualTotal,
      custoAnual,
      paybackMeses,
      roi,
    };
  }, []);

  const paybackLabel = paybackMesesLabel(calculo.paybackMeses);

  return (
    <div className="h-full bg-slate-50 p-4 md:p-8 overflow-auto">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:border-r border-slate-100 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-accent/15 text-prime text-xs font-bold uppercase tracking-wider">
              <Gauge className="h-3.5 w-3.5" />
              Payback acelerado
            </div>
            <h3 className="text-2xl font-extrabold text-prime leading-tight">Projeto que se paga em {paybackLabel}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Com 10 mil leads/mês atendidos pela IA, conversão saltando de 15% para 40% e substituição de 5 atendentes,
              o ecossistema cobre todo o custo anual (setup + 12x mensal) e começa a gerar caixa já no primeiro ciclo.
            </p>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-xs uppercase font-bold text-slate-500">Custo total 12 meses</div>
                  <div className="text-xl font-bold text-slate-900">{formatCurrency(calculo.custoAnual)}</div>
                  <div className="text-xs text-slate-500">Setup {formatCurrency(setup)} + 12x {formatCurrency(mensal)}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PiggyBank className="h-5 w-5 text-prime" />
                <div>
                  <div className="text-xs uppercase font-bold text-slate-500">Ganho total 12 meses</div>
                  <div className="text-xl font-bold text-emerald-700">+{formatCurrency(calculo.ganhoAnualTotal)}</div>
                  <div className="text-xs text-slate-500">
                    Inclui margem de contribuição de {margemContribuicao}% e redução de custos de equipe.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-slate-700" />
                <div>
                  <div className="text-xs uppercase font-bold text-slate-500">ROI em 12 meses</div>
                  <div className="text-xl font-bold text-prime">{Math.round(calculo.roi)}%</div>
                  <div className="text-xs text-slate-500">Inclui ganhos em receita + redução de custos de equipe</div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm text-emerald-800 leading-relaxed">
              Atendimento imediato, follow-up ativo e pós-venda estruturado elevam a conversão e reduzem ociosidade de time.
              A operação roda 24/7 com custo variável menor e previsibilidade de caixa.
            </div>
          </div>

          <div className="p-8 space-y-6 bg-gradient-to-b from-white to-slate-50">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Premissas</div>
              <div className="grid grid-cols-2 gap-4">
              <Assumption label="Leads/mês" value={assumptions.leadsMensais.toLocaleString("pt-BR")} />
              <Assumption label="Ticket médio" value={formatCurrency(assumptions.ticketMedio)} />
              <Assumption label="Conversão atual" value={`${assumptions.conversaoAtual}%`} />
              <Assumption label="Conversão com IA" value={`${assumptions.conversaoIA}%`} highlight />
              <Assumption label="Equipe substituída" value={`${assumptions.colaboradoresSubstituidos} pessoas`} />
              <Assumption label="Salário médio" value={formatCurrency(assumptions.salarioMedio)} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <KpiCard title="Ganho em receita (mês)" value={`+${formatCurrency(calculo.ganhoConversaoMensalLiquido)}`} caption="Já descontada a margem de contribuição" />
              <KpiCard title="Redução de custos (mês)" value={`+${formatCurrency(calculo.reducaoCustosMensal)}`} caption="Substituição de 5 atendentes" />
              <KpiCard title="Ganho anual" value={`+${formatCurrency(calculo.ganhoAnualTotal)}`} caption="Receita incremental + economia" />
              <KpiCard title="Payback" value={paybackLabel} caption="Custo total dividido pelo ganho mensal" highlight />
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              Valores ilustrativos; ajustamos com dados reais de margem, ticket e volume para refinar o payback. Incluímos setup, mensalidade e ganhos combinados de eficiência + conversão.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function paybackMesesLabel(payback: number) {
  if (payback < 1) return "<1 mês";
  if (payback < 1.5) return "≈1 mês";
  return `${payback.toFixed(1)} meses`;
}

function Assumption({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border ${highlight ? "border-prime/60 bg-prime-accent/10" : "border-slate-200 bg-white"} p-3`}>
      <div className="text-[11px] uppercase font-bold text-slate-500">{label}</div>
      <div className={`text-sm font-semibold ${highlight ? "text-prime" : "text-slate-800"}`}>{value}</div>
    </div>
  );
}

function KpiCard({ title, value, caption, highlight = false }: { title: string; value: string; caption: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border ${highlight ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"} p-4 shadow-sm`}>
      <div className="text-xs uppercase font-bold text-slate-500">{title}</div>
      <div className={`text-lg font-extrabold ${highlight ? "text-emerald-700" : "text-slate-900"}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-1">{caption}</div>
    </div>
  );
}
