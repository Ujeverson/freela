import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TemplateAnalysis({ mensagens }) {
  const getTemplateStats = () => {
    const templateStats = {};
    
    mensagens.forEach(msg => {
      if (!msg.template) return;
      
      if (!templateStats[msg.template]) {
        templateStats[msg.template] = {
          nome: msg.template,
          total: 0,
          aceitas: 0
        };
      }
      
      templateStats[msg.template].total++;
      if (msg.status === "accepted") {
        templateStats[msg.template].aceitas++;
      }
    });

    return Object.values(templateStats)
      .map((template: any) => ({
        ...template,
        taxaSucesso: template.total > 0 ? ((template.aceitas / template.total) * 100) : 0
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  };

  const templateStats = getTemplateStats();
  const maxUsage = Math.max(...templateStats.map(t => t.total), 1);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Análise de Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {templateStats.map((template, index) => (
          <div key={template.nome} className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-900 truncate">
                {template.nome.replace("boas_vindas_empresa - pt_BR", "Boas Vindas")}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">{template.total}</span>
                <span className="text-xs text-slate-500">
                  ({template.taxaSucesso.toFixed(1)}% sucesso)
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(template.total / maxUsage) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
