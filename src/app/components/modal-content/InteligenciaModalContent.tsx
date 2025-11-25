"use client";

export default function InteligenciaModalContent() {
  return (
    <div className="p-6 space-y-6">
      <p className="text-slate-600 text-sm">
        Hoje, cada ligação, mensagem e agendamento geram dados que se perdem em planilhas, relatórios do Tasy ou na cabeça da equipe.
        A inteligência de dados desta solução junta tudo isso automaticamente e transforma em respostas claras para a operação e para a gestão.
      </p>

      <div className="space-y-4">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
            O que é essa inteligência de dados?
          </div>
          <div className="p-4 bg-white text-sm text-slate-600 space-y-2">
            <p>
              Em vez de ser apenas um chatbot que responde perguntas, o agente de IA passa a ser um coletor e organizador de dados do consultório.
            </p>
            <p>
              Ele cruza automaticamente informações de leads, campanhas, conversas e agenda (Tasy e particular) e entrega uma visão única:
              de onde vêm os pacientes, quem agenda, quem falta e quem volta.
            </p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
            O que a IA faz nos bastidores
          </div>
          <div className="p-4 bg-white text-sm text-slate-600 space-y-2">
            <div className="flex gap-3 border-b border-slate-50 pb-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
              <p>
                Classifica automaticamente cada contato por canal (WhatsApp, telefone, campanhas digitais), tipo de paciente e motivo do contato.
              </p>
            </div>
            <div className="flex gap-3 border-b border-slate-50 pb-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
              <p>
                Conecta esses contatos com a agenda real (quem agendou, remarcou, faltou ou compareceu), sem depender de planilhas manuais.
              </p>
            </div>
            <div className="flex gap-3 border-b border-slate-50 pb-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
              <p>
                Calcula automaticamente indicadores como custo por lead, taxa de conversão em consulta, perfil de paciente mais rentável e motivos de no-show.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
              <p>
                Atualiza painéis e alertas em tempo quase real, para que a equipe consiga agir no mesmo dia, e não meses depois.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
            Como isso aparece no dia a dia
          </div>
          <div className="p-4 bg-white text-sm text-slate-600 space-y-2">
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span>Aquisição (Marketing)</span>
              <span className="font-medium text-slate-900 text-right">
                Mostra em quais canais vale a pena investir ou reduzir verba, com base em pacientes que de fato agendam e comparecem.
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span>Retenção (Qualidade)</span>
              <span className="font-medium text-slate-900 text-right">
                Agrupa os principais motivos de no-show e acompanha satisfação (pós-consulta), apontando onde a experiência precisa ser ajustada.
              </span>
            </div>
            <div className="flex justify-between">
              <span>Recorrência e Valor gerado</span>
              <span className="font-medium text-slate-900 text-right">
                Identifica quais perfis de pacientes retornam mais e geram maior faturamento ao longo do tempo.
              </span>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
            Qual o resultado disso para o consultório?
          </div>
          <div className="p-4 bg-white text-sm text-slate-600 space-y-2">
            <div className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
              <p>
                Menos dinheiro desperdiçado em campanhas que geram muitos leads e poucas consultas efetivas.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
              <p>
                Agenda mais cheia com o perfil de paciente ideal, com maior probabilidade de comparecimento e retorno.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
              <p>
                Decisões menos baseadas em impressão e mais baseadas em números claros, alimentando os painéis de CRM, Dashboard Executivo e simulações de ROI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
