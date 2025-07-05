import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FilterIcon, XIcon } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { useDashboardData } from "@/hooks/useDashboardData";

export function DashboardFilters() {
  const { filters, updateFilter, clearFilters } = useDashboard();
  const { availableFilters } = useDashboardData();

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className="p-4 bg-white border border-slate-200 shadow-lg rounded-xl flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <FilterIcon className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-semibold text-slate-700">Filtros:</span>
      </div>

      <Select value={filters.template || "all"} onValueChange={(value) => updateFilter('template', value === 'all' ? undefined : value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecionar Template" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Templates</SelectItem>
          {availableFilters.templates.map((template) => (
            <SelectItem key={template} value={template}>{template}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.corretor || "all"} onValueChange={(value) => updateFilter('corretor', value === 'all' ? undefined : value)}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Selecionar Corretor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Corretores</SelectItem>
          {availableFilters.corretores.map((corretor) => (
            <SelectItem key={corretor} value={corretor}>{corretor}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.dia || "all"} onValueChange={(value) => updateFilter('dia', value === 'all' ? undefined : value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecionar Dia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Dias</SelectItem>
          {availableFilters.dias.map((dia) => (
            <SelectItem key={dia} value={dia}>
              {new Date(dia).toLocaleDateString('pt-BR')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="ml-auto"
        >
          <XIcon className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 ml-4">
          {filters.template && (
            <Badge variant="secondary" className="gap-1">
              Template: {filters.template}
              <XIcon 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('template', undefined)}
              />
            </Badge>
          )}
          {filters.corretor && (
            <Badge variant="secondary" className="gap-1">
              Corretor: {filters.corretor}
              <XIcon 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('corretor', undefined)}
              />
            </Badge>
          )}
          {filters.dia && (
            <Badge variant="secondary" className="gap-1">
              Dia: {new Date(filters.dia).toLocaleDateString('pt-BR')}
              <XIcon 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('dia', undefined)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}