Template de Propostas — Guia do Projeto

Visão Geral
- Proposta interativa (landing + modais) com conteúdo adaptável por cliente.
- Documento-base de negócio: `public/docs/arquitetura.md` (gargalos, soluções, métricas, fluxos, investimentos).

Stack
- Next.js 16 (App Router) + React 19.2 (sem SSR nos fluxos via dynamic).
- Tailwind v4 com `@theme inline`.
- Framer Motion (animações), Lucide (ícones), React Flow (fluxos).

Execução
- Requisitos: Node >= 20.9.0.
- Scripts: `npm run dev` (http://localhost:3001), `npm run build` (Turbopack), `npm start` (produção).

Arquivos-Chave
- `src/app/layout.tsx`: fontes Geist + Montserrat, idioma `pt-BR`, metadata.
- `src/app/page.tsx`: seções, âncoras, CTAs e dispatch de `ModalKind`.
  - Campos do cliente: `preparedFor = "Dr. Maurício Ernesto"`, `proposalDate = "Outubro 2025"`.
- `src/app/components/Modal.tsx`: modal animado (`size="full" | "md"`, ESC/overlay, `focus-trap`, `aria-modal`, `titleAlign`).
- `src/app/components/FlowDiagram.tsx`: React Flow (`FlowKind = "agendamento" | "triagem-noshow" | "faq"`), `nodesAndEdges`, `MiniMap/Controls/Background`, `useReducedMotion`.
- `src/app/components/modal-content/*`: conteúdos de modais (CRM, Dashboard, ROI, fases, ganhos, etc.).
- `src/app/globals.css`: tokens (`--prime-*`), utilitários `.section`, `.section-title`, `.subtitle`, `.card`, `.badge`, `.btn-primary`, `.hero-kicker`, estilos de nós `.flow-node*`.
- `public/branding/logo.svg`: logo oficial do cliente (nav/hero).

Branding e Tema
- Cores: `--prime-primary: #041e42`, `--prime-accent: #41b6e6`, `--prime-dark: #041e42`.
- Contrast AA, uso prioritário de tokens, evitar hardcode de cores.
- Ícones Lucide (16–20px) principais: `CalendarCheck2`, `BellRing`, `MessageSquare`, `Stethoscope`, `KanbanSquare`, `BarChart3`, `Trophy`, `Brain`, `Lightbulb`, `FileBarChart`, `UserRound`, `Sparkles`, `PanelsTopLeft`, `CheckCircle2`, `Gauge`, `Target`, `ShieldCheck`, `AlertTriangle`, `Clock3`, `Zap`.

Mapa das Seções (page.tsx)
- Nav/Header: logo `/branding/logo.svg`; âncoras `#quem-somos #desafio #solucoes #fluxos #plano #ganhos #investimento #cta`.
- Hero: kicker “PROPOSTA DE SOLUÇÃO COM IA”, título “Agentes de IA para Atendimento Comercial”, subtítulo de automação ponta a ponta; badges `preparedFor`/`proposalDate`; logo em destaque.
- Quem Somos: Convert.AI, marketing médico + IA.
- Desafio: 4 dores (150 leads/dia, agendas Tasy + particular, zero visibilidade, follow-up lento).
- Soluções: 4 blocos (SDR + Agendamento, FAQ Inteligente, Anti No-Show, CRM + Agenda + Dashboard) + painéis “Soluções Inteligentes” e “Confiabilidade e Segurança”.
- Fluxos e Ferramentas: cards de agentes (abrem modais `solution` com `kind="agendamento" | "triagem-noshow" | "faq"`) e cards de CRM/Dashboard.
- Ganhos: cards com CTAs para modais `conquistas`, `inteligencia`, `insights`, `relatorios` (métricas ilustrativas).
- ROI: card para modal `roi` (simulações de faturamento e redução de custos; base R$ 30.000).
- Investimento (layout atualizado):
  - Linha 1 (grid 3 colunas): módulos individuais
    - FAQ Inteligente — Setup R$ 10.000; Mensal R$ 800/mês; Tira-dúvidas 24/7, Base de Conhecimento Educacional.
    - SDR + Agendamento (tag “Core / Principal”) — Setup R$ 20.000; Mensal R$ 2.200/mês; Qualificação de Leads, Integração Tasy (Leitura/Escrita).
    - Anti No-Show — Setup R$ 10.000; Mensal R$ 1.000/mês; Confirmação D-2 e D-1, Gestão de Fila de Espera.
  - Linha 2 (grid 2 colunas):
    - Ecossistema Full (destaque visual): tag “Melhor Custo-Benefício”; Setup de R$ 40.000 por R$ 25.000 (-37%); Mensal de R$ 4.000/mês por R$ 2.500/mês; benefícios: SDR + Agendamento, FAQ Inteligente, Anti No-Show, Integração Tasy Completa, CRM + Dashboard Executivo, Treinamento + 30 dias assistidos; CTA “Selecionar Pacote Completo”.
    - Condições de Pagamento: Setup A/B/C (à vista 5% off PIX/TED; entrada + 4 boletos; até 3x sem juros cartão corporativo); Mensalidade inicia 30 dias após Go-Live; boleto mensal ou PIX recorrente; disclaimer cobrindo servidores/BD/suporte/backups/manutenção.
- Plano: 4 fases (Imersão/Arquitetura; Desenvolvimento dos Agentes; Integrações/Painéis; Go-Live) com CTAs para modal `phases`.
- CTA final: passos Alinhamento → Aprovação → Início; CTA para formalizar contratação e modal de fases.

Mapa de Modais e Conteúdos
- `solution`: fluxos em tela cheia via `FlowDiagramLazy` (`agendamento`, `triagem-noshow`, `faq`), respeitando `useReducedMotion`.
- `crm` (`CRMModalContent.tsx`): visão executiva com seleção de período/filtro + badge IA, cards de SLA/pipeline, alertas, sidebar de funis (principal/followup/agendados), colunas Kanban com prioridade, próximo passo, notas, SLA, status/hora/origem.
- `dashboard` (`DashboardModalContent.tsx`): abas overview/funil/agendamentos/insights; KPIs com metas/barras; status operação (SLA 6 min, bots 24/7, LGPD); funil com perdas/ações; agenda diária e distribuição particular/convênio; insights com ações rápidas, alerta crítico, objeção principal, melhor canal, tendência positiva.
- `phases` (`PhaseDetailModalContent.tsx`): objetivos, atividades, integrações, entregáveis, riscos e premissas por fase (1–4).
- `conquistas`, `inteligencia`, `insights`, `relatorios`: ganhos operacionais, inteligência em tempo real, recomendações acionáveis, relatórios executivo/granular.
- `etapa`: etapas 1–4 (Recepção, SDR, Triagem, Atendimento).
- `roi`: simulador de ROI (faturamento e redução de custos; ROI 12 meses).
- `valueinfo`: comparativo “Gestão às cegas vs Gestão inteligente” (inline em `page.tsx`).

Fluxos (React Flow) — editar/criar
- `FlowDiagram.tsx`: atualizar `FlowKind`, `nodesAndEdges` e seções da página ao adicionar fluxo.
- Boas práticas: 6–12 nós, títulos curtos, `.flow-node*`, `fitViewOptions`, `MiniMap/Controls/Background`, evitar poluição visual.

Estilo e Conteúdo
- Linguagem: pt-BR, tom consultivo e direto.
- Código: TypeScript, nomes descritivos, evitar comentários supérfluos.
- CSS: usar tokens do tema; Tailwind v4 (`@theme inline`) para cores/spacing/tipografia.
- Acessibilidade: `alt` descritivo, contraste AA, respeitar `prefers-reduced-motion`.
- Desempenho: priorizar SVGs, evitar imagens pesadas; React Flow carregado sem SSR.

Checklist de Entrega (status deste projeto)
- [x] `preparedFor`/`proposalDate` atualizados.
- [x] `logo.svg` do cliente aplicado.
- [x] `--prime-*` ajustadas no tema.
- [x] Textos revisados com base em `public/docs/arquitetura.md`.
- [x] Contraste e responsividade validados.
- [x] Métricas ilustrativas com disclaimers.
- [x] Seção de Investimento atualizada (3 módulos + pacote full + condições).
