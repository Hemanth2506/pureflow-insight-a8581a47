import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  bottled: number;
  tap: number;
  filtered: number;
}

export function StatsCards({ bottled, tap, filtered }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="hover:scale-105 transition-transform shadow-lg">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-bold mb-2">Bottled Water</h2>
          <span className="text-5xl font-bold text-primary block my-4">{bottled}</span>
          <small className="text-muted-foreground">Particles Per Liter</small>
        </CardContent>
      </Card>
      
      <Card className="hover:scale-105 transition-transform shadow-lg">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-bold mb-2">Tap Water</h2>
          <span className="text-5xl font-bold text-secondary block my-4">{tap}</span>
          <small className="text-muted-foreground">Particles Per Liter</small>
        </CardContent>
      </Card>
      
      <Card className="hover:scale-105 transition-transform shadow-lg">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-bold mb-2">Filtered Water</h2>
          <span className="text-5xl font-bold text-secondary block my-4">{filtered}</span>
          <small className="text-muted-foreground">Particles Per Liter</small>
        </CardContent>
      </Card>
    </div>
  );
}
