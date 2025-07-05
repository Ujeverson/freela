import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  percentage?: number;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  percentage, 
  trend, 
  icon, 
  className 
}: MetricCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-secondary/5" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold text-foreground">
          {value}
        </div>
        {percentage !== undefined && (
          <div className="flex items-center text-xs mt-1">
            {trend === 'up' ? (
              <ArrowUpIcon className="h-3 w-3 text-success mr-1" />
            ) : trend === 'down' ? (
              <ArrowDownIcon className="h-3 w-3 text-destructive mr-1" />
            ) : null}
            <span className={cn(
              "font-medium",
              trend === 'up' && "text-success",
              trend === 'down' && "text-destructive",
              !trend && "text-muted-foreground"
            )}>
              {percentage > 0 ? '+' : ''}{percentage}%
            </span>
            <span className="text-muted-foreground ml-1">vs período anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}