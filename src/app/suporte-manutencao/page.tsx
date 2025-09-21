"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Headphones,
  ArrowLeft,
  Download,
  Users,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  Settings,
  FileText,
  Activity,
  Shield,
  Zap,
  BarChart3,
  Bell,
  Database,
  Server,
  Wrench,
  Eye,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Cpu,
  HardDrive,
  Network,
  Lock,
  GitBranch,
  Bug,
  Rocket,
  Search,
  Monitor,
  Layers,
  RefreshCw,
  GraduationCap,
  ClipboardList
} from "lucide-react";
import Link from "next/link";

// Importação dinâmica para evitar problemas de SSR
let htmlToImage: any = null;

interface AreaEssencial {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  icone: React.ComponentType<any>;
  elementos: {
    categoria: string;
    icone: React.ComponentType<any>;
    itens: string[];
    cor: string;
  }[];
}

const AREAS_ESSENCIAIS: AreaEssencial[] = [
  {
    id: "monitoramento",
    nome: "Monitoramento & Observabilidade",
    descricao: "Visibilidade completa da saúde dos sistemas em tempo real",
    cor: "from-blue-500 to-cyan-500",
    icone: Activity,
    elementos: [
      {
        categoria: "Ferramentas de Monitoramento",
        icone: Search,
        itens: [
          "APM (Application Performance Monitoring)",
          "Sistema de Logs Centralizados",
          "Métricas de Infraestrutura",
          "Distributed Tracing",
          "Synthetic Monitoring",
          "Real User Monitoring (RUM)"
        ],
        cor: "bg-blue-50 border-blue-200"
      },
      {
        categoria: "Dashboards & Visualização",
        icone: Monitor,
        itens: [
          "Dashboard Executivo (SLA/KPIs)",
          "Dashboard Técnico (Métricas)",
          "Dashboard de Negócio",
          "Alertas Visuais em Tempo Real",
          "Relatórios Automatizados",
          "Heatmaps de Performance"
        ],
        cor: "bg-cyan-50 border-cyan-200"
      },
      {
        categoria: "Sistema de Alertas",
        icone: Bell,
        itens: [
          "Alertas por Severidade",
          "Escalação Automática",
          "Notificações Multi-canal",
          "Supressão de Alertas Duplicados",
          "Alertas Preditivos",
          "Correlação de Eventos"
        ],
        cor: "bg-indigo-50 border-indigo-200"
      }
    ]
  },
  {
    id: "incidentes",
    nome: "Gestão de Incidentes",
    descricao: "Processo estruturado para resolução rápida e eficaz de problemas",
    cor: "from-red-500 to-orange-500",
    icone: AlertCircle,
    elementos: [
      {
        categoria: "Estrutura de Suporte",
        icone: Target,
        itens: [
          "Service Desk (Nível 1)",
          "Suporte Técnico (Nível 2)",
          "Especialistas (Nível 3)",
          "Plantão 24/7",
          "Escalação para Desenvolvimento",
          "Suporte de Fornecedores"
        ],
        cor: "bg-red-50 border-red-200"
      },
      {
        categoria: "Processos & Procedimentos",
        icone: ClipboardList,
        itens: [
          "Classificação por Severidade",
          "SLA por Tipo de Incidente",
          "Procedimentos de Escalação",
          "Comunicação com Usuários",
          "Post-mortem de Incidentes Críticos",
          "Base de Conhecimento Atualizada"
        ],
        cor: "bg-orange-50 border-orange-200"
      },
      {
        categoria: "Ferramentas de Suporte",
        icone: Wrench,
        itens: [
          "Sistema de Tickets",
          "Chat/Comunicação Interna",
          "Acesso Remoto Seguro",
          "Ferramentas de Diagnóstico",
          "Ambiente de Testes",
          "Documentação Técnica"
        ],
        cor: "bg-yellow-50 border-yellow-200"
      }
    ]
  },
  {
    id: "evolucao",
    nome: "Evolução & Manutenção",
    descricao: "Melhoria contínua e manutenção proativa dos sistemas",
    cor: "from-green-500 to-emerald-500",
    icone: TrendingUp,
    elementos: [
      {
        categoria: "Manutenção Preventiva",
        icone: RefreshCw,
        itens: [
          "Atualizações de Segurança",
          "Patches de Sistema",
          "Backup e Recovery",
          "Limpeza de Logs",
          "Otimização de Performance",
          "Monitoramento de Capacidade"
        ],
        cor: "bg-green-50 border-green-200"
      },
      {
        categoria: "Deploy & Releases",
        icone: Rocket,
        itens: [
          "Pipeline CI/CD",
          "Ambiente de Staging",
          "Blue-Green Deployment",
          "Rollback Automático",
          "Testes Automatizados",
          "Versionamento de Releases"
        ],
        cor: "bg-emerald-50 border-emerald-200"
      },
      {
        categoria: "Melhoria Contínua",
        icone: TrendingUp,
        itens: [
          "Análise de Tendências",
          "Otimização de Processos",
          "Automação de Tarefas",
          "Redução de Toil",
          "Implementação de Melhorias",
          "Feedback Loop com Desenvolvimento"
        ],
        cor: "bg-teal-50 border-teal-200"
      }
    ]
  },
  {
    id: "pessoas",
    nome: "Pessoas & Conhecimento",
    descricao: "Equipe capacitada e conhecimento organizado para excelência operacional",
    cor: "from-purple-500 to-pink-500",
    icone: Users,
    elementos: [
      {
        categoria: "Estrutura da Equipe",
        icone: Users,
        itens: [
          "Gerente de Suporte",
          "Coordenadores por Turno",
          "Analistas Sênior/Pleno/Júnior",
          "Especialistas por Tecnologia",
          "SRE (Site Reliability Engineer)",
          "Estagiários/Trainees"
        ],
        cor: "bg-purple-50 border-purple-200"
      },
      {
        categoria: "Gestão do Conhecimento",
        icone: BookOpen,
        itens: [
          "Base de Conhecimento Atualizada",
          "Documentação de Processos",
          "Runbooks Operacionais",
          "Troubleshooting Guides",
          "Histórico de Incidentes",
          "Lições Aprendidas"
        ],
        cor: "bg-pink-50 border-pink-200"
      },
      {
        categoria: "Capacitação & Desenvolvimento",
        icone: GraduationCap,
        itens: [
          "Treinamento Técnico Contínuo",
          "Certificações Profissionais",
          "Mentoria e Coaching",
          "Rotação de Responsabilidades",
          "Participação em Comunidades",
          "Plano de Carreira Definido"
        ],
        cor: "bg-violet-50 border-violet-200"
      }
    ]
  },
  {
    id: "metricas",
    nome: "Métricas & Governança",
    descricao: "Indicadores e controles para garantir excelência operacional",
    cor: "from-amber-500 to-yellow-500",
    icone: BarChart3,
    elementos: [
      {
        categoria: "KPIs Operacionais",
        icone: BarChart3,
        itens: [
          "MTTR (Mean Time To Recovery)",
          "MTBF (Mean Time Between Failures)",
          "Uptime/Disponibilidade (%)",
          "Taxa de Resolução no 1º Nível",
          "Satisfação do Cliente (CSAT)",
          "Tempo de Resposta Médio"
        ],
        cor: "bg-amber-50 border-amber-200"
      },
      {
        categoria: "SLAs & Acordos",
        icone: Target,
        itens: [
          "SLA por Severidade de Incidente",
          "OLA entre Equipes Internas",
          "SLA de Disponibilidade",
          "Acordo de Nível de Suporte",
          "Métricas de Qualidade",
          "Penalidades e Bonificações"
        ],
        cor: "bg-yellow-50 border-yellow-200"
      },
      {
        categoria: "Relatórios & Análises",
        icone: FileText,
        itens: [
          "Relatório Mensal de Incidentes",
          "Análise de Tendências",
          "Relatório de Capacidade",
          "Dashboard Executivo",
          "Análise de Causa Raiz",
          "Relatório de Melhorias"
        ],
        cor: "bg-orange-50 border-orange-200"
      }
    ]
  }
];

