"use client";

import React, {useMemo, useRef, useState, useEffect} from "react";
import {
    Boxes,
    Brain,
    Bug,
    CheckCircle2,
    Cloud,
    Code2,
    Database,
    FileText,
    GitBranch,
    Headphones,
    Layers,
    Megaphone,
    Package,
    PlayCircle,
    Rocket,
    Server,
    Settings,
    Shield,
    ShoppingCart,
    Target,
    Users,
    Wrench,
    Workflow,
    Zap
} from "lucide-react";
import Link from "next/link";

// Importação dinâmica para evitar problemas de SSR
let htmlToImage: any = null;

/**
 * Process Landscape Model — Software Development Company
 * Visual, interactive map with 3 swimlanes: Core, Support, Management.
 * - Detail levels (L1/L2/L3)
 * - Search/Highlight
 * - Export to PNG
 * TailwindCSS styling; no external UI framework required.
 */

const CATS = {
    core: {title: "Processos de Negócio (Core)", color: "indigo"},
    support: {title: "Processos de Suporte", color: "emerald"},
    management: {title: "Processos de Gestão", color: "amber"}
} as const;

type Activity = string;

type Subprocess = {
    name: string;
    activities?: Activity[];
};

type Proc = {
    name: string;
    icon: React.ComponentType<any>;
    subprocesses?: Subprocess[];
};

type Landscape = {
    flow: string[]; // top macro-sequence (core)
    core: Proc[];
    support: Proc[];
    management: Proc[];
};

