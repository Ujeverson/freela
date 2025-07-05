import React, { useState, useEffect } from "react";
import { Mensagem } from "@/entities/Mensagem";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Users, MessageSquare, CheckCircle, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CorretorRanking from "@/components/dashboard/CorretorRanking";

export default function Corretores() {
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMensagens();
  }, []);

  const loadMensagens = async () => {
    try {
      const data = await Mensagem.list("-created_date", 1000);
      setMensagens(data);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  type CorretorStats = {
    nome: string;
    totalMensagens: number;
    mensagensAceitas: number;
    mensagensComRetorno: number;
    ultimoEnvio: Date | null;
    templates: Set<string>;
  };

  const getCorretorStats = () => {
    const stats: Record<string, CorretorStats> = {};
    mensagens.forEach(msg => {
      if (!msg.corretor_envio) return;
      if (!stats[msg.corretor_envio]) {
        stats[msg.corretor_envio] = {
          nome: msg.corretor_envio,
          totalMensagens: 0,
          mensagensAceitas: 0,
          mensagensComRetorno: 0,
          ultimoEnvio: null,
          templates: new Set()
        };
      }
      stats[msg.corretor_envio].totalMensagens++;
      if (msg.status === "accepted") {
        stats[msg.corretor_envio].mensagensAceitas++;
      }
      if (msg.data_retorno && msg.data_retorno !== "null") {
        stats[msg.corretor_envio].mensagensComRetorno++;
      }
      if (msg.template) {
        stats[msg.corretor_envio].templates.add(msg.template);
      }
      if (msg.data_envio && msg.data_envio !== "null") {
        try {
          const dataEnvio = parseISO(msg.data_envio);
          if (isValid(dataEnvio)) {
            if (!stats[msg.corretor_envio].ultimoEnvio || dataEnvio > stats[msg.corretor_envio].ultimoEnvio!) {
              stats[msg.corretor_envio].ultimoEnvio = dataEnvio;
            }
          }
        } catch (error) {
          console.error("Erro ao processar data:", error);
        }
      }
    });
    return Object.values(stats)
      .map((corretor: CorretorStats) => ({
        ...corretor,
        taxaSucesso: corretor.totalMensagens > 0 ? 
          ((corretor.mensagensAceitas / corretor.totalMensagens) * 100).toFixed(1) : "0",
        taxaRetorno: corretor.totalMensagens > 0 ? 
          ((corretor.mensagensComRetorno / corretor.totalMensagens) * 100).toFixed(1) : "0",
        templatesUsados: corretor.templates.size
      }))
      .sort((a, b) => b.totalMensagens - a.totalMensagens);
  };

  const corretorStats = getCorretorStats();
  const topCorretor = corretorStats[0];

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Award className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Users className="w-5 h-5 text-slate-400" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 1:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 2:
        return "bg-gradient-to-r from-amber-400 to-amber-600";
      default:
        return "bg-gradient-to-r from-slate-300 to-slate-500";
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Ranking de Corretores
          </h1>
          <p className="text-slate-600">
            Performance individual dos corretores
          </p>
        </div>
      </div>

      {topCorretor && (
        <Card className="rounded-lg border bg-card bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <CardTitle className="font-semibold tracking-tight flex items-center gap-3 text-2xl">
              <Award className="w-8 h-8 text-yellow-300" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{topCorretor.nome}</h3>
                <p className="text-blue-100">Corretor com maior volume</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{topCorretor.totalMensagens}</p>
                <p className="text-blue-100">mensagens enviadas</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{topCorretor.taxaSucesso}%</p>
                <p className="text-sm text-blue-100">Taxa de Sucesso</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{topCorretor.mensagensAceitas}</p>
                <p className="text-sm text-blue-100">Aceitas</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{topCorretor.taxaRetorno}%</p>
                <p className="text-sm text-blue-100">Taxa de Retorno</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{topCorretor.templatesUsados}</p>
                <p className="text-sm text-blue-100">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {corretorStats.map((corretor, index) => (
          <Card key={corretor.nome} className="rounded-lg border text-card-foreground bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankColor(index)}`}>
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{corretor.nome}</h3>
                    <p className="text-slate-600">
                      {index === 0 ? "🏆  Posição #1" : ` Posição #${index + 1}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{corretor.totalMensagens}</p>
                  <p className="text-sm text-slate-500">mensagens totais</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-green-700">{corretor.mensagensAceitas}</span>
                  </div>
                  <p className="text-xs text-green-600">Aceitas</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-lg font-bold text-blue-700">{corretor.taxaSucesso}%</span>
                  </div>
                  <p className="text-xs text-blue-600">Taxa de Sucesso</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span className="text-lg font-bold text-purple-700">{corretor.mensagensComRetorno}</span>
                  </div>
                  <p className="text-xs text-purple-600">Com Retorno</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <span className="text-lg font-bold text-orange-700">{corretor.templatesUsados}</span>
                  <p className="text-xs text-orange-600">Templates Usados</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Taxa de Sucesso</span>
                  <span className="font-medium text-slate-900">{corretor.taxaSucesso}%</span>
                </div>
                <Progress value={parseFloat(corretor.taxaSucesso)} className="h-2" />
              </div>

              {corretor.ultimoEnvio && (
                <div className="mt-4 text-sm text-slate-500">
                  Último envio: {format(corretor.ultimoEnvio, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
