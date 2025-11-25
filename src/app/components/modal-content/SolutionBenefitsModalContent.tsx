"use client";

import { CheckCircle2, TrendingUp, Clock, ShieldCheck, DollarSign } from "lucide-react";

type SolutionType = "agendamento" | "faq" | "triagem-noshow" | "pesquisa";

type Props = {
    solution: SolutionType;
};

const benefitsData = {
    agendamento: {
        title: "SDR & Agendamento Inteligente",
        description: "Automatize a recepção e qualificação de pacientes 24/7.",
        benefits: [
            {
                icon: Clock,
                title: "Atendimento Imediato (0s)",
                desc: "Elimine o tempo de espera. O paciente é atendido no momento em que envia a mensagem, aumentando a conversão.",
            },
            {
                icon: TrendingUp,
                title: "Aumento de 40% na Conversão",
                desc: "Captura leads fora do horário comercial e garante que nenhuma oportunidade seja perdida por demora na resposta.",
            },
            {
                icon: DollarSign,
                title: "Qualificação Automática",
                desc: "Separa convênio de particular e prioriza tickets altos, otimizando a agenda dos médicos.",
            },
        ],
    },
    faq: {
        title: "FAQ Inteligente & Educacional",
        description: "Tire dúvidas instantaneamente e reduza a carga operacional.",
        benefits: [
            {
                icon: ShieldCheck,
                title: "Redução de 80% no Suporte",
                desc: "A IA responde dúvidas repetitivas (preparo, endereço, valores) liberando a equipe para casos complexos.",
            },
            {
                icon: CheckCircle2,
                title: "Precisão na Informação",
                desc: "Base de conhecimento treinada com os protocolos da clínica, garantindo respostas padronizadas e corretas.",
            },
            {
                icon: Clock,
                title: "Disponibilidade 24h",
                desc: "Pacientes tiram dúvidas a qualquer hora, reduzindo a ansiedade e aumentando a confiança na clínica.",
            },
        ],
    },
    "triagem-noshow": {
        title: "Pré-triagem & Anti No-Show",
        description: "Garanta que o paciente compareça à consulta agendada.",
        benefits: [
            {
                icon: TrendingUp,
                title: "Redução de 50% no No-Show",
                desc: "Confirmações automáticas em D-2 e D-1 com reengajamento inteligente via WhatsApp.",
            },
            {
                icon: DollarSign,
                title: "Recuperação de Receita",
                desc: "Preenche horários vagos automaticamente com lista de espera, evitando buracos na agenda.",
            },
            {
                icon: CheckCircle2,
                title: "Triagem Clínica Prévia",
                desc: "Coleta informações essenciais antes da consulta, agilizando o atendimento médico.",
            },
        ],
    },
    pesquisa: {
        title: "Pós-venda & Satisfação",
        description: "Fidelize pacientes e construa uma reputação online sólida.",
        benefits: [
            {
                icon: TrendingUp,
                title: "Aumento de Avaliações 5 Estrelas",
                desc: "Direciona promotores (NPS alto) para avaliar no Google, melhorando o ranqueamento da clínica.",
            },
            {
                icon: ShieldCheck,
                title: "Gestão de Crise",
                desc: "Identifica detratores e alerta a gerência antes que uma reclamação pública seja feita.",
            },
            {
                icon: DollarSign,
                title: "LTV (Lifetime Value) Maior",
                desc: "Pacientes satisfeitos retornam e indicam novos pacientes, gerando um ciclo virtuoso de receita.",
            },
        ],
    },
};

export default function SolutionBenefitsModalContent({ solution }: Props) {
    const data = benefitsData[solution];

    if (!data) return null;

    return (
        <div className="h-full bg-slate-50 p-6 md:p-10 overflow-auto">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{data.title}</h2>
                    <p className="text-slate-600 text-lg">{data.description}</p>
                </div>

                <div className="grid gap-6">
                    {data.benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-start gap-4 hover:border-prime-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-prime/10 flex items-center justify-center shrink-0">
                                <benefit.icon className="h-6 w-6 text-prime" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{benefit.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                    <p className="text-emerald-800 font-medium">
                        💡 Essa solução se paga sozinha apenas com a recuperação de oportunidades perdidas.
                    </p>
                </div>
            </div>
        </div>
    );
}