const DATA: Landscape = {
    flow: [
        "Gestão de Portfólio & Demanda",
        "Engenharia de Requisitos",
        "Arquitetura & Design",
        "Desenvolvimento",
        "Testes & QA",
        "Entrega & Deploy",
        "Suporte & Manutenção"
    ],
    core: [
        {
            name: "Gestão de Portfólio & Demanda",
            icon: Boxes,
            subprocesses: [
                {name: "Análise de mercado", activities: ["Benchmark", "Segmentação", "Proposta de valor"]},
                {name: "Pipeline de propostas", activities: ["Triagem", "Business case", "Viabilidade"]},
                {name: "Roadmap & Priorização", activities: ["OKRs", "Capacidade", "Alocação"]}
            ]
        },
        {
            name: "Engenharia de Requisitos",
            icon: FileText,
            subprocesses: [
                {name: "Levantamento", activities: ["Entrevistas", "Workshops", "Observação"]},
                {name: "Modelagem & Especificação", activities: ["User stories", "Casos de uso", "BPMN/UML"]},
                {name: "Validação & Backlog", activities: ["Prototipação", "Aceite", "Refinamento"]}
            ]
        },
        {
            name: "Arquitetura & Design",
            icon: Layers,
            subprocesses: [
                {name: "Arquitetura de referência", activities: ["Padrões", "Guidelines", "Security by design"]},
                {name: "Dados & Integrações", activities: ["Modelo de dados", "APIs/Contratos", "Mensageria"]},
                {name: "Provas de conceito", activities: ["Spike técnico", "Protótipos", "Trade-offs"]}
            ]
        },
        {
            name: "Desenvolvimento",
            icon: Code2,
            subprocesses: [
                {name: "Implementação", activities: ["Frontend", "Backend", "Mobile"]},
                {name: "Versionamento & PRs", activities: ["Branches", "Reviews", "Conv. de commits"]},
                {name: "Build & Artefatos", activities: ["Empacotamento", "Imagem Docker", "SBOM"]}
            ]
        },
        {
            name: "Testes & QA",
            icon: CheckCircle2,
            subprocesses: [
                {name: "Planejamento", activities: ["Estratégia", "Matriz de testes", "Critérios de saída"]},
                {name: "Testes funcionais", activities: ["Unitário", "Integração", "E2E"]},
                {name: "Testes não-funcionais", activities: ["Performance", "Segurança", "Usabilidade"]}
            ]
        },
        {
            name: "Entrega & Deploy",
            icon: Rocket,
            subprocesses: [
                {name: "CI/CD", activities: ["Pipelines", "Artefatos assinados", "Gate de qualidade"]},
                {name: "Gestão de ambientes", activities: ["DEV/QA/UAT/PROD", "Infra como código", "Observabilidade"]},
                {name: "Release & Rollback", activities: ["Blue/Green", "Canary", "Versionamento"]}
            ]
        },
        {
            name: "Suporte & Manutenção",
            icon: Headphones,
            subprocesses: [
                {name: "Monitoramento", activities: ["Logs/Métricas/Tracing", "APM", "Alertas"]},
                {name: "Gestão de incidentes", activities: ["Nível 1/2/3", "SLA/OLA", "Post-mortem"]},
                {name: "Evolução contínua", activities: ["Hotfixes", "Refatorações", "Tech debt"]}
            ]
        }
    ],
    support: [
        {
            name: "Gestão de Pessoas",
            icon: Users,
            subprocesses: [
                {name: "Aquisição de talentos", activities: ["Recrutamento", "Seleção", "Onboarding"]},
                {name: "Desenvolvimento", activities: ["Trilha de carreira", "Treinamentos", "Mentorias"]},
                {name: "Performance & Cultura", activities: ["Feedback 360º", "Engajamento", "Reconhecimento"]}
            ]
        },
        {
            name: "TI Interna & Segurança",
            icon: Shield,
            subprocesses: [
                {name: "Infra corporativa", activities: ["Redes/Servidores", "Gestão de acessos", "Backups"]},
                {name: "Segurança da Informação", activities: ["Políticas", "LGPD", "ISO 27001"]},
                {name: "Licenças & Ativos", activities: ["Inventário", "Compliance", "Custos"]}
            ]
        },
        {
            name: "Financeiro & Controladoria",
            icon: Package,
            subprocesses: [
                {name: "Orçamento", activities: ["Planejamento", "Forecast", "Capex/Opex"]},
                {name: "Projetos & Custos", activities: ["Rateio", "Centro de custo", "Margem"]},
                {name: "Faturamento & Cobrança", activities: ["Contratos", "Notas", "Recebíveis"]}
            ]
        },
        {
            name: "Compras & Fornecedores",
            icon: ShoppingCart,
            subprocesses: [
                {name: "Sourcing & Homologação", activities: ["RFI/RFP", "Due diligence", "Risco de terceiros"]},
                {name: "Negociação & Contratos", activities: ["SLAs", "Penalidades", "Renovações"]},
                {name: "Gestão de performance", activities: ["KPIs", "QBR", "Catálogo"]}
            ]
        },
        {
            name: "Marketing & Vendas",
            icon: Megaphone,
            subprocesses: [
                {name: "Geração de demanda", activities: ["Conteúdo", "Eventos", "Parcerias"]},
                {name: "Propostas comerciais", activities: ["Escopo", "Precificação", "Termos"]},
                {name: "CRM & Relacionamento", activities: ["Funil", "NPS", "Expansion/Up-sell"]}
            ]
        },
        {
            name: "Gestão do Conhecimento",
            icon: Brain,
            subprocesses: [
                {name: "Documentação", activities: ["Padrões", "Playbooks", "Arquiteturas"]},
                {name: "Lições aprendidas", activities: ["Post-mortem", "KEDB", "Comunidades"]},
                {name: "Reuso & Boas práticas", activities: ["Templates", "Boilerplates", "SDKs"]}
            ]
        }
    ],
    management: [
        {
            name: "Gestão Estratégica",
            icon: Target,
            subprocesses: [
                {name: "Planejamento & Portfólio", activities: ["Visão & metas", "Roadmap", "Governança"]},
                {name: "OKRs & KPIs", activities: ["Definição", "Acompanhamento", "Resultados"]},
                {name: "Análise competitiva", activities: ["Mercado", "Tendências", "Riscos externos"]}
            ]
        },
        {
            name: "Gestão da Qualidade",
            icon: Settings,
            subprocesses: [
                {name: "Políticas & Padrões", activities: ["ISO/CMMI/MPS.BR", "Guia de dev", "Definition of Done"]},
                {name: "Auditorias & Métricas", activities: ["Process audit", "Lead time", "Defect rate"]},
                {name: "Melhoria contínua", activities: ["Kaizen", "PDCA", "Benchmark interno"]}
            ]
        },
        {
            name: "Gestão de Riscos & Compliance",
            icon: Shield,
            subprocesses: [
                {name: "Riscos de projeto", activities: ["Identificação", "Mitigação", "Owners"]},
                {name: "Compliance & Legal", activities: ["LGPD", "Contratos", "Auditorias"]},
                {name: "Continuidade", activities: ["BCP/DRP", "Backups", "Testes de recuperação"]}
            ]
        },
        {
            name: "Inovação & P&D",
            icon: Zap,
            subprocesses: [
                {name: "Exploração tecnológica", activities: ["Labs", "Hackathons", "Pilotos"]},
                {name: "Adoção de frameworks", activities: ["Arquiteturas modernas", "Ferramentas", "Automação"]},
                {name: "ROI da inovação", activities: ["Hipóteses", "Métricas", "Escalonamento"]}
            ]
        }
    ]
};

