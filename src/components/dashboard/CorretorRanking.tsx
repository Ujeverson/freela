import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Award, TrendingUp } from "lucide-react";


type CorretorStat = {
  nome: string;
  total: number;
  aceitas: number;
};

export default function CorretorRanking({ mensagens }) {
  const getTopCorretores = () => {
    const corretorStats: Record<string, CorretorStat> = {};
    mensagens.forEach(msg => {
      if (!msg.corretor_envio) return;
      if (!corretorStats[msg.corretor_envio]) {
        corretorStats[msg.corretor_envio] = {
          nome: msg.corretor_envio,
          total: 0,
          aceitas: 0
        };
      }
      corretorStats[msg.corretor_envio].total++;
      if (msg.status === "accepted") {
        corretorStats[msg.corretor_envio].aceitas++;
      }
    });
    return Object.values(corretorStats)
      .map((corretor: CorretorStat) => ({
        ...corretor,
        taxaSucesso: corretor.total > 0 ? ((corretor.aceitas / corretor.total) * 100) : 0
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  };

  const topCorretores = getTopCorretores();

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Award className="w-4 h-4 text-yellow-500" />;
      case 1: return <Award className="w-4 h-4 text-gray-400" />;
      case 2: return <Award className="w-4 h-4 text-amber-600" />;
      default: return <Users className="w-4 h-4 text-slate-400" />;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case 1: return "bg-gray-50 text-gray-800 border-gray-200";
      case 2: return "bg-amber-50 text-amber-800 border-amber-200";
      default: return "bg-slate-50 text-slate-800 border-slate-200";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top 10 Corretores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topCorretores.map((corretor, index) => (
          <div key={corretor.nome} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getRankIcon(index)}
                <Badge className={`${getRankColor(index)} border`}>
                  #{index + 1}
                </Badge>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 truncate max-w-32">
                  {corretor.nome}
                </p>
                <p className="text-sm text-slate-500">
                  {corretor.total} mensagens
                </p>
              </div>
            </div>
            <div className="text-right min-w-24">
              <p className="text-sm font-medium text-slate-900">
                {corretor.taxaSucesso.toFixed(1)}%
              </p>
              <Progress value={corretor.taxaSucesso} className="h-2 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
