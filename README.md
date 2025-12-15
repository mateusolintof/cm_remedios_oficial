Proposta — Dr. Maurício Ernesto • Agentes de IA para Atendimento Comercial

Este repositório é uma instância do template de propostas interativas da Convert.AI, adaptado para o projeto do **Dr. Maurício Ernesto** com foco em **Agentes de IA para Atendimento Comercial** (SDR, FAQ, Anti No‑Show, CRM + Agenda Unificada + Dashboard + Fluxos/ROI).

Stack
- Next.js 16 (App Router) + React 19.2
- Tailwind v4 com `@theme inline`
- Framer Motion (animações)
- Lucide (ícones)
- React Flow (fluxogramas interativos)

Execução (porta 3001)
- Requisitos: Node >= 20.9.0
- Instalação: `npm install`
- Desenvolvimento: `npm run dev` → http://localhost:3001
- Build: `npm run build`
- Produção: `npm start`

Identidade e Tema
- Cores em `src/app/globals.css`: `--prime-primary: #041e42`, `--prime-accent: #41b6e6`, `--prime-dark: #041e42`.
- Utilitários globais: `.section`, `.section-title`, `.subtitle`, `.card`, `.badge`, `.btn-primary`, `.hero-kicker`.
- Fontes: Geist + Montserrat definidas em `src/app/layout.tsx`.
- Logo: `public/branding/logo.svg` (cliente) usado em nav/hero.

Arquivos Principais
- `src/app/layout.tsx`: fontes, idioma `pt-BR`, metadata.
- `src/app/page.tsx`: estrutura de seções, navegação por âncoras, controle de `ModalKind`, CTAs.
  - Campos do cliente: `preparedFor = "Dr. Maurício Ernesto"`, `proposalDate = "Outubro 2025"`.
- `src/app/components/Modal.tsx`: modal animado (`size="full"` e `size="md"`, ESC/overlay, `focus-trap`, `aria-modal`, `titleAlign`).
- `src/app/components/FlowDiagram.tsx`: fluxos React Flow (`FlowKind = "agendamento" | "triagem-noshow" | "faq"`), `nodesAndEdges`, `MiniMap`, `Controls`, `Background` (sem SSR via dynamic import).
- `src/app/components/modal-content/*`: conteúdos por modal (ver mapa abaixo).
- `public/docs/arquitetura.md`: narrativa de gargalos/soluções/KPIs de negócio.

Mapa de Seções (page.tsx)
- Nav/Header: logo cliente + âncoras `#quem-somos`, `#desafio`, `#solucoes`, `#fluxos`, `#plano`, `#ganhos`, `#investimento`, `#cta`.
- Hero: kicker “PROPOSTA DE SOLUÇÃO COM IA”, título “Agentes de IA para Atendimento Comercial”, subtítulo de automação ponta a ponta, badges `preparedFor` + `proposalDate`, logo em destaque.
- Quem Somos: história Convert.AI e foco em marketing médico + IA.
- Desafio: 4 dores (150 leads/dia sem qualificação, agendas Tasy + particular desconectadas, zero visibilidade, follow-up lento).
- Soluções: 4 blocos (SDR + Agendamento, FAQ Inteligente, Anti No‑Show, CRM + Agenda + Dashboard) + painéis “Soluções Inteligentes” e “Confiabilidade e Segurança”.
- Fluxos e Ferramentas: cards de agentes (abre modais de fluxo `solution` com `kind="agendamento" | "triagem-noshow" | "faq"`) e cards de ferramentas (CRM/Dashboard).
- Ganhos Esperados: 4 cards com CTAs para modais `conquistas`, `inteligencia`, `insights`, `relatorios` (métricas ilustrativas alinhadas ao doc).
- ROI: card com CTA para modal `roi` (simulação de faturamento e redução de custos).
- Investimento: novo layout em 2 linhas
  - Linha 1 (grid 3 colunas): módulos individuais
    - FAQ Inteligente — Setup R$ 10.000; Mensal R$ 800/mês; inclusos: Tira-dúvidas 24/7, Base de Conhecimento Educacional.
    - SDR + Agendamento (tag “Core / Principal”) — Setup R$ 20.000; Mensal R$ 2.200/mês; inclusos: Qualificação de Leads, Integração Tasy (Leitura/Escrita).
    - Anti No-Show — Setup R$ 10.000; Mensal R$ 1.000/mês; inclusos: Confirmação D-2 e D-1, Gestão de Fila de Espera.
  - Linha 2 (grid com destaque + condições):
    - Ecossistema Full (3 colunas): tag “Melhor Custo-Benefício”; Setup de R$ 40.000 por R$ 25.000 (-37% OFF); Mensal de R$ 4.000/mês por R$ 2.500/mês; benefícios: SDR + Agendamento, FAQ Inteligente, Anti No-Show, Integração Tasy Completa, CRM + Dashboard Executivo, Treinamento + 30 dias assistidos; CTA “Selecionar Pacote Completo”.
    - Condições (2 colunas): título “Condições de Pagamento”; Setup opções A/B/C (à vista 5% off PIX/TED; entrada + 4 boletos; até 3x s/juros cartão corporativo); Mensalidade: começa 30 dias após Go-Live; boleto ou PIX recorrente; disclaimer cobrindo servidores/BD/suporte/backups/manutenção.
