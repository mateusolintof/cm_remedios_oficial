"use client";

export default function PhaseDetailModalContent({ phase }: { phase: 1 | 2 | 3 | 4 }) {
  const phaseData = {
    1: {
      title: "Fase 1: Planejamento e Setup",
      focus: "Alinhamento de regras de negócio e infraestrutura.",
      deliverables: [
        "Documento de Arquitetura dos Fluxos (SDR e FAQ)",
        "Configuração do Ambiente (WhatsApp Business API)",
        "Definição da Árvore de Decisão (Triagem)",
        "Cronograma detalhado de implantação"
      ]
    },
    2: {
      title: "Fase 2: Desenvolvimento e Integração",
      focus: "Construção dos agentes e conexão com sistemas.",
      deliverables: [
        "Agente SDR e FAQ operacionais em ambiente de homologação",
        "Módulo de integração com ERP (Leitura/Escrita)",
        "Setup do CRM com funil personalizado",
        "Configuração das réguas de No-Show (D-2, D-1)"
      ]
    },
    3: {
      title: "Fase 3: Validação e Treinamento",
      focus: "Garantia de qualidade e preparação da equipe.",
      deliverables: [
        "Bateria de testes assistidos (Simulação de cenários)",
        "Treinamento da equipe de recepção (Operação do CRM)",
        "Playbook de Atendimento Híbrido (IA + Humano)",
        "Ajustes finos de tom de voz e respostas"
      ]
    },
    4: {
      title: "Fase 4: Go-Live e Estabilização",
      focus: "Início da operação oficial e monitoramento.",
      deliverables: [
        "Virada de chave para produção",
        "Monitoramento intensivo (Hypercare) por 30 dias",
        "Relatório de performance da primeira semana",
        "Entrega oficial do projeto e acessos administrativos"
      ]
    }
  };

  const data = phaseData[phase];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
        <p className="text-slate-600 text-sm font-medium">{data.focus}</p>
      </div>

      <div>
        <h4 className="font-bold text-prime mb-4 flex items-center gap-2">
          📋 Entregáveis da Fase
        </h4>
        <ul className="space-y-3">
          {data.deliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded border border-slate-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}