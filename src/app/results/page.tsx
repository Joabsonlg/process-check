"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Target,
  TrendingUp,
  Clock,
  Zap,
  BarChart3,
  Users,
  Shield,
  Package,
  Settings,
  Brain,
  Megaphone,
  ShoppingCart,
  Code2,
  FileText,
  Layers,
  Rocket,
  Headphones
} from "lucide-react";

type ProcessStatus = "implemented" | "in-progress" | "not-implemented";

interface ProcessCheck {
  name: string;
  category: "core" | "support" | "management";
  icon: React.ComponentType<any>;
  status: ProcessStatus;
  priority: "high" | "medium" | "low";
  description: string;
  recommendations: string[];
}

const processChecklist: ProcessCheck[] = [
  // Core Processes
  {
    name: "Gestão de Portfólio & Demanda",
    category: "core",
    icon: FileText,
    status: "not-implemented",
    priority: "high",
    description: "Processo estratégico para definir e priorizar iniciativas",
    recommendations: [
      "Implementar framework de OKRs",
      "Criar processo de business case",
      "Estabelecer roadmap de produtos"
    ]
  },
  {
    name: "Engenharia de Requisitos",
    category: "core",
    icon: FileText,
    status: "in-progress",
    priority: "high",
    description: "Levantamento e especificação de requisitos",
    recommendations: [
      "Padronizar user stories",
      "Implementar prototipação",
      "Melhorar processo de validação"
    ]
  },
  {
    name: "Arquitetura & Design",
    category: "core",
    icon: Layers,
    status: "implemented",
    priority: "medium",
    description: "Design e arquitetura de soluções",
    recommendations: [
      "Documentar padrões arquiteturais",
      "Implementar security by design",
      "Criar biblioteca de componentes"
    ]
  },
  {
    name: "Desenvolvimento",
    category: "core",
    icon: Code2,
    status: "implemented",
    priority: "high",
    description: "Processo de desenvolvimento de software",
    recommendations: [
      "Otimizar code reviews",
      "Implementar pair programming",
      "Melhorar convenções de commit"
    ]
  },
  {
    name: "Testes & QA",
    category: "core",
    icon: CheckCircle2,
    status: "in-progress",
    priority: "high",
    description: "Garantia de qualidade e testes",
    recommendations: [
      "Aumentar cobertura de testes automatizados",
      "Implementar testes de performance",
      "Criar estratégia de testes E2E"
    ]
  },
  {
    name: "Entrega & Deploy",
    category: "core",
    icon: Rocket,
    status: "implemented",
    priority: "medium",
    description: "CI/CD e gestão de releases",
    recommendations: [
      "Implementar deployment blue/green",
      "Melhorar observabilidade",
      "Automatizar rollbacks"
    ]
  },
  {
    name: "Suporte & Manutenção",
    category: "core",
    icon: Headphones,
    status: "not-implemented",
    priority: "medium",
    description: "Suporte e manutenção de sistemas",
    recommendations: [
      "Criar processo de incident management",
      "Implementar SLA/OLA",
      "Estabelecer processo de post-mortem"
    ]
  },
  // Support Processes (selecionados)
  {
    name: "Gestão de Pessoas",
    category: "support",
    icon: Users,
    status: "in-progress",
    priority: "high",
    description: "Gestão de talentos e desenvolvimento",
    recommendations: [
      "Criar trilhas de carreira",
      "Implementar feedback 360º",
      "Melhorar processo de onboarding"
    ]
  },
  {
    name: "TI Interna & Segurança",
    category: "support",
    icon: Shield,
    status: "not-implemented",
    priority: "high",
    description: "Infraestrutura e segurança corporativa",
    recommendations: [
      "Implementar políticas de segurança",
      "Criar processo de gestão de acessos",
      "Estabelecer backup e recovery"
    ]
  },
  // Management Processes (selecionados)
  {
    name: "Gestão da Qualidade",
    category: "management",
    icon: Settings,
    status: "in-progress",
    priority: "medium",
    description: "Políticas e padrões de qualidade",
    recommendations: [
      "Implementar Definition of Done",
      "Criar métricas de qualidade",
      "Estabelecer auditorias de processo"
    ]
  }
];

const statusConfig = {
  implemented: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    label: "Implementado"
  },
  "in-progress": {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    label: "Em Progresso"
  },
  "not-implemented": {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    label: "Não Implementado"
  }
};

const priorityConfig = {
  high: "Alta",
  medium: "Média",
  low: "Baixa"
};

export default function ResultsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "core" | "support" | "management">("all");
  
  const filteredProcesses = selectedCategory === "all" 
    ? processChecklist 
    : processChecklist.filter(p => p.category === selectedCategory);

  const stats = {
    implemented: processChecklist.filter(p => p.status === "implemented").length,
    inProgress: processChecklist.filter(p => p.status === "in-progress").length,
    notImplemented: processChecklist.filter(p => p.status === "not-implemented").length,
    total: processChecklist.length
  };

  const maturityScore = Math.round(((stats.implemented * 1 + stats.inProgress * 0.5) / stats.total) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Página */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/matrix"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Matriz
            </Link>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" />
              Guia Completo
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Checklist de Processos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um guia completo dos processos essenciais que toda empresa de desenvolvimento 
              de software deveria implementar, organizado por categorias e prioridades.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Exemplo de Implementação */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full mb-4">
              <span className="text-2xl font-bold">75%</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exemplo de Implementação</h2>
            <p className="text-gray-600 mb-6">
              Esta é uma representação de como uma empresa madura poderia ter implementado os processos essenciais
            </p>
            
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-sm text-gray-600">Implementados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-600">Em Progresso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-sm text-gray-600">Não Implementados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "Todos os Processos" },
              { key: "core", label: "Processos Core" },
              { key: "support", label: "Processos de Suporte" },
              { key: "management", label: "Processos de Gestão" }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedCategory(filter.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === filter.key
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Checklist de Processos */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Processos Essenciais por Categoria</h3>
          {filteredProcesses.map((process, idx) => {
            const statusInfo = statusConfig[process.status];
            const StatusIcon = statusInfo.icon;
            const ProcessIcon = process.icon;
            
            return (
              <div
                key={idx}
                className={`bg-white rounded-xl border-2 ${statusInfo.border} p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${statusInfo.bg} rounded-xl`}>
                    <ProcessIcon className={`w-6 h-6 ${statusInfo.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{process.name}</h3>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        process.priority === "high" ? "bg-red-100 text-red-800" :
                        process.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        Prioridade {priorityConfig[process.priority]}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{process.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Atividades Principais:</h4>
                      <ul className="space-y-1">
                        {process.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Próximos Passos */}
        <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Sequência Recomendada de Implementação
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-xl mb-3">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Processos Fundamentais</h4>
              <p className="text-sm text-gray-600">
                Comece com Desenvolvimento, Testes & QA, e Entrega & Deploy - a base técnica
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Processos de Apoio</h4>
              <p className="text-sm text-gray-600">
                Implemente Gestão de Pessoas e TI & Segurança para suportar o crescimento
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-xl mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Processos Estratégicos</h4>
              <p className="text-sm text-gray-600">
                Finalize com Gestão de Portfólio e processos de governança para maturidade total
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}