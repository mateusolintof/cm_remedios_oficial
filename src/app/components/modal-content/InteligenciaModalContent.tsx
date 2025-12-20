"use client";

import type { ReactNode } from "react";
import { BarChart3, Link2, Sparkles } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const channelData = [
  { key: "whatsapp", label: "WhatsApp", value: 42 },
  { key: "instagram", label: "Instagram", value: 26 },
  { key: "google", label: "Google", value: 20 },
  { key: "indicacao", label: "Indicação", value: 12 },
] as { key: string; label: string; value: number }[];

const channelChartConfig = {
  whatsapp: { label: "WhatsApp", color: "var(--prime-accent)" },
  instagram: { label: "Instagram", color: "color-mix(in oklab, var(--prime-primary) 75%, var(--prime-accent))" },
  google: { label: "Google", color: "color-mix(in oklab, var(--prime-primary) 65%, white)" },
  indicacao: { label: "Indicação", color: "color-mix(in oklab, var(--prime-accent) 55%, white)" },
} satisfies ChartConfig;

const noshowReasonData = [
  { label: "Sem confirmação", value: 34 },
  { label: "Dúvida de preparo", value: 22 },
  { label: "Horário inadequado", value: 18 },
  { label: "Convênio pendente", value: 14 },
  { label: "Outros", value: 12 },
] as { label: string; value: number }[];

const noshowChartConfig = {
  value: { label: "Incidência", color: "var(--prime-accent)" },
} satisfies ChartConfig;

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-slate-700">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prime-accent/70" aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function InteligenciaModalContent() {
  return (
    <div className="p-6">
      <div className="text-sm text-slate-600">
        Em vez de “olhar no achismo”, a solução transforma conversas e agenda (Tasy + particular) em uma visão única: origem, intenção, etapa, motivo de perda e próxima ação.
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: <Sparkles className="h-5 w-5" />,
            title: "Classificação automática",
            desc: "Canal, intenção, perfil e tipo de paciente — sem digitação manual.",
          },
          {
            icon: <Link2 className="h-5 w-5" />,
            title: "Conciliação com agenda",
            desc: "Sabe quem agendou, remarcou, faltou ou compareceu — com rastreio por origem.",
          },
          {
            icon: <BarChart3 className="h-5 w-5" />,
            title: "Insights acionáveis",
            desc: "Relatórios e recomendações para agir no mesmo dia, não no fim do mês.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-prime-accent/10 text-prime">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900">{item.title}</div>
                <div className="mt-1 text-sm text-slate-600">{item.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900">Distribuição por canal (exemplo)</div>
              <div className="mt-1 text-xs text-slate-500">Ajuda a priorizar investimento por lead que vira consulta.</div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
            <ChartContainer config={channelChartConfig} className="h-40 w-full">
              <PieChart>
                <Pie data={channelData} dataKey="value" nameKey="label" innerRadius={44} outerRadius={72} paddingAngle={4}>
                  {channelData.map((entry) => (
                    <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent nameKey="label" />} />
              </PieChart>
            </ChartContainer>

            <div className="space-y-2 text-sm text-slate-700">
              {channelData.map((entry) => (
                <div key={entry.key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `var(--color-${entry.key})` }} />
                    <span className="font-medium text-slate-900">{entry.label}</span>
                  </div>
                  <span className="text-slate-600">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900">Motivos de no-show (exemplo)</div>
              <div className="mt-1 text-xs text-slate-500">Direciona ajustes de confirmação, preparo e fila de espera.</div>
            </div>
          </div>

          <div className="mt-4">
            <ChartContainer config={noshowChartConfig} className="h-56 w-full">
              <BarChart data={noshowReasonData} layout="vertical" margin={{ left: 0, right: 18, top: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="label" width={140} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent nameKey="label" />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={10} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-sm font-semibold text-slate-900">Perguntas que passam a ter resposta rápida</div>
        <div className="mt-3 space-y-2">
          <Bullet>Quais canais trazem pacientes que agendam e comparecem (e não só volume)?</Bullet>
          <Bullet>Em que etapa do funil estamos perdendo mais e por quê?</Bullet>
          <Bullet>Quais horários/profissionais têm mais remarcação ou no-show?</Bullet>
          <Bullet>Qual mensagem/objeção mais trava o agendamento e qual resposta converte melhor?</Bullet>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Dados e exemplos são ilustrativos para demo comercial. Ajustamos métricas e painéis após a imersão e leitura dos dados reais.
      </div>
    </div>
  );
}
