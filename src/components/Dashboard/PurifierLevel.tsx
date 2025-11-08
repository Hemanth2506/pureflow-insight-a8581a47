import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: 'Filter Life Remaining', value: 75 },
  { name: 'Filter Used', value: 25 },
];

const COLORS = ['#21ae59', '#e0e0e0'];

export function PurifierLevel() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Water Purifier Filter Level
      </h2>
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
