"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Layers,
  ArrowLeft,
  Download,
  Target,
  CheckCircle2,
  Database,
  Network,
  Shield,
  Lightbulb,
  FileText,
  Zap,
  Settings,
  Code,
  Globe
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
    id: "arquitetura-referencia",
    nome: "Arquitetura de Referência",
    descricao: "Padrões e diretrizes fundamentais para construção de software",
    cor: "from-blue-500 to-indigo-600",
    icone: Layers,
    elementos: [
      {
        categoria: "Padrões Arquiteturais",
        icone: Settings,
        itens: [
          "Padrões de Design Estabelecidos",
          "Princípios de Desenvolvimento Sólidos",
          "Arquitetura Limpa e Organizada",
          "Separação de Responsabilidades",
          "Modelagem de Domínio Clara",
          "Arquitetura Orientada a Eventos",
          "Separação de Comandos e Consultas",
          "Padrões de Microserviços"
        ],
        cor: "bg-blue-50 border-blue-200"
      },
      {
        categoria: "Guidelines & Standards",
        icone: FileText,
        itens: [
          "Padrões de Codificação Definidos",
          "Registro de Decisões Arquiteturais",
          "Diretrizes de Design de API",
          "Padrões de Design de Banco de Dados",
          "Convenções de Nomenclatura",
          "Templates de Documentação",
          "Diretrizes de Revisão de Código",
          "Gates de Qualidade e Checkpoints"
        ],
        cor: "bg-indigo-50 border-indigo-200"
      },
      {
        categoria: "Security by Design",
        icone: Shield,
        itens: [
          "Compliance com Padrões de Segurança",
          "Práticas de Codificação Segura",
          "Autenticação e Autorização Robustas",
          "Padrões de Criptografia de Dados",
          "Validação e Sanitização de Entrada",
          "Headers de Segurança Implementados",
          "Modelagem de Ameaças",
          "Privacidade por Design (LGPD/GDPR)"
        ],
        cor: "bg-purple-50 border-purple-200"
      }
    ]
  },
  {
    id: "dados-integracoes",
    nome: "Dados & Integrações",
    descricao: "Modelagem de dados e estratégias de integração entre sistemas",
    cor: "from-green-500 to-emerald-600",
    icone: Database,
    elementos: [
      {
        categoria: "Modelo de Dados",
        icone: Database,
        itens: [
          "Modelagem de Relacionamentos Clara",
          "Normalização de Banco de Dados",
          "Melhores Práticas de Modelagem",
          "Design de Schema Flexível",
          "Conceitos de Data Warehousing",
          "Gestão de Dados Mestres",
          "Governança de Dados Estabelecida",
          "Gestão do Ciclo de Vida dos Dados"
        ],
        cor: "bg-green-50 border-green-200"
      },
      {
        categoria: "APIs & Contratos",
        icone: Globe,
        itens: [
          "Design de API Consistente",
          "Schema de Consultas Otimizado",
          "Especificações Bem Documentadas",
          "Estratégias de Versionamento",
          "Desenvolvimento Orientado a Contratos",
          "Padrões de Gateway de API",
          "Limitação de Taxa e Throttling",
          "Segurança e Autenticação de API"
        ],
        cor: "bg-emerald-50 border-emerald-200"
      },
      {
        categoria: "Mensageria & Events",
        icone: Network,
        itens: [
          "Padrões de Fila de Mensagens",
          "Arquitetura Orientada a Eventos",
          "Mensageria Pub/Sub",
          "Brokers de Mensagem Configurados",
          "Streaming de Eventos",
          "Padrão Saga Implementado",
          "Filas de Mensagens Mortas",
          "Serialização de Mensagens"
        ],
        cor: "bg-teal-50 border-teal-200"
      }
    ]
  },
  {
    id: "provas-conceito",
    nome: "Provas de Conceito",
    descricao: "Validação técnica e experimentação de soluções",
    cor: "from-orange-500 to-red-500",
    icone: Lightbulb,
    elementos: [
      {
        categoria: "Spike Técnico",
        icone: Zap,
        itens: [
          "Avaliação de Tecnologias",
          "Benchmarking de Performance",
          "Estudos de Viabilidade",
          "Avaliação de Riscos",
          "Análise de Dívida Técnica",
          "Estratégias de Migração",
          "Planejamento de Capacidade",
          "Testes de Escalabilidade"
        ],
        cor: "bg-orange-50 border-orange-200"
      },
      {
        categoria: "Protótipos",
        icone: Code,
        itens: [
          "Prototipagem Rápida",
          "Desenvolvimento de MVP",
          "Mockups de UI/UX",
          "Protótipos Interativos",
          "Demonstrações Técnicas",
          "Aplicações de Prova de Conceito",
          "Validação de Algoritmos",
          "Testes de Integração"
        ],
        cor: "bg-red-50 border-red-200"
      },
      {
        categoria: "Trade-offs & Decisions",
        icone: Target,
        itens: [
          "Seleção de Stack Tecnológico",
          "Performance vs Manutenibilidade",
          "Análise de Custo vs Benefício",
          "Decisões Build vs Buy",
          "Considerações de Escalabilidade",
          "Segurança vs Usabilidade",
          "Time to Market vs Qualidade",
          "Avaliação de Vendor Lock-in"
        ],
        cor: "bg-pink-50 border-pink-200"
      }
    ]
  }
];

export default function ArquiteturaDesignPage() {
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
      link.download = "Mapa-Arquitetura-Design-Perfeito.png";
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
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mapa da Arquitetura & Design Perfeito
                  </h1>
                  <p className="text-sm text-slate-600">Fundamentos para arquitetura sólida e design eficiente</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isClient && (
                <button 
                  onClick={exportPNG}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
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
            Os 3 Pilares Essenciais da Arquitetura & Design
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Este mapa apresenta os elementos fundamentais para criar arquiteturas sólidas, 
            desde padrões de referência até validação através de provas de conceito.
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
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                <Layers className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Arquitetura Sólida = Base para Excelência</h3>
            <p className="text-lg opacity-95 mb-6">
              Com esses três pilares bem estabelecidos, sua equipe terá uma base arquitetural 
              sólida para construir sistemas escaláveis, maintíveis e seguros.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Padrões</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">Zero</div>
                <div className="text-sm opacity-90">Vulnerabilidades</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">Escalável</div>
                <div className="text-sm opacity-90">Design</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">Validado</div>
                <div className="text-sm opacity-90">PoCs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}