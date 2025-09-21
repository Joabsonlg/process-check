"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Boxes,
  ArrowLeft,
  Download,
  Target,
  CheckCircle2,
  TrendingUp,
  Users,
  BarChart3,
  Search,
  Lightbulb,
  Calendar,
  DollarSign,
  Award,
  Zap,
  FileText,
  Settings
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
    id: "analise-mercado",
    nome: "Análise de Mercado",
    descricao: "Compreensão profunda do mercado e identificação de oportunidades estratégicas",
    cor: "from-blue-500 to-indigo-600",
    icone: Search,
    elementos: [
      {
        categoria: "Pesquisa & Benchmark",
        icone: Search,
        itens: [
          "Análise Competitiva Estruturada",
          "Benchmarking de Produtos e Serviços",
          "Pesquisa de Tendências de Mercado",
          "Análise de Gaps no Mercado",
          "Monitoramento de Concorrentes",
          "Estudos de Caso de Sucesso",
          "Análise de Pricing Competitivo",
          "Identificação de Best Practices"
        ],
        cor: "bg-blue-50 border-blue-200"
      },
      {
        categoria: "Segmentação & Personas",
        icone: Users,
        itens: [
          "Segmentação de Mercado Detalhada",
          "Desenvolvimento de Personas",
          "Análise de Comportamento do Cliente",
          "Mapeamento de Jornada do Cliente",
          "Identificação de Pain Points",
          "Análise de Necessidades por Segmento",
          "Perfil de Tomadores de Decisão",
          "Canais de Comunicação Preferidos"
        ],
        cor: "bg-indigo-50 border-indigo-200"
      },
      {
        categoria: "Proposta de Valor",
        icone: Award,
        itens: [
          "Canvas de Proposta de Valor",
          "Diferenciação Competitiva Clara",
          "Value Proposition Design",
          "Benefícios Mensuráveis",
          "Posicionamento de Mercado",
          "Messaging Framework",
          "Validação com Clientes",
          "Refinamento Contínuo"
        ],
        cor: "bg-purple-50 border-purple-200"
      }
    ]
  },
  {
    id: "pipeline-propostas",
    nome: "Pipeline de Propostas",
    descricao: "Gestão estruturada do funil de oportunidades e tomada de decisão",
    cor: "from-green-500 to-emerald-600",
    icone: TrendingUp,
    elementos: [
      {
        categoria: "Processo de Triagem",
        icone: Settings,
        itens: [
          "Critérios de Qualificação Definidos",
          "Scoring de Oportunidades",
          "Processo de Intake Padronizado",
          "Avaliação de Fit Estratégico",
          "Análise de Recursos Necessários",
          "Timeline de Avaliação",
          "Comitê de Avaliação",
          "Documentação de Decisões"
        ],
        cor: "bg-green-50 border-green-200"
      },
      {
        categoria: "Business Case & ROI",
        icone: DollarSign,
        itens: [
          "Template de Business Case",
          "Análise de ROI Detalhada",
          "Projeções Financeiras",
          "Análise de Payback",
          "Cenários de Risco",
          "Métricas de Sucesso",
          "Aprovação de Investimento",
          "Revisões Periódicas"
        ],
        cor: "bg-emerald-50 border-emerald-200"
      },
      {
        categoria: "Estudos de Viabilidade",
        icone: Lightbulb,
        itens: [
          "Viabilidade Técnica",
          "Viabilidade Comercial",
          "Viabilidade Operacional",
          "Análise de Riscos",
          "Recursos e Competências",
          "Timeline de Implementação",
          "Dependências Identificadas",
          "Go/No-Go Decision Framework"
        ],
        cor: "bg-teal-50 border-teal-200"
      }
    ]
  },
  {
    id: "roadmap-priorizacao",
    nome: "Roadmap & Priorização",
    descricao: "Planejamento estratégico e alocação otimizada de recursos",
    cor: "from-orange-500 to-red-500",
    icone: Calendar,
    elementos: [
      {
        categoria: "OKRs & Estratégia",
        icone: Target,
        itens: [
          "Objectives and Key Results (OKRs)",
          "Alinhamento com Estratégia Corporativa",
          "Metas SMART Definidas",
          "Cascateamento de Objetivos",
          "Revisões Trimestrais",
          "Ajustes de Curso",
          "Comunicação de Progresso",
          "Celebração de Conquistas"
        ],
        cor: "bg-orange-50 border-orange-200"
      },
      {
        categoria: "Planejamento de Capacidade",
        icone: BarChart3,
        itens: [
          "Análise de Capacidade Atual",
          "Projeção de Demanda",
          "Planejamento de Recursos",
          "Identificação de Gargalos",
          "Planos de Contingência",
          "Otimização de Utilização",
          "Forecasting de Necessidades",
          "Balanceamento de Carga"
        ],
        cor: "bg-red-50 border-red-200"
      },
      {
        categoria: "Alocação & Governança",
        icone: Zap,
        itens: [
          "Matriz de Priorização",
          "Alocação de Recursos por Projeto",
          "Governança de Portfólio",
          "Comitês de Decisão",
          "Processo de Aprovação",
          "Monitoramento de Performance",
          "Realocação Dinâmica",
          "Relatórios Executivos"
        ],
        cor: "bg-pink-50 border-pink-200"
      }
    ]
  }
];

export default function GestaoPortfolioDemandaPage() {
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
      link.download = "Mapa-Gestao-Portfolio-Demanda-Perfeito.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
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
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                  <Boxes className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Mapa da Gestão de Portfólio & Demanda Perfeita
                  </h1>
                  <p className="text-sm text-slate-600">Estratégia, priorização e alocação inteligente de recursos</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isClient && (
                <button 
                  onClick={exportPNG}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md"
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
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-700">Guia Completo</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Os 3 Pilares Essenciais da Gestão de Portfólio & Demanda
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Este mapa apresenta uma abordagem estratégica completa para análise de mercado, 
            gestão de pipeline de oportunidades e priorização inteligente de investimentos.
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
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                <Boxes className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Portfólio Estratégico = Crescimento Sustentável</h3>
            <p className="text-lg opacity-95 mb-6">
              Com esses três pilares bem estruturados, sua organização terá uma gestão de portfólio 
              estratégica, baseada em dados e alinhada com os objetivos de negócio.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">+30%</div>
                <div className="text-sm opacity-90">ROI Médio</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">90%+</div>
                <div className="text-sm opacity-90">Projetos no Prazo</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">-50%</div>
                <div className="text-sm opacity-90">Projetos Cancelados</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Alinhamento</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}