import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, CheckCircle, TrendingUp, Users, Clock } from "lucide-react";

interface KPIGridProps {
  data: {
    totalLeads: number;
    conversionRate: number;
    acceptedLeads: number;
    avgResponseTime: string;
    totalCorretores: number;
  };
}

export function KPIGrid({ data }: KPIGridProps) {
  const cards = [
    {
      title: "Total de Leads",
      value: data.totalLeads.toLocaleString(),
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      title: "Taxa de Conversão",
      value: `${data.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      title: "Leads Aceitos",
      value: data.acceptedLeads.toLocaleString(),
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      title: "Tempo Médio Resposta",
      value: data.avgResponseTime,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
    {
      title: "Corretores Ativos",
      value: data.totalCorretores.toLocaleString(),
      icon: Users,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-5 h-5 ${card.textColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {card.value}
            </div>
            <div className={`h-1 w-full bg-gradient-to-r ${card.color} rounded-full`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}