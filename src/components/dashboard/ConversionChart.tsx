import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useDashboard } from "@/contexts/DashboardContext";

interface ConversionChartProps {
  conversionData: {
    name: string;
    value: number;
    color: string;
  }[];
  
  dailyData: {
    date: string;
    leads: number;
    accepted: number;
  }[];
}

export function ConversionChart({ conversionData, dailyData }: ConversionChartProps) {
  const { updateFilter } = useDashboard();
  
  const handlePieClick = (data: any) => {
    // Quando clica no gráfico de pizza, pode filtrar por status se necessário
    console.log('Pie clicked:', data);
  };

  const handleBarClick = (data: any) => {
    if (data && data.activeLabel) {
      updateFilter('dia', data.activeLabel);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Status Distribution */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:bg-white transition-colors">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900 font-semibold flex items-center gap-2">
            Status dos Leads
          </CardTitle>
          <CardDescription className="text-slate-600">Distribuição por status de conversão</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onClick={handlePieClick}
                style={{ cursor: 'pointer' }}
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Performance */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:bg-white transition-colors">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900 font-semibold flex items-center gap-2">
            Performance Diária
          </CardTitle>
          <CardDescription className="text-slate-600">Leads enviados vs aceitos por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData} onClick={handleBarClick}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                formatter={(value, name) => [value, name === 'leads' ? 'Leads Enviados' : 'Leads Aceitos']}
              />
              <Legend />
              <Bar 
                dataKey="leads" 
                fill="#3b82f6" 
                name="Leads Enviados" 
                radius={[4, 4, 0, 0]}
                style={{ cursor: 'pointer' }}
              />
              <Bar 
                dataKey="accepted" 
                fill="#10b981" 
                name="Leads Aceitos" 
                radius={[4, 4, 0, 0]}
                style={{ cursor: 'pointer' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}