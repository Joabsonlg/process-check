import ProcessPortfolioMatrix from "@/components/ProcessPortfolioMatrix";
import Link from "next/link";
import { ArrowLeft, Target, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Matriz de Portfólio - ProcessCheck",
  description: "Analise o impacto estratégico e viabilidade de melhoria de cada processo em uma matriz interativa.",
};

export default function MatrixPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Página */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Processos
            </Link>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Análise Estratégica
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Matriz de Portfólio de Processos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entenda o posicionamento estratégico de cada processo e identifique as complexidades 
              de implementação baseadas no impacto no negócio e dificuldade técnica.
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProcessPortfolioMatrix />
        
        {/* Insights e Recomendações */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Processos Recomendados</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Comece pelos processos do quadrante superior direito:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <strong>Desenvolvimento</strong> - Alto impacto, implementação direta
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <strong>Testes & QA</strong> - Essencial e relativamente simples
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <strong>Entrega & Deploy</strong> - ROI rápido
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-600 rounded-xl">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Processos Complexos</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Processos que exigem planejamento cuidadoso:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <strong>Gestão de Portfólio</strong> - Alto impacto, implementação complexa
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <strong>TI & Segurança</strong> - Crítico mas requer expertise
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <strong>Riscos & Compliance</strong> - Investimento de longo prazo
              </li>
            </ul>
          </div>
        </div>

        {/* CTA para Resultados */}
        <div className="mt-12 text-center">
          <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quer um checklist detalhado?
            </h3>
            <p className="text-gray-600 mb-6">
              Acesse um guia completo com todos os processos e atividades recomendadas para empresas de software.
            </p>
            <Link
              href="/results"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Ver Checklist Completo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}