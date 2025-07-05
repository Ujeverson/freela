import React, { useState, useEffect } from "react";
import { Mensagem } from "@/entities/Mensagem";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Search,
  Filter,
  Download,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Mensagens() {
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [corretorFilter, setCorretorFilter] = useState("all");

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

  const filteredMensagens = mensagens.filter((msg) => {
    const matchesSearch =
      !searchTerm ||
      msg.nome_cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.corretor_envio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.numero?.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
    const matchesCorretor =
      corretorFilter === "all" || msg.corretor_envio === corretorFilter;

    return matchesSearch && matchesStatus && matchesCorretor;
  });

  const corretores = [...new Set(mensagens.map((m) => m.corretor_envio))].sort();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const exportData = () => {
    const csvContent = [
      [
        "Corretor",
        "Cliente",
        "Número",
        "Status",
        "Data Envio",
        "Data Retorno",
        "Template",
      ].join(","),
      ...filteredMensagens.map((msg) =>
        [
          msg.corretor_envio || "",
          msg.nome_cliente || "",
          msg.numero || "",
          msg.status || "",
          msg.data_envio || "",
          msg.data_retorno || "",
          msg.template || "",
        ]
          .map((field) => `"${field}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "mensagens.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            Mensagens
          </h1>
          <p className="text-slate-600">Explorar todas as mensagens enviadas</p>
        </div>

        <Button
          onClick={exportData}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-slate-900">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar cliente, corretor ou número..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white/80 border-slate-200"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white/80 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Status</option>
              <option value="accepted">Aceitas</option>
              <option value="failed">Falharam</option>
              <option value="pending">Pendentes</option>
            </select>

            <select
              value={corretorFilter}
              onChange={(e) => setCorretorFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white/80 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Corretores</option>
              {corretores.map((corretor) => (
                <option key={corretor} value={corretor}>
                  {corretor}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Filter className="w-4 h-4" />
              <span>{filteredMensagens.length} mensagens encontradas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                  <TableHead className="font-semibold text-slate-700">Corretor</TableHead>
                  <TableHead className="font-semibold text-slate-700">Número</TableHead>
                  <TableHead className="font-semibold text-slate-700">Data Envio</TableHead>
                  <TableHead className="font-semibold text-slate-700">Template</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMensagens.map((msg, index) => (
                  <TableRow key={index} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(msg.status)}
                        <Badge className={`${getStatusColor(msg.status)} border`}>
                          {msg.status || "N/A"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {msg.nome_cliente || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {msg.corretor_envio || "N/A"}
                    </TableCell>
                    <TableCell className="font-mono text-slate-700">
                      {msg.numero || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {msg.data_envio && msg.data_envio !== "null"
                        ? format(parseISO(msg.data_envio), "dd/MM/yyyy HH:mm", { locale: ptBR })
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {msg.template || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
