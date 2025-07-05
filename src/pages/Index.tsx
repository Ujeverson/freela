import { KPIGrid } from "@/components/dashboard/KPIGrid";
import { ConversionChart } from "@/components/dashboard/ConversionChart";
import { FilterableTable } from "@/components/dashboard/FilterableTable";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDaysIcon, BarChart3Icon, TrendingUpIcon } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useState } from "react";

function DashboardContent() {
  const { kpis, conversionData, dailyData, corretorData } = useDashboardData();
  const [period, setPeriod] = useState("7");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header/topbar */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 pt-8 pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">Dashboard de Vendas</h1>
            <p className="text-slate-600">Acompanhe KPIs e performance da equipe de corretores</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full md:w-auto relative">
              <button
                className="w-full flex justify-center items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 bg-blue-600 text-white shadow"
                style={{ minWidth: 180 }}
                aria-label="Selecionar período"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                {(() => {
                  switch (period) {
                    case "7": return "Últimos 7 dias";
                    case "15": return "Últimos 15 dias";
                    case "30": return "Últimos 30 dias";
                    case "60": return "Últimos 60 dias";
                    case "90": return "Últimos 90 dias";
                    default: return `Últimos ${period} dias`;
                  }
                })()}
                <svg className="ml-2 w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20">
                  {["7","15","30","60","90"].map((d) => (
                    <li key={d} className="bg-white">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-150 ${period===d ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}
                        style={{ background: 'white' }}
                        onClick={() => { setPeriod(d); setDropdownOpen(false); }}
                      >
                        Últimos {d} dias
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 pb-8 space-y-8">
          <DashboardFilters />

          {/* KPIs Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <BarChart3Icon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Indicadores Principais</h2>
            </div>
            <KPIGrid data={kpis} />
          </section>

          {/* Charts Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUpIcon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Análise de Conversão</h2>
            </div>
            <ConversionChart 
              conversionData={conversionData} 
              dailyData={dailyData} 
            />
          </section>

          {/* Performance Table */}
          <section>
            <FilterableTable corretorData={corretorData} />
          </section>

          {/* Summary Cards */}
          <section className="grid gap-4 md:grid-cols-3">
            <Card className="border-chart-primary/20 hover:bg-white transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Templates Mais Usados</CardTitle>
                <CardDescription>Análise dos templates de maior sucesso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">boas_vindas_empresa - pt_BR</span>
                    <span className="text-sm font-semibold text-success">100%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-chart-secondary h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-chart-secondary/20 hover:bg-white transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Horário de Pico</CardTitle>
                <CardDescription>Melhores horários para envio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-secondary">08:00 - 12:00</div>
                  <p className="text-sm text-muted-foreground mt-1">85% das conversões</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-chart-tertiary/20 hover:bg-white transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Meta do Mês</CardTitle>
                <CardDescription>Progresso atual das vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Atual</span>
                    <span className="text-sm font-semibold">847 / 1000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-chart-tertiary to-warning h-2 rounded-full" style={{width: '84.7%'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">84.7% da meta mensal</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}

const Index = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Index;