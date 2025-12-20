"use client";

import type { ReactNode } from "react";
import { CalendarCheck2, Gauge, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const workloadData = [
  { name: "Seg", ia: 68, humano: 34 },
  { name: "Ter", ia: 72, humano: 40 },
  { name: "Qua", ia: 78, humano: 46 },
  { name: "Qui", ia: 75, humano: 42 },
  { name: "Sex", ia: 66, humano: 38 },
  { name: "Sab", ia: 54, humano: 22 },
];

const workloadChartConfig = {
  ia: { label: "IA", color: "var(--prime-accent)" },
  humano: { label: "Humano", color: "var(--prime-primary)" },
} satisfies ChartConfig;

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-slate-700">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prime-accent/70" aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function ConquistasModalContent() {
  return (
    <div className="p-6">
      <div className="text-sm text-slate-600">
        Esta é uma visão do que muda na operação quando o volume repetitivo é absorvido pela IA, com governança de pipeline e relatórios para gestão.
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-prime-accent/10 text-prime">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-900">Receita capturada com cadência</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Leads entram fora do horário, voltam para o funil e seguem um próximo passo claro — sem depender de memória ou planilhas.
                </p>
                <div className="mt-4 space-y-2">
                  <Bullet>Resposta imediata 24/7 para não “esfriar” o lead.</Bullet>
                  <Bullet>Qualificação e roteamento por convênio/particular.</Bullet>
                  <Bullet>Follow-up automático com prioridade por intenção.</Bullet>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-prime-accent/10 text-prime">
                <Gauge className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-900">Menos ruído, mais produtividade</h4>
                <p className="mt-1 text-sm text-slate-600">
                  A recepção deixa de ser call center. O time humano atua onde faz diferença: negociação, casos complexos e atendimento presencial.
                </p>
                <div className="mt-4 space-y-2">
                  <Bullet>Fila única com contexto e histórico da conversa.</Bullet>
                  <Bullet>Distribuição por responsável e por canal.</Bullet>
                  <Bullet>Checklist de próximos passos para reduzir retrabalho.</Bullet>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-prime-accent/10 text-prime">
                <CalendarCheck2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-900">Agenda mais previsível</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Confirmação ativa, fila de espera e remarcação guiada diminuem lacunas — e deixam claro onde estão as perdas do funil.
                </p>
                <div className="mt-4 space-y-2">
                  <Bullet>Lembretes e confirmação automatizados antes da consulta.</Bullet>
                  <Bullet>Reagendamento imediato quando há desistência.</Bullet>
                  <Bullet>Registro de motivos para melhoria contínua.</Bullet>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900">Carga de atendimento (exemplo)</div>
                <div className="mt-1 text-xs text-slate-500">IA absorve picos e fora do horário; humano foca no que converte.</div>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-xs text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--prime-accent)" }} />
                  IA
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--prime-primary)" }} />
                  Humano
                </span>
              </div>
            </div>
            <div className="mt-4">
              <ChartContainer config={workloadChartConfig} className="h-56 w-full">
                <BarChart data={workloadData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis hide tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="ia" stackId="workload" fill="var(--color-ia)" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="humano" stackId="workload" fill="var(--color-humano)" radius={[0, 0, 10, 10]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">O que aparece em Reports</div>
            <div className="mt-3 space-y-2">
              <Bullet>Tempo de primeira resposta por canal e por etapa (IA vs humano).</Bullet>
              <Bullet>Conversão por etapa, origem e responsável — com histórico.</Bullet>
              <Bullet>No-show, remarcações e fila de espera por período.</Bullet>
              <Bullet>Motivos de perda e recomendações acionáveis geradas por IA.</Bullet>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              Dados e metas são ilustrativos nesta proposta. Ajustamos após a imersão e leitura dos dados reais da CM Remédios.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
