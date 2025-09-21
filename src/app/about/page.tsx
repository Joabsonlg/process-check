import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Target,
  BarChart3,
  CheckCircle2,
  Users,
  Lightbulb,
  Award,
  TrendingUp
} from "lucide-react";

export const metadata = {
  title: "Sobre - ProcessCheck",
  description: "Entenda como o ProcessCheck organiza e apresenta os processos essenciais para empresas de desenvolvimento de software.",
};

const features = [
  {
    icon: BarChart3,
    title: "Visualização Interativa",
    description: "Explore processos em 3 níveis de detalhe com busca e filtros avançados"
  },
  {
    icon: Target,
    title: "Análise Estratégica",
    description: "Matriz de portfólio mostra impacto vs. viabilidade de cada processo"
  },
  {
    icon: CheckCircle2,
    title: "Checklist Prático",
    description: "Acesse uma lista organizada de processos e atividades por categoria"
  },
  {
    icon: TrendingUp,
    title: "Score de Maturidade",
    description: "Visualize exemplos de implementação para acompanhar padrões organizacionais"
  }
];

const methodology = [
  {
    step: "1",
    title: "Mapeamento Completo",
    description: "Catalogamos 25+ processos organizados em Core Business, Suporte e Gestão"
  },
  {
    step: "2",
    title: "Análise Estratégica",
    description: "Cada processo é posicionado baseado em impacto estratégico e complexidade de implementação"
  },
  {
    step: "3",
    title: "Organização Didática",
    description: "Apresentamos a informação de forma visual e estruturada para facilitar o aprendizado"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Metodologia e Conceitos
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre o ProcessCheck
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um guia completo e interativo para entender quais processos toda empresa 
              de desenvolvimento de software deveria implementar.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* O que é */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que é o ProcessCheck?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              O ProcessCheck é um guia educativo que apresenta os processos essenciais 
              que toda empresa de tecnologia deveria considerar implementar, organizados 
              de forma visual e interativa para facilitar o entendimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Metodologia */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Metodologia</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Esta estrutura de processos foi desenvolvida com base na experiência prática 
              e observação de empresas de software bem-sucedidas, organizando conhecimento 
              de forma didática e visual.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {methodology.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categorias de Processos */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Categorias de Processos</h2>
            <p className="text-xl text-gray-600">
              Organizamos os processos em três camadas principais para facilitar a análise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-indigo-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Processos Core</h3>
                <p className="text-gray-600 mb-4">
                  Processos diretamente relacionados ao desenvolvimento de software: 
                  desde gestão de portfólio até suporte e manutenção.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Gestão de Portfólio & Demanda</li>
                  <li>• Engenharia de Requisitos</li>
                  <li>• Arquitetura & Design</li>
                  <li>• Desenvolvimento</li>
                  <li>• Testes & QA</li>
                  <li>• Entrega & Deploy</li>
                  <li>• Suporte & Manutenção</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-emerald-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Processos de Suporte</h3>
                <p className="text-gray-600 mb-4">
                  Processos que apoiam e viabilizam as atividades core, 
                  fornecendo recursos e infraestrutura necessária.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Gestão de Pessoas</li>
                  <li>• TI Interna & Segurança</li>
                  <li>• Financeiro & Controladoria</li>
                  <li>• Compras & Fornecedores</li>
                  <li>• Marketing & Vendas</li>
                  <li>• Gestão do Conhecimento</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-amber-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Processos de Gestão</h3>
                <p className="text-gray-600 mb-4">
                  Processos estratégicos que direcionam e monitoram 
                  todas as atividades organizacionais.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Gestão Estratégica</li>
                  <li>• Gestão da Qualidade</li>
                  <li>• Gestão de Riscos & Compliance</li>
                  <li>• Inovação & P&D</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Como Usar */}
        <section className="mb-16">
          <div className="bg-gray-100 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Usar</h2>
              <p className="text-xl text-gray-600">
                Siga estes passos para obter o máximo valor da ferramenta
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Explore os Processos</h3>
                    <p className="text-gray-600 text-sm">
                      Navegue pela paisagem de processos interativa, use os filtros de busca e explore os 3 níveis de detalhe.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Analise a Matriz</h3>
                    <p className="text-gray-600 text-sm">
                      Veja o posicionamento estratégico de cada processo na matriz de impacto vs. complexidade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Consulte o Guia</h3>
                    <p className="text-gray-600 text-sm">
                      Acesse um checklist de referência com todos os processos e atividades organizadas por categoria.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Foco</h4>
                  <p className="text-sm text-gray-600">
                    Priorize processos no quadrante superior direito da matriz - alto impacto e alta viabilidade.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Acompanhamento</h4>
                  <p className="text-sm text-gray-600">
                    Faça avaliações periódicas para acompanhar a evolução da maturidade organizacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-indigo-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Pronto para Explorar?</h2>
            <p className="text-xl text-indigo-100 mb-6">
              Comece a explorar os processos agora e descubra como estruturar empresas de software
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Explorar Processos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}