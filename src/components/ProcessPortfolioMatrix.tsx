import React from "react";
import {
  Rocket, FileText, Layers, Code2, CheckCircle2, Headphones, Target, Zap, Brain, ShoppingCart, Shield, Package, Megaphone, Users, Settings
} from "lucide-react";

type Feasibility = "low" | "medium" | "high";
type Health = "good" | "attention" | "critical";

interface Process {
  name: string;
  icon: React.ComponentType<any>;
  x: number;
  y: number;
  feasibility: Feasibility;
  health: Health;
  category: string;
}

// Processos do PLM, incluindo saúde do processo
const processes: Process[] = [
  // Core
  { name: "Desenvolvimento", icon: Code2, x: 0.8, y: 0.9, feasibility: "high", health: "good", category: "Core" },
  { name: "Testes & QA", icon: CheckCircle2, x: 0.7, y: 0.85, feasibility: "high", health: "attention", category: "Core" },
  { name: "Entrega & Deploy", icon: Rocket, x: 0.9, y: 0.8, feasibility: "medium", health: "good", category: "Core" },
  { name: "Gestão de Portfólio & Demanda", icon: FileText, x: 0.3, y: 0.95, feasibility: "low", health: "critical", category: "Core" },
  { name: "Inovação & P&D", icon: Zap, x: 0.2, y: 0.8, feasibility: "low", health: "attention", category: "Gestão" },
  { name: "Gestão do Conhecimento", icon: Brain, x: 0.85, y: 0.3, feasibility: "high", health: "good", category: "Suporte" },
  { name: "Suporte & Manutenção", icon: Headphones, x: 0.8, y: 0.2, feasibility: "medium", health: "attention", category: "Core" },
  // Suporte
  { name: "Gestão de Pessoas", icon: Users, x: 0.6, y: 0.6, feasibility: "medium", health: "good", category: "Suporte" },
  { name: "TI Interna & Segurança", icon: Shield, x: 0.4, y: 0.5, feasibility: "low", health: "critical", category: "Suporte" },
  { name: "Financeiro & Controladoria", icon: Package, x: 0.5, y: 0.4, feasibility: "medium", health: "attention", category: "Suporte" },
  { name: "Compras & Fornecedores", icon: ShoppingCart, x: 0.2, y: 0.2, feasibility: "low", health: "critical", category: "Suporte" },
  { name: "Marketing & Vendas", icon: Megaphone, x: 0.7, y: 0.4, feasibility: "high", health: "good", category: "Suporte" },
  // Gestão
  { name: "Gestão Estratégica", icon: Target, x: 0.5, y: 0.95, feasibility: "medium", health: "attention", category: "Gestão" },
  { name: "Gestão da Qualidade", icon: Settings, x: 0.6, y: 0.7, feasibility: "high", health: "good", category: "Gestão" },
  { name: "Gestão de Riscos & Compliance", icon: Shield, x: 0.3, y: 0.7, feasibility: "low", health: "critical", category: "Gestão" },
];

const feasibilityColor = {
  low: "bg-black text-white border-black",
  medium: "bg-gray-400 text-white border-gray-600",
  high: "bg-white text-gray-800 border-gray-400"
};

export default function ProcessPortfolioMatrix() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-5xl mx-auto border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Matriz de Portfólio de Processos</h2>
      <div className="mb-4 text-sm text-gray-800 font-medium">Critérios: Impacto estratégico, Viabilidade de melhorias.</div>
      <div className="relative w-full h-[600px] bg-white border rounded-xl">
        {/* Eixos */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gray-400" />
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-400 -translate-y-1/2" />
        {/* Labels dos eixos */}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-base text-gray-900 font-bold">Impacto Estratégico (Alto)</div>
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 text-base text-gray-900 font-bold">Impacto Estratégico (Baixo)</div>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-base text-gray-900 font-bold">Viabilidade Baixa</div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-base text-gray-900 font-bold">Viabilidade Alta</div>
        {/* Bolhas dos processos */}
        {processes.map((proc, idx) => {
          // Ajusta espaçamento para evitar sobreposição
          const left = `${proc.x * 85 + 7}%`;
          const top = `${(1 - proc.y) * 85 + 7}%`;
          const Icon = proc.icon;
          return (
            <div key={idx} className="absolute" style={{ left, top }}>
              <div className="flex flex-col items-center">
                <span className={`inline-flex items-center justify-center rounded-full w-12 h-12 mb-1 border border-gray-400 bg-white shadow-sm`}>
                  <Icon className="w-5 h-5 text-gray-900" />
                </span>
                <span className="text-xs font-medium text-gray-900 text-center max-w-[90px]">
                  {proc.name}
                </span>
                <span className="text-[10px] text-gray-500">{proc.category}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Legenda de viabilidade abaixo do gráfico */}
      <div className="mt-6 flex flex-wrap gap-8 text-xs text-gray-900 bg-white/90 rounded p-2 shadow border w-fit mx-auto">
        <div>
          <div className="mb-1 font-bold">Viabilidade</div>
          <div className="flex items-center gap-2 mb-1"><span className="inline-block w-3 h-3 rounded-full bg-black border border-black mr-1" /> Baixa</div>
          <div className="flex items-center gap-2 mb-1"><span className="inline-block w-3 h-3 rounded-full bg-gray-400 border border-gray-600 mr-1" /> Média</div>
          <div className="flex items-center gap-2 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-white border border-gray-400 mr-1" /> Alta</div>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-900">
        <strong>Como ler:</strong> Processos no canto superior direito são prioritários para melhoria (alto impacto, alta viabilidade). Inferior esquerdo são baixa prioridade. Critérios e cores seguem o exemplo do material da aula.
      </div>
      <div className="mt-4 text-sm text-gray-800 bg-gray-50 rounded p-4 border">
        <strong>Descrição da matriz:</strong><br />
        Esta matriz posiciona cada processo conforme seu impacto estratégico (vertical) e viabilidade de melhoria (horizontal):<br /><br />
        <ul className="list-disc ml-6">
          <li><strong>Quadrante superior direito</strong>: Processos como <em>Desenvolvimento</em>, <em>Testes & QA</em> e <em>Entrega & Deploy</em> estão aqui por serem altamente estratégicos e terem alta viabilidade de melhoria. São prioridade para ações de melhoria.</li>
          <li><strong>Quadrante superior esquerdo</strong>: Processos como <em>Gestão de Portfólio & Demanda</em> e <em>Gestão de Riscos & Compliance</em> têm alto impacto, mas baixa viabilidade de melhoria. São críticos, mas difíceis de atacar.</li>
          <li><strong>Quadrante inferior direito</strong>: Processos como <em>Gestão do Conhecimento</em>, <em>Suporte & Manutenção</em> e <em>Marketing & Vendas</em> têm baixa importância estratégica, mas são fáceis de melhorar. Podem ser alvo de melhorias rápidas, mas não são prioritários.</li>
          <li><strong>Quadrante inferior esquerdo</strong>: Processos como <em>Compras & Fornecedores</em> têm baixo impacto e baixa viabilidade, sendo baixa prioridade para qualquer ação.</li>
        </ul>
        <br />
        Cada processo foi posicionado conforme sua relevância para os objetivos da empresa e a facilidade de implementar melhorias, seguindo os critérios definidos na questão anterior.
      </div>
    </div>
  );
}
