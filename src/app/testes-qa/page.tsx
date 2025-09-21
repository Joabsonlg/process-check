"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  CheckCircle2,
  ArrowLeft,
  Download,
  Target,
  TestTube,
  Shield,
  Zap,
  FileText,
  BarChart3,
  Users,
  Clock,
  Bug,
  Activity
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
    id: "planejamento",
    nome: "Planejamento de Testes",
    descricao: "Estratégia e organização para garantir cobertura completa de testes",
    cor: "from-blue-500 to-indigo-600",
    icone: Target,
    elementos: [
      {
        categoria: "Estratégia de Testes",
        icone: Target,
        itens: [
          "Documento de Estratégia de Testes",
          "Planejamento e Estimativa de Testes",
          "Testes Baseados em Risco",
          "Estratégia de Pirâmide de Testes",
          "Abordagem Shift-Left Testing",
          "Estratégia de Ambiente de Testes",
          "Gestão de Dados de Teste",
          "Estratégia de Prevenção de Defeitos"
        ],
        cor: "bg-blue-50 border-blue-200"
      },
      {
        categoria: "Matriz de Testes",
        icone: BarChart3,
        itens: [
          "Matriz de Rastreabilidade de Requisitos",
          "Matriz de Cobertura de Testes",
          "Matriz de Avaliação de Riscos",
          "Priorização de Casos de Teste",
          "Matriz Funcionalidade vs Tipo de Teste",
          "Matriz de Compatibilidade",
          "Cronograma de Execução de Testes",
          "Matriz de Alocação de Recursos"
        ],
        cor: "bg-indigo-50 border-indigo-200"
      },
      {
        categoria: "Critérios de Saída",
        icone: CheckCircle2,
        itens: [
          "Definição de Pronto",
          "Critérios de Saída por Fase",
          "Gates de Qualidade",
          "Critérios de Aceitação",
          "Limites de Severidade de Bugs",
          "Requisitos de Cobertura de Código",
          "Benchmarks de Performance",
          "Verificações de Compliance de Segurança"
        ],
        cor: "bg-purple-50 border-purple-200"
      }
    ]
  },
  {
    id: "testes-funcionais",
    nome: "Testes Funcionais",
    descricao: "Validação das funcionalidades do sistema em diferentes níveis",
    cor: "from-green-500 to-emerald-600",
    icone: TestTube,
    elementos: [
      {
        categoria: "Testes Unitários",
        icone: TestTube,
        itens: [
          "Melhores Práticas de Testes Unitários",
          "Desenvolvimento Orientado a Testes (TDD)",
          "Mocking e Stubbing Organizados",
          "Análise de Cobertura de Código",
          "Testes Parametrizados",
          "Fixtures e Setup de Testes",
          "Bibliotecas de Asserção",
          "Loops de Feedback Rápido"
        ],
        cor: "bg-green-50 border-green-200"
      },
      {
        categoria: "Testes de Integração",
        icone: Activity,
        itens: [
          "Testes de Integração de API",
          "Testes de Integração de Banco de Dados",
          "Testes de Integração de Serviços",
          "Testes de Contrato",
          "Integração de Componentes",
          "Testes de Integração de Sistema",
          "Integração com Terceiros",
          "Testes de Fila de Mensagens"
        ],
        cor: "bg-emerald-50 border-emerald-200"
      },
      {
        categoria: "Testes End-to-End",
        icone: Users,
        itens: [
          "Testes de Jornada do Usuário",
          "Testes Cross-browser",
          "Testes de Aplicativo Mobile",
          "Suítes de Teste de Regressão",
          "Testes de Smoke",
          "Testes de Sanidade",
          "Testes de Aceitação do Usuário",
          "Testes de Processo de Negócio"
        ],
        cor: "bg-teal-50 border-teal-200"
      }
    ]
  },
  {
    id: "testes-nao-funcionais",
    nome: "Testes Não-Funcionais",
    descricao: "Validação de aspectos de qualidade como performance e segurança",
    cor: "from-orange-500 to-red-500",
    icone: Zap,
    elementos: [
      {
        categoria: "Testes de Performance",
        icone: Zap,
        itens: [
          "Testes de Carga",
          "Testes de Estresse",
          "Testes de Volume",
          "Testes de Pico",
          "Testes de Resistência",
          "Testes de Escalabilidade",
          "Planejamento de Capacidade",
          "Monitoramento de Performance"
        ],
        cor: "bg-orange-50 border-orange-200"
      },
      {
        categoria: "Testes de Segurança",
        icone: Shield,
        itens: [
          "Avaliação de Vulnerabilidades",
          "Testes de Penetração",
          "Testes de Autenticação",
          "Testes de Autorização",
          "Testes de Validação de Entrada",
          "Testes de Injeção SQL",
          "Testes de XSS",
          "Revisão de Código de Segurança"
        ],
        cor: "bg-red-50 border-red-200"
      },
      {
        categoria: "Testes de Usabilidade",
        icone: Users,
        itens: [
          "Testes de Experiência do Usuário",
          "Testes de Acessibilidade (WCAG)",
          "Compatibilidade Cross-platform",
          "Testes de Design Responsivo",
          "Testes de Navegação",
          "Testes de Validação de Formulários",
          "Testes de Mensagens de Erro",
          "Testes de Interface do Usuário"
        ],
        cor: "bg-pink-50 border-pink-200"
      }
    ]
  }
];

export default function TestesQAPage() {
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
      link.download = "Mapa-Testes-QA-Perfeito.png";
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
                <div className="p-2 bg-gradient-to-br from-green-500 to-orange-600 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                    Mapa dos Testes & QA Perfeito
                  </h1>
                  <p className="text-sm text-slate-600">Garantia de qualidade através de testes abrangentes</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isClient && (
                <button 
                  onClick={exportPNG}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-orange-600 text-white rounded-lg hover:from-green-600 hover:to-orange-700 transition-all shadow-md"
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
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-slate-700">Guia Completo</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Os 3 Pilares Essenciais dos Testes & QA
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Este mapa apresenta uma estratégia completa de testes, desde o planejamento 
            até a execução de testes funcionais e não-funcionais para garantir qualidade total.
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
        <div className="mt-12 bg-gradient-to-r from-green-500 to-orange-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Testes Completos = Qualidade Garantida</h3>
            <p className="text-lg opacity-95 mb-6">
              Com essa estratégia completa de testes, sua equipe terá confiança total 
              na qualidade do software entregue, reduzindo bugs e aumentando a satisfação dos usuários.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">95%+</div>
                <div className="text-sm opacity-90">Cobertura</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">&lt;1%</div>
                <div className="text-sm opacity-90">Bug Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">Zero</div>
                <div className="text-sm opacity-90">Vulnerabilidades</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Confiança</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}