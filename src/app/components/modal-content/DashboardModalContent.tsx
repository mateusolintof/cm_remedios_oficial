"use client";

import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Gauge,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

type Tab = "overview" | "funil" | "agendamentos" | "insights";

export default function DashboardModalContent() {
  const [tab, setTab] = useState<Tab>("overview");
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  const faixaTempo = {
    "7d": "Últimos 7 dias",
    "30d": "Últimos 30 dias",
    "90d": "Últimos 90 dias",
  };

  const kpisOverview = [
    { label: "Leads/dia", value: "500", change: "+24%", meta: "Meta: 480", fill: 1.04, tone: "positive" },
    { label: "Conversão", value: "39%", change: "+160%", meta: "Meta: 32%", fill: 1.22, tone: "positive" },
    { label: "No-show", value: "10%", change: "-60%", meta: "Meta: <=15%", fill: 0.67, tone: "positive" },
    { label: "Consultas/mês", value: "5.800", change: "+42%", meta: "Meta: 5.500", fill: 1.05, tone: "positive" },
    { label: "Receita", value: "R$ 2.3M", change: "+42%", meta: "Meta: R$ 2.0M", fill: 1.15, tone: "positive" },
    { label: "Pipeline", value: "R$ 4.3M", change: "novo", meta: "Próx. 30 dias", fill: 1, tone: "neutral" },
    { label: "Qualificação", value: "60%", change: "estável", meta: "Meta: 60%", fill: 1, tone: "positive" },
    { label: "Show Rate", value: "90%", change: "+7%", meta: "Meta: 85%", fill: 1.06, tone: "positive" },
  ];

  const statusOperacao = [
    {
      title: "SLA em 6 min",
      desc: "94% dos leads respondidos em < 10 min",
      icon: <Clock3 size={18} />,
      tone: "emerald",
    },
    {
      title: "Bots 24/7 ligados",
      desc: "SDR + Anti No-show + FAQ educacional",
      icon: <Sparkles size={18} />,
      tone: "blue",
    },
    {
      title: "LGPD + rastreio",
      desc: "Consentimentos e logs gravados no CRM",
      icon: <ShieldCheck size={18} />,
      tone: "slate",
    },
  ];

  const gargalosFunil = [
    {
      titulo: "Lead para Qualificado",
      detalhe: "40% reprovados por dados incompletos ou sem convênio aceito.",
      acao: "Coleta automática e FAQ para pré-qualificar.",
    },
    {
      titulo: "Agendado para Confirmado",
      detalhe: "Risco de no-show em horários de manhã (8h-10h).",
      acao: "Lembrete + fila de espera com reoferta imediata.",
    },
    {
      titulo: "Consulta para Cirurgia",
      detalhe: "24 pacientes aguardando retorno do convênio.",
      acao: "Trigger de validação ERP + call back dedicado.",
    },
  ];

  const acoesRapidas = [
    "Disparar lembrete de confirmação",
    "Segmentar leads de indicação (LTV alto)",
    "Oferecer horário noturno para Google Ads",
    "Campanha anti no-show fim de semana",
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prime">Dashboard de Gestão</p>
            <div className="text-sm text-slate-600">
              {faixaTempo[range]} • Integração CRM + Agenda Unificada em tempo real
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["7d", "30d", "90d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${range === r
                  ? "bg-prime text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
              >
                <Clock3 size={14} />
                {faixaTempo[r]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={14} />
            Visão executiva com metas
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <BarChart3 size={14} />
            Bench ortopedia + particular
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <ShieldCheck size={14} />
            Dados anonimizados para demo
          </span>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-6 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { k: "overview", t: "Visão Geral" },
            { k: "funil", t: "Funil" },
            { k: "agendamentos", t: "Agendamentos" },
            { k: "insights", t: "Insights" },
          ].map((i) => (
            <button
              key={i.k}
              onClick={() => setTab(i.k as Tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${tab === i.k
                ? "bg-prime text-white shadow-sm"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              {i.t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpisOverview.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {kpi.label}
                    {kpi.tone === "positive" ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertTriangle size={14} className="text-amber-600" />}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
                  <div className={`text-sm font-semibold ${kpi.tone === "positive" ? "text-emerald-600" : "text-amber-700"}`}>
                    {kpi.change} vs mês anterior
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{kpi.meta}</div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full ${kpi.tone === "positive" ? "bg-emerald-500" : "bg-amber-500"}`}
                      style={{ width: `${Math.min(kpi.fill * 100, 120)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {statusOperacao.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm ${item.tone === "emerald" ? "ring-1 ring-emerald-50" : item.tone === "blue" ? "ring-1 ring-sky-50" : "ring-1 ring-slate-100"
                    }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    {item.icon}
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                  <Target size={18} className="text-prime" />
                  Distribuição: Particular vs Convênio
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Particular</div>
                      <div className="text-slate-600">58% • 8.700</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime-accent" style={{ width: "58%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Convênio</div>
                      <div className="text-slate-600">42% • 6.300</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime" style={{ width: "42%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-500">Meta: manter particular acima de 55% sem perder ocupação.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                  <BarChart3 size={18} className="text-prime" />
                  Procedimentos Mais Procurados
                </div>
                <div className="space-y-3">
                  {[
                    { nome: "Artroscopia", pct: 38, leads: 5700 },
                    { nome: "Tratamento Artrose", pct: 32, leads: 4800 },
                    { nome: "Artroplastia", pct: 18, leads: 2700 },
                    { nome: "Células-Tronco", pct: 12, leads: 1800 },
                  ].map((p) => (
                    <div key={p.nome}>
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-semibold text-slate-700">{p.nome}</div>
                        <div className="text-slate-600">{p.pct}% • {p.leads}</div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-prime" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500">Números ilustrativos extraídos do documento de arquitetura. Ajustar com dados reais do período.</div>
          </div>
        )}

        {tab === "funil" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Leads/mês", value: "15.000" },
                { label: "Qualificados", value: "60%" },
                { label: "Agendados", value: "~7.000" },
                { label: "Confirmados", value: "~6.450" },
                { label: "Realizados", value: "5.800" },
                { label: "No-show", value: "10%" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold text-prime">{kpi.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
                <Gauge size={18} className="text-prime" />
                Funil de Conversão Completo
              </div>
              <div className="space-y-4">
                {[
                  { etapa: "Leads", valor: 15000, percentual: 100, cor: "bg-prime-accent" },
                  { etapa: "Qualificados", valor: 9000, percentual: 60, cor: "bg-indigo-600" },
                  { etapa: "Agendados", valor: 7000, percentual: 46.7, cor: "bg-emerald-600" },
                  { etapa: "Confirmados", valor: 6450, percentual: 43.1, cor: "bg-sky-700" },
                  { etapa: "Realizados", valor: 5800, percentual: 38.9, cor: "bg-prime" },
                ].map((item, idx) => (
                  <div key={item.etapa} className="relative">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium text-slate-700">{item.etapa}</div>
                      <div className="flex-1">
                        <div className="h-10 bg-slate-100 rounded-lg overflow-hidden relative">
                          <div
                            className={`h-full ${item.cor} transition-all duration-500 flex items-center justify-between px-4`}
                            style={{ width: `${item.percentual}%` }}
                          >
                            <span className="text-white font-bold text-sm">{item.valor.toLocaleString()}</span>
                            <span className="text-white font-bold text-sm">{item.percentual.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="ml-32 pl-4 mt-1 text-xs text-amber-700">
                        Perda: {((1 - item.percentual / 100) * 100).toFixed(1)}% • Ação: {idx === 0 ? "qualificar com bot" : idx === 1 ? "oferecer horários" : idx === 2 ? "confirmar presença" : "follow-up cirúrgico"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {gargalosFunil.map((gargalo) => (
                <div key={gargalo.titulo} className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                    <AlertTriangle size={16} />
                    {gargalo.titulo}
                  </div>
                  <p className="mt-2 text-sm text-amber-800">{gargalo.detalhe}</p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-900 shadow-sm">
                    <Sparkles size={14} />
                    {gargalo.acao}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "agendamentos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Realizados (mês)", value: "5.800", status: "positive" },
                { label: "No-show", value: "10%", status: "positive" },
                { label: "Show Rate", value: "90%", status: "positive" },
                { label: "Pipeline", value: "R$ 4.3M", status: "positive" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                  <CalendarCheck2 size={18} className="text-prime" />
                  Agenda de Hoje
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">Ocupação</span>
                    <span className="text-slate-600">82% • 3 lacunas</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: "82%" }} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-slate-700">
                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                      <div className="font-semibold text-prime">08h-10h</div>
                      <div className="text-slate-600">2 vagas livres</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                      <div className="font-semibold text-prime">13h-15h</div>
                      <div className="text-slate-600">Fila de espera ativa</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                      <div className="font-semibold text-prime">17h-19h</div>
                      <div className="text-slate-600">Alta procura (Google)</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  Anti No-show ligado: lembretes 48h, 24h, 2h + fila de espera automática.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                  <BarChart3 size={18} className="text-prime" />
                  Particular vs Convênio
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Particular</div>
                      <div className="text-slate-600">58% • 8.700</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime-accent" style={{ width: "58%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Convênio</div>
                      <div className="text-slate-600">42% • 6.300</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime" style={{ width: "42%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-slate-800 mb-2">Top 3 Convênios</div>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>1. Unimed — 2.730 leads</li>
                    <li>2. Bradesco — 1.890 leads</li>
                    <li>3. Servir — 1.260 leads</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                <TrendingUp size={18} className="text-prime" />
                Lacunas, fila de espera e ocupação
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { titulo: "Fila de espera", detalhe: "12 pacientes aguardando encaixe para esta semana" },
                  { titulo: "Lacunas críticas", detalhe: "3 horários livres amanhã de manhã" },
                  { titulo: "Reagendamentos", detalhe: "5 cancelamentos capturados sem perder consulta" },
                ].map((card) => (
                  <div key={card.titulo} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700 border border-slate-200">
                    <div className="font-semibold text-slate-900">{card.titulo}</div>
                    <div className="mt-1 text-slate-700">{card.detalhe}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-500">
              Números ilustrativos do documento de arquitetura; ajustar quando integrar aos dados reais.
            </div>
          </div>
        )}

        {tab === "insights" && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {acoesRapidas.map((acao) => (
                <button
                  key={acao}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <Sparkles size={14} className="text-prime" />
                  {acao}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h4 className="font-bold text-orange-900 text-lg mb-1">Oportunidade crítica do dia</h4>
                  <p className="text-slate-700 mb-3">
                    Ortopedia tem 47 pacientes em fila de espera e 12 horários vagos na próxima semana. Potencial de{" "}
                    <span className="font-bold text-orange-700">+R$ 18.800</span> em receita.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                      Disparar Campanha Agora
                    </button>
                    <button className="px-4 py-2 border border-orange-200 text-orange-800 rounded-lg font-semibold bg-white hover:bg-orange-50 transition-colors">
                      Acionar fila de espera
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={18} className="text-prime" />
                  <h4 className="font-bold text-slate-900">Padrão de Conversão</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  35% dos leads chegam no domingo com conversão de apenas 28% (vs 48% na segunda-feira). Causa: demora na resposta.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                  <div className="font-semibold text-emerald-900 text-sm">💡 Ação sugerida:</div>
                  <p className="text-sm text-emerald-800 mt-1">Ativar bot com senso de urgência nos fins de semana</p>
                  <div className="text-emerald-700 font-bold mt-2">Ganho potencial: +R$ 84.000/mês</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-prime" />
                  <h4 className="font-bold text-slate-900">Objeção Principal</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  79% dos leads de cirurgia que não convertem mencionam “preço alto”. Taxa de conversão: apenas 22%.
                </p>
                <div className="bg-sky-50 border border-sky-200 p-3 rounded-lg">
                  <div className="font-semibold text-sky-900 text-sm">💡 Ação sugerida:</div>
                  <p className="text-sm text-sky-800 mt-1">Oferecer parcelamento 6x antes da objeção</p>
                  <div className="text-sky-700 font-bold mt-2">Ganho potencial: +R$ 60.000/mês</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} className="text-prime" />
                  <h4 className="font-bold text-slate-900">Melhor Canal</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Indicações têm 94% de conversão, 4% de no-show e LTV de R$ 3.980 (melhor canal). Atualmente: apenas 13% dos leads.
                </p>
                <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                  <div className="font-semibold text-purple-900 text-sm">💡 Ação sugerida:</div>
                  <p className="text-sm text-purple-800 mt-1">Criar programa de indicação com R$ 200 de incentivo</p>
                  <div className="text-purple-700 font-bold mt-2">Meta: Dobrar indicações = +R$ 650k/mês</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck size={18} className="text-prime" />
                  <h4 className="font-bold text-slate-900">Tendência Positiva</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Lesões do joelho aumentaram conversão em 18% (35% para 53%). Motivo: resposta mais rápida no WhatsApp.
                </p>
                <div className="bg-teal-50 border border-teal-200 p-3 rounded-lg">
                  <div className="font-semibold text-teal-900 text-sm">💡 Ação sugerida:</div>
                  <p className="text-sm text-teal-800 mt-1">Replicar estratégia em outras especialidades</p>
                  <div className="text-teal-700 font-bold mt-2">Continue fazendo!</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
