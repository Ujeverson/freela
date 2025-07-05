import { useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';

// Mock data baseado nos dados reais fornecidos
const mockLeadsData = [
  { corretor: "RONALDO TOSTES GUERRA", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "Michelle Darc Oliveira", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "LEADER CORRETORA MARCO TÚLIO CASTRO SILVA", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "SAUDE MAIS CONSULTORIA EM SEGUROS E BENEFICIOS", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "JANAINA MELO GARCIA PRATA", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "Vilma Carlos de Oliveira", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "NAILA FERREIRA DE OLIVEIRA", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "Via Saúde Corretora", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "JOCROSS BUSINESS", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  { corretor: "Blessed Corretora", status: "accepted", data_envio: "2025-06-28", template: "boas_vindas_empresa" },
  // Adicionando alguns dados com outros status para demonstrar
  { corretor: "RONALDO TOSTES GUERRA", status: "pending", data_envio: "2025-06-27", template: "boas_vindas_empresa" },
  { corretor: "Michelle Darc Oliveira", status: "rejected", data_envio: "2025-06-27", template: "boas_vindas_empresa" },
  { corretor: "Vilma Carlos de Oliveira", status: "pending", data_envio: "2025-06-26", template: "boas_vindas_empresa" },
];

export function useDashboardData() {
  const { filters } = useDashboard();
  
  const data = useMemo(() => {
    // Aplicar filtros aos dados
    let filteredData = mockLeadsData;
    
    if (filters.template) {
      filteredData = filteredData.filter(lead => lead.template === filters.template);
    }
    if (filters.corretor) {
      filteredData = filteredData.filter(lead => lead.corretor === filters.corretor);
    }
    if (filters.dia) {
      filteredData = filteredData.filter(lead => lead.data_envio === filters.dia);
    }

    const totalLeads = filteredData.length;
    const acceptedLeads = filteredData.filter(lead => lead.status === 'accepted').length;
    const conversionRate = totalLeads > 0 ? (acceptedLeads / totalLeads) * 100 : 0;
    
    // Dados dos corretores
    const corretorStats = filteredData.reduce((acc, lead) => {
      if (!acc[lead.corretor]) {
        acc[lead.corretor] = { total: 0, accepted: 0 };
      }
      acc[lead.corretor].total++;
      if (lead.status === 'accepted') {
        acc[lead.corretor].accepted++;
      }
      return acc;
    }, {} as Record<string, { total: number; accepted: number }>);

    const corretorData = Object.entries(corretorStats)
      .map(([name, stats]) => ({
        name,
        totalLeads: stats.total,
        acceptedLeads: stats.accepted,
        conversionRate: stats.total > 0 ? (stats.accepted / stats.total) * 100 : 0,
        trend: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down',
        avgResponseTime: `${Math.floor(Math.random() * 12 + 1)}h`,
      }))
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 10);

    // Dados de conversão para o gráfico
    const statusCounts = filteredData.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const conversionData = [
      { name: 'Aceitos', value: statusCounts.accepted || 0, color: 'hsl(var(--chart-primary))' },
      { name: 'Pendentes', value: statusCounts.pending || 0, color: 'hsl(var(--chart-secondary))' },
      { name: 'Rejeitados', value: statusCounts.rejected || 0, color: 'hsl(var(--destructive))' },
    ];

    // Dados diários baseados nos dados filtrados
    const dailyStats = filteredData.reduce((acc, lead) => {
      const date = lead.data_envio;
      if (!acc[date]) {
        acc[date] = { leads: 0, accepted: 0 };
      }
      acc[date].leads++;
      if (lead.status === 'accepted') {
        acc[date].accepted++;
      }
      return acc;
    }, {} as Record<string, { leads: number; accepted: number }>);

    const dailyData = Object.entries(dailyStats)
      .map(([date, stats]) => ({
        date,
        leads: stats.leads,
        accepted: stats.accepted,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Dados para filtros disponíveis
    const availableFilters = {
      templates: [...new Set(mockLeadsData.map(lead => lead.template))],
      corretores: [...new Set(mockLeadsData.map(lead => lead.corretor))].sort(),
      dias: [...new Set(mockLeadsData.map(lead => lead.data_envio))].sort(),
    };

    const uniqueCorretores = new Set(filteredData.map(lead => lead.corretor)).size;

    return {
      kpis: {
        totalLeads,
        conversionRate,
        avgResponseTime: '8h',
        acceptedLeads,
        totalCorretores: uniqueCorretores,
      },
      conversionData,
      dailyData,
      corretorData,
      availableFilters,
    };
  }, [filters]);

  return data;
}