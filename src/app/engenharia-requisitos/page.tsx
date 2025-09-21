"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  ArrowLeft,
  Download,
  Target,
  CheckCircle2,
  Users,
  MessageSquare,
  Eye,
  Search,
  ClipboardList,
  Lightbulb,
  BookOpen,
  Settings,
  Workflow
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
    id: "levantamento",
    nome: "Levantamento de Requisitos",
    descricao: "Processos estruturados para captura completa das necessidades do negócio",
    cor: "from-blue-500 to-indigo-600",
    icone: Search,
    elementos: [
      {
        categoria: "Técnicas de Entrevistas",
        icone: MessageSquare,
        itens: [
          "Entrevistas Estruturadas com Stakeholders",
          "Questionários Direcionados por Perfil",
          "Entrevistas em Grupo (Focus Groups)",
          "Técnicas de Escuta Ativa",
          "Documentação de Insights",
          "Validação de Entendimento",
          "Registro de Decisões Tomadas",
          "Follow-up e Esclarecimentos"
        ],
        cor: "bg-blue-50 border-blue-200"
      },
      {
        categoria: "Workshops Colaborativos",
        icone: Users,
        itens: [
          "Sessões de Brainstorming Estruturadas",
          "Design Thinking Workshops",
          "Mapeamento de Jornada do Usuário",
          "Workshops de Priorização",
          "Sessões de Validação de Requisitos",
          "Facilitação de Consenso",
          "Documentação Colaborativa",
          "Alinhamento de Expectativas"
        ],
        cor: "bg-indigo-50 border-indigo-200"
      },
      {
        categoria: "Técnicas de Observação",
        icone: Eye,
        itens: [
          "Observação de Processos Atuais",
          "Shadowing de Usuários",
          "Análise de Fluxos de Trabalho",
          "Identificação de Pain Points",
          "Mapeamento de Interações",
          "Análise de Comportamento",
          "Documentação de Contexto",
          "Identificação de Oportunidades"
        ],
        cor: "bg-purple-50 border-purple-200"
      }
    ]
  },
  {
    id: "modelagem-especificacao",
    nome: "Modelagem & Especificação",
    descricao: "Estruturação e formalização dos requisitos em formatos compreensíveis",
    cor: "from-green-500 to-emerald-600",
    icone: ClipboardList,
    elementos: [
      {
        categoria: "User Stories & Épicos",
        icone: BookOpen,
        itens: [
          "Estrutura de User Stories Padronizada",
          "Critérios de Aceitação Claros",
          "Épicos e Features Organizados",
          "Personas e Perfis de Usuário",
          "Mapeamento de Necessidades",
          "Priorização por Valor de Negócio",
          "Estimativas de Esforço",
          "Dependências Identificadas"
        ],
        cor: "bg-green-50 border-green-200"
      },
      {
        categoria: "Casos de Uso & Cenários",
        icone: Workflow,
        itens: [
          "Casos de Uso Detalhados",
          "Fluxos Principais e Alternativos",
          "Cenários de Exceção",
          "Pré e Pós-condições",
          "Atores e Responsabilidades",
          "Regras de Negócio Explícitas",
          "Critérios de Sucesso",
          "Rastreabilidade de Requisitos"
        ],
        cor: "bg-emerald-50 border-emerald-200"
      },
      {
        categoria: "Modelagem Visual (BPMN/UML)",
        icone: Settings,
        itens: [
          "Diagramas de Processo (BPMN)",
          "Diagramas de Caso de Uso (UML)",
          "Diagramas de Atividade",
          "Diagramas de Sequência",
          "Modelagem de Estados",
          "Arquitetura de Informação",
          "Wireframes e Mockups",
          "Fluxogramas de Decisão"
        ],
        cor: "bg-teal-50 border-teal-200"
      }
    ]
  },
  {
    id: "validacao-backlog",
    nome: "Validação & Gestão de Backlog",
    descricao: "Processos de validação e organização contínua dos requisitos",
    cor: "from-orange-500 to-red-500",
    icone: CheckCircle2,
    elementos: [
      {
        categoria: "Prototipação & Validação",
        icone: Lightbulb,
        itens: [
          "Protótipos de Baixa Fidelidade",
          "Protótipos Interativos",
          "Testes de Usabilidade",
          "Validação com Stakeholders",
          "Feedback Loops Estruturados",
          "Iterações de Refinamento",
          "Aprovação Formal de Requisitos",
          "Documentação de Mudanças"
        ],
        cor: "bg-orange-50 border-orange-200"
      },
      {
        categoria: "Processo de Aceite",
        icone: CheckCircle2,
        itens: [
          "Critérios de Aceite Mensuráveis",
          "Processo de Revisão Formal",
          "Sign-off de Stakeholders",
          "Matriz de Aprovação",
          "Controle de Mudanças",
          "Versionamento de Requisitos",
          "Auditoria de Conformidade",
          "Registro de Aprovações"
        ],
        cor: "bg-red-50 border-red-200"
      },
      {
        categoria: "Refinamento Contínuo",
        icone: Target,
        itens: [
          "Sessões de Backlog Grooming",
          "Repriorização Baseada em Valor",
          "Decomposição de Épicos",
          "Atualização de Estimativas",
          "Remoção de Itens Obsoletos",
          "Adição de Novos Requisitos",
          "Melhoria de Critérios de Aceite",
          "Alinhamento com Roadmap"
        ],
        cor: "bg-pink-50 border-pink-200"
      }
    ]
  }
];

export default function EngenhariaRequisitosPage() {
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
      link.download = "Mapa-Engenharia-Requisitos-Perfeito.png";
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
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Mapa da Engenharia de Requisitos Perfeita
                  </h1>
                  <p className="text-sm text-slate-600">Captura, modelagem e gestão eficiente de requisitos</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isClient && (
                <button 
                  onClick={exportPNG}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
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
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Guia Completo</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Os 3 Pilares Essenciais da Engenharia de Requisitos
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Este mapa apresenta uma abordagem completa para capturar, modelar e gerenciar requisitos, 
            garantindo que as necessidades do negócio sejam traduzidas em soluções eficazes.
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
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                <FileText className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Requisitos Bem Definidos = Projeto de Sucesso</h3>
            <p className="text-lg opacity-95 mb-6">
              Com esses três pilares bem estruturados, sua equipe terá requisitos claros, 
              validados e organizados, reduzindo retrabalho e garantindo entregas alinhadas com o negócio.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Rastreabilidade</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">-80%</div>
                <div className="text-sm opacity-90">Retrabalho</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">95%+</div>
                <div className="text-sm opacity-90">Satisfação</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">Validado</div>
                <div className="text-sm opacity-90">Requisitos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}