- Plano: 4 fases (Imersão/Arquitetura, Desenvolvimento de Agentes, Integrações/Painéis, Testes/Go-Live) com modais `phases`.
- CTA: passos Alinhamento → Aprovação → Início; CTA final + link para especialista.

Mapa de Modais
- `solution`: fluxos em tela cheia via `FlowDiagram` (`agendamento`, `triagem-noshow`, `faq`), com `useReducedMotion`.
- `crm` (`CRMModalContent.tsx`): visão executiva com filtro de período/IA ligada, cards de SLA/pipeline, alertas, sidebar de funis (principal/follow-up/agendados), colunas Kanban com prioridade, próximo passo, notas, SLA e status.
- `dashboard` (`DashboardModalContent.tsx`): abas overview/funil/agendamentos/insights; KPI cards com metas e barras; status operação (SLA/bots/LGPD); funil completo com perdas/ações; agenda diária e distribuição particular/convênio; insights com ações rápidas e oportunidades críticas.
- `phases` (`PhaseDetailModalContent.tsx`): objetivos, atividades, integrações, entregáveis, riscos, premissas por fase (1–4).
- `conquistas`, `inteligencia`, `insights`, `relatorios`: ganhos operacionais, inteligência em tempo real, recomendações acionáveis, relatórios (executivo + granular).
- `etapa`: etapas 1–4 (Recepção, SDR, Triagem, Atendimento).
- `roi`: simulador de ROI (faturamento e redução de custos; ROI 12 meses).
- `valueinfo`: comparativo de gestão às cegas vs gestão inteligente (inline em `page.tsx`).

Fluxos (React Flow)
- `FlowDiagram.tsx`: `nodesAndEdges(kind)` retorna nós/arestas por fluxo.
- Boas práticas: 6–12 nós, títulos curtos, classes `.flow-node*`, `fitViewOptions`, `MiniMap/Controls/Background`.

Ícones
- Lucide principais: `CalendarCheck2`, `BellRing`, `MessageSquare`, `Stethoscope`, `KanbanSquare`, `BarChart3`, `Trophy`, `Brain`, `Lightbulb`, `FileBarChart`, `UserRound`, `Sparkles`, `PanelsTopLeft`, `CheckCircle2`, `Gauge`, `Target`, `ShieldCheck`, `AlertTriangle`, `Clock3`, `Zap`, `Sparkles`.

Para replicar ou adaptar, veja também `AGENTS.md` (guia completo do template, checklist e branding).
