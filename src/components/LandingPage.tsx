"use client";

import React from "react";
import {
  CheckCircle2,
  BarChart3,
  Target,
  ArrowRight,
  PlayCircle,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Eye
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BarChart3,
    title: "Visualização Interativa",
    description: "Explore todos os processos em uma interface interativa com 3 níveis de detalhamento."
  },
  {
    icon: Target,
    title: "Compreensão Estrutural",
    description: "Entenda como organizar processos em Core Business, Suporte e Gestão."
  },
  {
    icon: TrendingUp,
    title: "Análise Estratégica",
    description: "Veja o impacto estratégico e complexidade de implementação de cada processo."
  },
  {
    icon: CheckCircle2,
    title: "Guia Prático",
    description: "Acesse um checklist detalhado dos processos essenciais e suas atividades."
  }
];

const stats = [
  { number: "25+", label: "Processos Mapeados" },
  { number: "3", label: "Níveis de Detalhe" },
  { number: "100%", label: "Gratuito" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Guia de Processos de Software
          </div>
          
          {/* Título Principal */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Explore os{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Processos Essenciais
            </span>{" "}
            para Empresas de Software
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubra quais processos toda empresa de desenvolvimento deveria implementar. 
            Um guia completo e interativo para entender a estrutura organizacional ideal.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <PlayCircle className="w-5 h-5" />
              Explorar Processos
            </Link>
            <Link
              href="/matrix"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-200"
            >
              <Eye className="w-5 h-5" />
              Ver Matriz Estratégica
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-600">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Em 3 passos simples, você terá uma visão completa dos processos essenciais para empresas de software
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Explore os Processos</h3>
              <p className="text-gray-600">
                Navegue pela paisagem de processos e descubra quais atividades toda empresa de software deveria ter.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Analise a Matriz</h3>
              <p className="text-gray-600">
                Entenda o posicionamento estratégico de cada processo e sua complexidade de implementação.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Consulte o Guia</h3>
              <p className="text-gray-600">
                Acesse um checklist detalhado com todos os processos e atividades recomendadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recursos Principais
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para entender e implementar processos de software
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Explorar?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Comece a explorar os processos agora e descubra como estruturar empresas de software
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
          >
            Explorar Processos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}