export default function SuporteManutencaoPage() {
  const [isClient, setIsClient] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    import('html-to-image').then((module) => {
      htmlToImage = module;
    });
  }, []);

  const exportPNG = async () => {
    if (!pageRef.current || !htmlToImage || !isClient) return;
    
    try {
      const dataUrl = await htmlToImage.toPng(pageRef.current, {
        backgroundColor: "#f8fafc",
        pixelRatio: 2,
        width: 1400,
        height: pageRef.current.scrollHeight
      });
      const link = document.createElement("a");
      link.download = "Mapa-Suporte-Manutencao-Perfeito.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur bg-white/95 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Voltar ao PLM</span>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Mapa do Suporte & Manutenção Perfeito
                  </h1>
                  <p className="text-sm text-slate-600">Tudo que seu setor precisa para ser eficaz e eficiente</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isClient && (
                <button 
                  onClick={exportPNG}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                >
                  <Download className="w-4 h-4 mr-2 inline" />
                  Exportar Mapa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div ref={pageRef} className="max-w-7xl mx-auto px-4 py-8">
        {/* Introdução */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-slate-200 mb-4">
            <Target className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">Guia Completo</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            As 5 Áreas Essenciais para um Setor de Suporte Perfeito
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Este mapa apresenta todos os elementos fundamentais que seu setor de Suporte & Manutenção 
            deve ter implementado para alcançar excelência operacional e satisfação dos usuários.
          </p>
        </div>

        {/* Áreas Essenciais */}
        <div className="space-y-8">
          {AREAS_ESSENCIAIS.map((area, index) => {
            const IconeArea = area.icone;
            
            return (
              <div key={area.id} className="relative">
                {/* Card Principal da Área */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  {/* Header da Área */}
                  <div className={`bg-gradient-to-r ${area.cor} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <IconeArea className="w-full h-full" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-white/20 backdrop-blur p-3 rounded-xl">
                          <IconeArea className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-sm font-medium opacity-90">Área {index + 1} de 5</div>
                          <h3 className="text-2xl font-bold">{area.nome}</h3>
                        </div>
                      </div>
                      <p className="text-lg opacity-95">{area.descricao}</p>
                    </div>
                  </div>

                  {/* Conteúdo da Área */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {area.elementos.map((elemento, elemIndex) => {
                        const IconeElemento = elemento.icone;
                        return (
                          <div key={elemIndex} className={`rounded-xl border-2 ${elemento.cor} p-5`}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <IconeElemento className="w-5 h-5 text-slate-700" />
                              </div>
                              <h4 className="font-bold text-slate-900 text-lg">
                                {elemento.categoria}
                              </h4>
                            </div>
                          <ul className="space-y-3">
                            {elemento.itens.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo Final */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                <Rocket className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Implementação Completa = Suporte de Excelência</h3>
            <p className="text-lg opacity-95 mb-6">
              Com todos esses elementos implementados, seu setor de Suporte & Manutenção estará preparado 
              para entregar serviços de alta qualidade, resolver incidentes rapidamente e manter os 
              sistemas funcionando com máxima disponibilidade.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm opacity-90">Uptime Alvo</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">&lt;15min</div>
                <div className="text-sm opacity-90">MTTR Crítico</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-90">Cobertura</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">95%+</div>
                <div className="text-sm opacity-90">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}