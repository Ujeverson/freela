import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

interface CorretorPerformance {
  name: string;
  totalLeads: number;
  acceptedLeads: number;
  conversionRate: number;
  trend: 'up' | 'down';
  avgResponseTime: string;
}

interface PerformanceTableProps {
  corretorData: CorretorPerformance[];
}

export function PerformanceTable({ corretorData }: PerformanceTableProps) {
  return (
    <Card className="border-chart-tertiary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Performance por Corretor</CardTitle>
        <CardDescription>Ranking dos top corretores por conversão</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Corretor</TableHead>
              <TableHead className="text-center">Total Leads</TableHead>
              <TableHead className="text-center">Aceitos</TableHead>
              <TableHead className="text-center">Taxa Conversão</TableHead>
              <TableHead className="text-center">Tendência</TableHead>
              <TableHead className="text-center">Tempo Resposta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {corretorData.map((corretor, index) => (
              <TableRow key={corretor.name} className="hover:bg-muted/50">
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}