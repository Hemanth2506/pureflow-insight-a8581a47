import { Button } from "@/components/ui/button";

interface RemovalRateProps {
  removalRate: number;
  onSimulate: () => void;
}

export function RemovalRate({ removalRate, onSimulate }: RemovalRateProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Microplastics Removal Rate
      </h2>
      <div className="w-full max-w-2xl mx-auto bg-muted rounded-full p-2 shadow-inner">
        <div
          className="h-8 bg-gradient-to-r from-secondary to-primary rounded-full text-white font-bold flex items-center px-4 transition-all duration-700"
          style={{ width: `${removalRate}%` }}
        >
          {removalRate}%
        </div>
      </div>
      <div className="text-center mt-6">
        <Button
          onClick={onSimulate}
          size="lg"
          className="bg-primary hover:bg-secondary text-white shadow-lg hover:shadow-xl transition-all"
        >
          Simulate Filtration
        </Button>
      </div>
    </section>
  );
}
