import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { TrendingUpIcon, TrendingDownIcon, SearchIcon } from "lucide-react";

interface CorretorPerformance {
  name: string;
  totalLeads: number;
  acceptedLeads: number;
  conversionRate: number;
  trend: 'up' | 'down';
  avgResponseTime: string;
}

interface FilterableTableProps {
  corretorData: CorretorPerformance[];
}

export function FilterableTable({ corretorData }: FilterableTableProps) {
  const [filters, setFilters] = useState({
    name: '',
    totalLeads: '',
    acceptedLeads: '',
    conversionRate: '',
    avgResponseTime: ''
  });

  const filteredData = useMemo(() => {
    return corretorData.filter(corretor => {
      return (
        corretor.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.totalLeads === '' || corretor.totalLeads.toString().includes(filters.totalLeads)) &&
        (filters.acceptedLeads === '' || corretor.acceptedLeads.toString().includes(filters.acceptedLeads)) &&
        (filters.conversionRate === '' || corretor.conversionRate.toString().includes(filters.conversionRate)) &&
        (filters.avgResponseTime === '' || corretor.avgResponseTime.toLowerCase().includes(filters.avgResponseTime.toLowerCase()))
      );
    });
  }, [corretorData, filters]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:bg-white transition-colors">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 font-semibold flex items-center gap-2">Performance por Corretor</CardTitle>
        <CardDescription className="text-slate-600">Ranking dos top corretores por conversão</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="font-semibold text-slate-700">
                  <div className="space-y-2">
                    <span>Corretor</span>
                    <div className="relative">
                      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Filtrar corretor..."
                        value={filters.name}
                        onChange={(e) => updateFilter('name', e.target.value)}
                        className="pl-8 h-8"
                      />
                    </div>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-700">
                  <div className="space-y-2">
                    <span>Total Leads</span>
                    <Input
                      placeholder="Filtrar..."
                      value={filters.totalLeads}
                      onChange={(e) => updateFilter('totalLeads', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-700">
                  <div className="space-y-2">
                    <span>Aceitos</span>
                    <Input
                      placeholder="Filtrar..."
                      value={filters.acceptedLeads}
                      onChange={(e) => updateFilter('acceptedLeads', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-700">
                  <div className="space-y-2">
                    <span>Taxa Conversão</span>
                    <Input
                      placeholder="Filtrar..."
                      value={filters.conversionRate}
                      onChange={(e) => updateFilter('conversionRate', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-700">Tendência</TableHead>
                <TableHead className="text-center font-semibold text-slate-700">
                  <div className="space-y-2">
                    <span>Tempo Resposta</span>
                    <Input
                      placeholder="Filtrar..."
                      value={filters.avgResponseTime}
                      onChange={(e) => updateFilter('avgResponseTime', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((corretor, index) => (
                <TableRow key={corretor.name} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-chart-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="truncate max-w-[200px]" title={corretor.name}>
                        {corretor.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{corretor.totalLeads}</TableCell>
                  <TableCell className="text-center">{corretor.acceptedLeads}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={corretor.conversionRate >= 90 ? "default" : corretor.conversionRate >= 70 ? "secondary" : "outline"}
                      className="bg-gradient-to-r from-success to-chart-primary text-success-foreground"
                    >
                      {corretor.conversionRate.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {corretor.trend === 'up' ? (
                      <TrendingUpIcon className="h-4 w-4 text-success mx-auto" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 text-destructive mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {corretor.avgResponseTime}
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Nenhum corretor encontrado com os filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}