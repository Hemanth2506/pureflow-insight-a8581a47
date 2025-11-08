import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface LayerChartProps {
  data: Array<{ name: string; efficiency: number }>;
}

export function LayerChart({ data }: LayerChartProps) {
  const colors = ['#2176ae', '#3a8bc2', '#52a0d6', '#6bb5ea', '#84cafe'];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Layer-wise Filtration Performance
      </h2>
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--foreground))" 
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--foreground))" 
              tick={{ fill: 'hsl(var(--foreground))' }}
              label={{ value: 'Removal %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`${value}%`, 'Efficiency']}
            />
            <Bar dataKey="efficiency" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