function classFor(color: string) {
    const map: Record<string, { border: string; header: string; badge: string }> = {
        indigo: {border: "border-indigo-200", header: "bg-indigo-50", badge: "bg-indigo-100 text-indigo-800"},
        emerald: {border: "border-emerald-200", header: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-800"},
        amber: {border: "border-amber-200", header: "bg-amber-50", badge: "bg-amber-100 text-amber-800"}
    };
    return map[color] ?? map.indigo;
}

function Section({title, color, children}: { title: string; color: keyof typeof CATS; children: React.ReactNode }) {
    const c = classFor(CATS[color].color);
    return (
        <section className={`rounded-2xl border ${c.border} bg-white shadow-sm overflow-hidden`}
                 aria-label={title}>
            <div className={`px-4 py-3 ${c.header} border-b ${c.border}`}>
                <h2 className="text-sm font-semibold tracking-wide text-gray-900">{title}</h2>
            </div>
            <div className="p-4">{children}</div>
        </section>
    );
}

function ProcCard({proc, detailLevel, color, query}: {
    proc: Proc;
    detailLevel: 1 | 2 | 3;
    color: keyof typeof CATS;
    query: string;
}) {
    const Icon = proc.icon;
    const c = classFor(CATS[color].color);
    const q = query.trim().toLowerCase();
    const hit = useMemo(() => {
        if (!q) return false;
        const inProc = proc.name.toLowerCase().includes(q);
        const inSubs = (proc.subprocesses ?? []).some(sp => sp.name.toLowerCase().includes(q));
        const inActs = (proc.subprocesses ?? []).some(sp => (sp.activities ?? []).some(a => a.toLowerCase().includes(q)));
        return inProc || inSubs || inActs;
    }, [q, proc]);

    // Verifica quais processos são clicáveis
    const isSuporteManutencao = proc.name === "Suporte & Manutenção";
    const isDesenvolvimento = proc.name === "Desenvolvimento";
    const isArquitetura = proc.name === "Arquitetura & Design";
    const isTestesQA = proc.name === "Testes & QA";
    const isEngRequisitos = proc.name === "Engenharia de Requisitos";
    const isEntregaDeploy = proc.name === "Entrega & Deploy";
    const isGestaoPortfolio = proc.name === "Gestão de Portfólio & Demanda";
    const isClicavel = isSuporteManutencao || isDesenvolvimento || isArquitetura || isTestesQA || isEngRequisitos || isEntregaDeploy || isGestaoPortfolio;

    const cardContent = (
        <div
            className={`rounded-xl border ${c.border} p-4 mb-3 transition-all duration-200 ${
                hit ? "ring-2 ring-offset-2 ring-indigo-300" : ""
            } ${
                isClicavel ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-white to-indigo-50" : ""
            }`}
            role="group"
        >
            <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center rounded-lg ${c.badge} w-8 h-8 ${
                    isClicavel ? "shadow-sm" : ""
                }`}>
                    <Icon className="w-5 h-5"/>
                </span>
                <h3 className={`font-semibold text-gray-900 ${
                    isClicavel ? "text-indigo-900" : ""
                }`}>
                    {proc.name}
                </h3>
            </div>

            {detailLevel >= 2 && (
                <ul className="mt-3 grid gap-2">
                    {(proc.subprocesses ?? []).map((sp, idx) => (
                        <li key={idx} className="">
                            <div className="flex items-start gap-2">
                                <span
                                    className={`mt-1 inline-block w-2 h-2 rounded-full ${color === "core" ? "bg-indigo-400" : color === "support" ? "bg-emerald-400" : "bg-amber-400"}`}/>
                                <div>
                                    <div className="text-[13px] font-medium text-gray-800">{sp.name}</div>
                                    {detailLevel === 3 && sp.activities && (
                                        <ul className="mt-1 ml-0.5 grid gap-1 list-disc pl-4 text-[12px] text-gray-600">
                                            {sp.activities.map((a, i) => (
                                                <li key={i}>{a}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    // Links para processos clicáveis
    if (isSuporteManutencao) {
        return (
            <Link href="/suporte-manutencao">
                {cardContent}
            </Link>
        );
    }
    
    if (isDesenvolvimento) {
        return (
            <Link href="/desenvolvimento">
                {cardContent}
            </Link>
        );
    }
    
    if (isArquitetura) {
        return (
            <Link href="/arquitetura-design">
                {cardContent}
            </Link>
        );
    }
    
    if (isTestesQA) {
        return (
            <Link href="/testes-qa">
                {cardContent}
            </Link>
        );
    }
    
    if (isEngRequisitos) {
        return (
            <Link href="/engenharia-requisitos">
                {cardContent}
            </Link>
        );
    }
    
    if (isEntregaDeploy) {
        return (
            <Link href="/entrega-deploy">
                {cardContent}
            </Link>
        );
    }
    
    if (isGestaoPortfolio) {
        return (
            <Link href="/gestao-portfolio-demanda">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}

export default function ProcessLandscape() {
    const [detail, setDetail] = useState<1 | 2 | 3>(2);
    const [query, setQuery] = useState("");
    const [isClient, setIsClient] = useState(false);
    const mapRef = useRef<HTMLDivElement | null>(null);

    // Garantir que só execute no cliente
    useEffect(() => {
        setIsClient(true);
        // Importação dinâmica da biblioteca
        import('html-to-image').then((module) => {
            htmlToImage = module;
        });
    }, []);

    const filtered = useMemo(() => {
        if (!query.trim()) return DATA;
        const q = query.toLowerCase();
        const filterProcs = (list: Proc[]) =>
            list.filter(p =>
                p.name.toLowerCase().includes(q) ||
                (p.subprocesses ?? []).some(sp => sp.name.toLowerCase().includes(q) || (sp.activities ?? []).some(a => a.toLowerCase().includes(q)))
            );
        return {
            flow: DATA.flow.filter(n => n.toLowerCase().includes(q)),
            core: filterProcs(DATA.core),
            support: filterProcs(DATA.support),
            management: filterProcs(DATA.management)
        } as Landscape;
    }, [query]);

    const exportPNG = async () => {
        if (!mapRef.current || !htmlToImage || !isClient) return;
        const node = mapRef.current;

        // Cria wrapper temporário para centralizar o grid
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'flex-start';
        wrapper.style.background = '#fff';
        wrapper.style.padding = '40px';
        wrapper.style.width = '1600px';
        wrapper.style.boxSizing = 'border-box';

        // Move o node para dentro do wrapper
        node.parentNode?.insertBefore(wrapper, node);
        wrapper.appendChild(node);

        try {
            const dataUrl = await htmlToImage.toPng(wrapper, {
                backgroundColor: "#ffffff",
                pixelRatio: 2,
                width: 1600,
                height: wrapper.scrollHeight
            });
            const link = document.createElement("a");
            link.download = "PLM-Software-Company.png";
            link.href = dataUrl;
            link.click();
        } finally {
            // Restaura node ao DOM original
            wrapper.parentNode?.insertBefore(node, wrapper);
            wrapper.remove();
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 text-gray-900">
            {/* Header / Controls */}
            <div className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-neutral-200">
                <div
                    className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <Workflow className="w-6 h-6 text-indigo-600"/>
                        <div>
                            <div className="text-sm uppercase tracking-wide text-gray-500">Process Landscape Model</div>
                            <h1 className="text-lg font-semibold">Empresa de Desenvolvimento de Software</h1>
                        </div>
                    </div>

                    <div className="flex w-full md:w-auto items-center gap-2">
                        <div className="flex rounded-lg border border-neutral-300 overflow-hidden">
                            <button onClick={() => setDetail(1)}
                                    className={`px-3 py-1.5 text-sm ${detail === 1 ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-100"}`}>L1
                            </button>
                            <button onClick={() => setDetail(2)}
                                    className={`px-3 py-1.5 text-sm ${detail === 2 ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-100"}`}>L2
                            </button>
                            <button onClick={() => setDetail(3)}
                                    className={`px-3 py-1.5 text-sm ${detail === 3 ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-100"}`}>L3
                            </button>
                        </div>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar processos, subprocessos ou atividades..."
                            className="flex-1 md:flex-none w-full md:w-96 px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />

                        {isClient && (
                            <button 
                                onClick={exportPNG}
                                disabled={!htmlToImage}
                                className="px-3 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Exportar PNG
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Flow (Core macro-sequence) */}
            <div ref={mapRef} className="max-w-7xl mx-auto px-4 mt-6">
                <div className="text-xs font-medium text-gray-600 mb-2">Fluxo macro (Core)</div>
                <div className="flex flex-wrap gap-2 items-center">
                    {filtered.flow.length ? filtered.flow.map((name, i) => (
                        <React.Fragment key={i}>
              <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                <Rocket className="w-4 h-4"/>
                <span className="text-sm font-medium">{name}</span>
              </span>
                            {i < filtered.flow.length - 1 && <span className="text-neutral-400">→</span>}
                        </React.Fragment>
                    )) : (
                        <span className="text-sm text-neutral-500">(nenhum item corresponde à busca)</span>
                    )}
                </div>

                {/* Map */}
                <div className="mt-6 pb-12 w-full flex justify-center">
                    <div className="grid grid-cols-3 gap-6 min-w-[1200px] mx-auto"
                         style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Section title={CATS.core.title} color="core">
                            {filtered.core.map((p, i) => (
                                <ProcCard key={i} proc={p} detailLevel={detail} color="core" query={query}/>
                            ))}
                        </Section>

                        <Section title={CATS.support.title} color="support">
                            {filtered.support.map((p, i) => (
                                <ProcCard key={i} proc={p} detailLevel={detail} color="support" query={query}/>
                            ))}
                        </Section>

                        <Section title={CATS.management.title} color="management">
                            {filtered.management.map((p, i) => (
                                <ProcCard key={i} proc={p} detailLevel={detail} color="management" query={query}/>
                            ))}
                        </Section>
                    </div>
                </div>
                
                {/* Navigation CTA */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Próximo Passo: Análise Estratégica
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Agora que você explorou os processos, veja como eles se posicionam 
                            estrategicamente e acesse o checklist completo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/matrix"
                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                <Target className="w-4 h-4" />
                                Ver Matriz Estratégica
                            </Link>
                            <Link
                                href="/results"
                                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Ver Checklist Completo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}