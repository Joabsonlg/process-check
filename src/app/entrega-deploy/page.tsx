"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Rocket,
  ArrowLeft,
  Download,
  Target,
  CheckCircle2,
  GitBranch,
  Server,
  Shield,
  Settings,
  Activity,
  RefreshCw,
  Eye,
  Zap,
  Database,
  Network
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
    id: "cicd",
    nome: "CI/CD Pipeline",
    descricao: "Automação completa do processo de integração e entrega contínua",
    cor: "from-blue-500 to-indigo-600",
    icone: GitBranch,
    elementos: [
      {
        categoria: "Pipeline de Integração",
        icone: GitBranch,
        itens: [
          "Triggers Automáticos por Commit",
          "Build Automatizado Multi-ambiente",
          "Testes Automatizados Integrados",
          "Validação de Qualidade de Código",
          "Notificações de Status em Tempo Real",
          "Rollback Automático em Falhas",
          "Paralelização de Jobs",
          "Cache de Dependências Otimizado"
        ],
        cor: "bg-blue-50 border-blue-200"
      },
      {
        categoria: "Artefatos & Versionamento",
        icone: Database,
        itens: [
          "Artefatos Assinados Digitalmente",
          "Versionamento Semântico Automático",
          "Registry de Artefatos Organizado",
          "Metadados de Build Completos",
          "Rastreabilidade de Mudanças",
          "Backup de Artefatos Críticos",
          "Limpeza Automática de Versões Antigas",
          "Distribuição Multi-região"
        ],
        cor: "bg-indigo-50 border-indigo-200"
      },
      {
        categoria: "Gates de Qualidade",
        icone: Shield,
        itens: [
          "Critérios de Qualidade Definidos",
          "Scanning de Segurança Automático",
          "Validação de Performance",
          "Aprovações Manuais Configuráveis",
          "Métricas de Qualidade Mensuráveis",
          "Bloqueio por Vulnerabilidades",
          "Compliance Automatizado",
          "Relatórios de Qualidade"
        ],
        cor: "bg-purple-50 border-purple-200"
      }
    ]
  },
  {
    id: "gestao-ambientes",
    nome: "Gestão de Ambientes",
    descricao: "Organização e controle de ambientes para desenvolvimento e produção",
    cor: "from-green-500 to-emerald-600",
    icone: Server,
    elementos: [
      {
        categoria: "Ambientes Padronizados",
        icone: Server,
        itens: [
          "Ambiente de Desenvolvimento (DEV)",
          "Ambiente de Testes (QA/TEST)",
          "Ambiente de Homologação (UAT)",
          "Ambiente de Produção (PROD)",
          "Ambientes de Staging",
          "Ambientes de Demonstração",
          "Isolamento entre Ambientes",
          "Configuração como Código"
        ],
        cor: "bg-green-50 border-green-200"
      },
      {
        categoria: "Infraestrutura como Código",
        icone: Settings,
        itens: [
          "Templates de Infraestrutura",
          "Provisionamento Automatizado",
          "Configuração Declarativa",
          "Versionamento de Infraestrutura",
          "Rollback de Configurações",
          "Validação de Conformidade",
          "Documentação Auto-gerada",
          "Auditoria de Mudanças"
        ],
        cor: "bg-emerald-50 border-emerald-200"
      },
      {
        categoria: "Observabilidade",
        icone: Eye,
        itens: [
          "Monitoramento de Saúde dos Ambientes",
          "Logs Centralizados e Estruturados",
          "Métricas de Performance",
          "Tracing Distribuído",
          "Alertas Proativos",
          "Dashboards de Status",
          "SLA Monitoring",
          "Análise de Tendências"
        ],
        cor: "bg-teal-50 border-teal-200"
      }
    ]
  },
  {
    id: "release-rollback",
    nome: "Release & Rollback",
    descricao: "Estratégias seguras de deploy e recuperação rápida em caso de problemas",
    cor: "from-orange-500 to-red-500",
    icone: Rocket,
    elementos: [
      {
        categoria: "Estratégias de Deploy",
        icone: Zap,
        itens: [
          "Blue-Green Deployment",
          "Canary Releases",
          "Rolling Updates",
          "Feature Flags/Toggles",
          "A/B Testing Infrastructure",
          "Zero-Downtime Deployments",
          "Gradual Traffic Shifting",
          "Automated Health Checks"
        ],
        cor: "bg-orange-50 border-orange-200"
      },
      {
        categoria: "Processo de Rollback",
        icone: RefreshCw,
        itens: [
          "Rollback Automático por Métricas",
          "Rollback Manual Rápido",
          "Backup de Estado Anterior",
          "Validação Pós-Rollback",
          "Comunicação de Incidentes",
          "Análise de Causa Raiz",
          "Documentação de Problemas",
          "Planos de Contingência"
        ],
        cor: "bg-red-50 border-red-200"
      },
      {
        categoria: "Controle de Versões",
        icone: Activity,
        itens: [
          "Versionamento de Releases",
          "Changelog Automatizado",
          "Notas de Release",
          "Compatibilidade Backward",
          "Migração de Dados",
          "Deprecation Notices",
          "Release Calendar",
          "Comunicação com Stakeholders"
        ],
        cor: "bg-pink-50 border-pink-200"
      }
    ]
  }
];

export default function EntregaDeployPage() {
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
      link.download = "Mapa-Entrega-Deploy-Perfeito.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
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
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Mapa da Entrega & Deploy Perfeito
                  </h1>
                  <p className="text-sm text-slate-600">Automação e segurança na entrega de software</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isClient && (
                <button 
                  onClick={exportPNG}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-md"
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
            <Target className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-slate-700">Guia Completo</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Os 3 Pilares Essenciais da Entrega & Deploy
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Este mapa apresenta uma estratégia completa para entrega segura e confiável de software, 
            desde a automação de pipelines até estratégias avançadas de deploy e rollback.
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
                          <div className="text-sm font-medium opacity-90">Pilar {index + 1} de 3</div>
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
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                <Rocket className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Deploy Seguro = Entrega Confiável</h3>
            <p className="text-lg opacity-95 mb-6">
              Com esses três pilares bem estruturados, sua equipe terá um processo de entrega 
              automatizado, seguro e confiável, com capacidade de recuperação rápida em caso de problemas.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">Zero</div>
                <div className="text-sm opacity-90">Downtime</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">&lt;2min</div>
                <div className="text-sm opacity-90">Deploy Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">&lt;30s</div>
                <div className="text-sm opacity-90">Rollback</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Automação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}