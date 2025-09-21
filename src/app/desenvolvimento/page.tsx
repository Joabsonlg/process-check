"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Code2,
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
  ClipboardList,
  TestTube,
  Palette,
  Smartphone,
  Globe,
  Package,
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
    id: "implementacao",
    nome: "Implementação",
    descricao: "Estrutura e processos para desenvolvimento eficiente de funcionalidades",
    cor: "from-blue-500 to-indigo-600",
    icone: Code2,
    elementos: [
      {
        categoria: "Organização do Frontend",
        icone: Globe,
        itens: [
          "Estrutura de Componentes Reutilizáveis",
          "Padrões de Interface Consistentes",
          "Responsividade Multi-dispositivo",
          "Acessibilidade (WCAG) Implementada",
          "Performance de Carregamento",
          "Gestão de Estado Centralizada",
          "Testes de Interface Automatizados",
          "Documentação de Componentes"
        ],
        cor: "bg-blue-50 border-blue-200"
      },
      {
        categoria: "Organização do Backend",
        icone: Server,
        itens: [
          "Arquitetura de APIs Bem Definida",
          "Estrutura de Dados Consistente",
          "Autenticação e Autorização",
          "Tratamento de Erros Padronizado",
          "Logs Estruturados e Rastreáveis",
          "Validação de Entrada de Dados",
          "Integração com Serviços Externos",
          "Documentação de APIs Atualizada"
        ],
        cor: "bg-indigo-50 border-indigo-200"
      },
      {
        categoria: "Desenvolvimento Mobile",
        icone: Smartphone,
        itens: [
          "Experiência Nativa Otimizada",
          "Funcionalidades Offline",
          "Notificações Push Estruturadas",
          "Integração com APIs do Dispositivo",
          "Performance em Diferentes Dispositivos",
          "Testes em Múltiplas Plataformas",
          "Processo de Publicação nas Stores",
          "Atualizações Over-the-Air (OTA)"
        ],
        cor: "bg-purple-50 border-purple-200"
      }
    ]
  },
  {
    id: "versionamento",
    nome: "Versionamento & PRs",
    descricao: "Processos de colaboração e controle de qualidade do código",
    cor: "from-green-500 to-emerald-600",
    icone: GitBranch,
    elementos: [
      {
        categoria: "Estratégia de Branches",
        icone: GitBranch,
        itens: [
          "Fluxo de Trabalho Definido",
          "Branches por Funcionalidade",
          "Branches de Hotfix Organizadas",
          "Proteção de Branches Principais",
          "Estratégia de Merge Consistente",
          "Resolução de Conflitos Padronizada",
          "Automação de Hooks",
          "Versionamento Semântico"
        ],
        cor: "bg-green-50 border-green-200"
      },
      {
        categoria: "Processo de Code Review",
        icone: Eye,
        itens: [
          "Templates de Pull Request",
          "Guidelines de Revisão",
          "Checklist de Qualidade",
          "Atribuição Automática de Revisores",
          "Fluxo de Aprovação Definido",
          "Feedback Construtivo",
          "Tamanho Ideal de PRs",
          "Cultura de Melhoria Contínua"
        ],
        cor: "bg-emerald-50 border-emerald-200"
      },
      {
        categoria: "Convenções de Commit",
        icone: FileText,
        itens: [
          "Padrão de Mensagens de Commit",
          "Commits Atômicos e Focados",
          "Rastreabilidade de Mudanças",
          "Assinatura Digital de Commits",
          "Geração Automática de Changelog",
          "Notas de Release Automatizadas",
          "Validação de Formato",
          "Histórico Limpo e Organizado"
        ],
        cor: "bg-teal-50 border-teal-200"
      }
    ]
  },
  {
    id: "build",
    nome: "Build & Artefatos",
    descricao: "Processos de empacotamento e geração de artefatos confiáveis",
    cor: "from-orange-500 to-red-500",
    icone: Package,
    elementos: [
      {
        categoria: "Processo de Build",
        icone: Package,
        itens: [
          "Pipeline de Build Automatizado",
          "Otimização de Performance",
          "Carregamento Lazy e Code Splitting",
          "Otimização de Assets",
          "Gestão de Variáveis de Ambiente",
          "Cache de Build Eficiente",
          "Builds Multi-estágio",
          "Monitoramento de Performance"
        ],
        cor: "bg-orange-50 border-orange-200"
      },
      {
        categoria: "Containerização",
        icone: Database,
        itens: [
          "Imagens Docker Otimizadas",
          "Builds Multi-estágio",
          "Redução de Tamanho de Imagem",
          "Scanning de Segurança",
          "Gestão de Imagens Base",
          "Registry Organizado",
          "Estratégia de Tags",
          "Health Checks Implementados"
        ],
        cor: "bg-red-50 border-red-200"
      },
      {
        categoria: "Segurança & Compliance",
        icone: Shield,
        itens: [
          "Lista de Materiais de Software (SBOM)",
          "Scanning de Vulnerabilidades",
          "Compliance de Licenças",
          "Segurança da Supply Chain",
          "Assinatura de Artefatos",
          "Rastreamento de Proveniência",
          "Atestados de Segurança",
          "Relatórios de Compliance"
        ],
        cor: "bg-pink-50 border-pink-200"
      }
    ]
  }
];

export default function DesenvolvimentoPage() {
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
      link.download = "Mapa-Desenvolvimento-Perfeito.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
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
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Mapa do Desenvolvimento Perfeito
                  </h1>
                  <p className="text-sm text-slate-600">Tudo que sua equipe de desenvolvimento precisa para excelência</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isClient && (
                <button 
                  onClick={exportPNG}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md"
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
            Os 3 Pilares Essenciais do Processo de Desenvolvimento
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Este mapa apresenta os elementos fundamentais do processo de desenvolvimento: 
            desde a implementação do código até a geração de artefatos prontos para deploy.
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
        <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                <Code2 className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Processo de Desenvolvimento Completo</h3>
            <p className="text-lg opacity-95 mb-6">
              Com esses três pilares bem estruturados, sua equipe terá um processo de desenvolvimento 
              robusto, desde a codificação até a entrega de artefatos prontos para produção.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">&lt;1 dia</div>
                <div className="text-sm opacity-90">Lead Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">95%+</div>
                <div className="text-sm opacity-90">Test Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">&lt;5min</div>
                <div className="text-sm opacity-90">Deploy Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm opacity-90">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}