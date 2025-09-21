import ProcessLandscape from "@/components/ProcessLandscape";

export const metadata = {
  title: "Explorar Processos - ProcessCheck",
  description: "Explore todos os processos que uma empresa de software deveria implementar em uma visualização interativa.",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8">
        <ProcessLandscape />
      </div>
    </div>
  );
}