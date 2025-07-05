export interface Lead {
  corretor_envio: string;
  created_at: string;
  data_envio: string | null;
  data_retorno: string | null;
  finalizado_atendimento: string;
  nome_cliente: string;
  numero: string;
  responsavel: string;
  retorno: string | null;
  status: string;
  status_envio: string;
  template: string;
  tipo_transbordo: string;
}

export interface KPI {
  title: string;
  value: string | number;
  percentage?: number;
  trend?: 'up' | 'down';
  icon?: string;
}

export interface ChartData {
  name: string;
  value: number;
  percentage?: number;
}