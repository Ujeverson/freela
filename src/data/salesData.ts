import { Lead } from '../types/dashboard';

export const rawData = `Primeiro Corretor_Envio,created_at,data_envio,data_retorno,Finalizado atendimento,nome_cliente,numero,responsavel,retorno,status,status_envio,template,tipo_transbordo
Reduzir Mensalidade,25/04/2025 16:53:04,null,2025-04-25 21:35:43.549323+00,,,558586308787,,Reduzir Mensalidade,,,,
RONALDO TOSTES GUERRA,22/05/2025 17:58:27,28/06/2025 09:17:08,null,,JOSE ARNOLDO FIUZA LIMA,85991719440,loreto,null,accepted,"Disparado em 28/06/2025, 09:17:08",boas_vindas_empresa - pt_BR,
RONALDO TOSTES GUERRA,27/05/2025 19:42:31,28/06/2025 09:09:52,null,,EVANDRO BASTOS SANTOS FILHO,85988675153,loreto,null,accepted,"Disparado em 28/06/2025, 09:09:52",boas_vindas_empresa - pt_BR,
Michelle Darc Oliveira,28/06/2025 11:33:51,28/06/2025 08:33:49,null,,C A DA C RIBEIRO LTDA,85991481380,loreto,null,accepted,"Disparado em 28/06/2025, 08:33:49",boas_vindas_empresa - pt_BR,
LEADER CORRETORA MARCO TÚLIO CASTRO SILVA,28/06/2025 11:34:01,28/06/2025 08:34:00,null,,FERNANDA MARIA JACO SANTOS,85999934141,loreto,null,accepted,"Disparado em 28/06/2025, 08:34:00",boas_vindas_empresa - pt_BR,
SAUDE MAIS CONSULTORIA EM SEGUROS E BENEFICIOS,28/06/2025 11:36:05,28/06/2025 08:36:04,null,,TVP CONSTRUTORA LTDA,88999054500,loreto,null,accepted,"Disparado em 28/06/2025, 08:36:04",boas_vindas_empresa - pt_BR,
JANAINA MELO GARCIA PRATA,28/06/2025 11:36:15,28/06/2025 08:36:13,null,,DANIEL VERAS MACEDO,85999412906,loreto,null,accepted,"Disparado em 28/06/2025, 08:36:13",boas_vindas_empresa - pt_BR,
Vilma Carlos de Oliveira,28/06/2025 11:36:25,28/06/2025 08:36:23,null,,ERASMO GOMES COUTINHO,85986702476,loreto,null,accepted,"Disparado em 28/06/2025, 08:36:23",boas_vindas_empresa - pt_BR,
Vilma Carlos de Oliveira,28/06/2025 11:36:34,28/06/2025 08:36:33,null,,RC ENGENHARIA SERVICOS DE SEGURANCA E,85988445191,loreto,null,accepted,"Disparado em 28/06/2025, 08:36:33",boas_vindas_empresa - pt_BR,
NAILA FERREIRA DE OLIVEIRA,28/06/2025 11:36:45,28/06/2025 08:36:44,null,,ARTUR S DE CASTRO,88996967531,loreto,null,accepted,"Disparado em 28/06/2025, 08:36:44",boas_vindas_empresa - pt_BR,`;

export function parseCSVData(csvData: string): Lead[] {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const lead: any = {};
    
    headers.forEach((header, index) => {
      const key = header.toLowerCase().replace(/\s+/g, '_');
      lead[key] = values[index] === 'null' || values[index] === '' ? null : values[index];
    });
    
    return lead as Lead;
  });
}

// Sample processed data for demo
export const sampleLeads: Lead[] = [
  {
    corretor_envio: "RONALDO TOSTES GUERRA",
    created_at: "22/05/2025 17:58:27",
    data_envio: "28/06/2025 09:17:08",
    data_retorno: null,
    finalizado_atendimento: "",
    nome_cliente: "JOSE ARNOLDO FIUZA LIMA",
    numero: "85991719440",
    responsavel: "loreto",
    retorno: null,
    status: "accepted",
    status_envio: "Disparado em 28/06/2025, 09:17:08",
    template: "boas_vindas_empresa - pt_BR",
    tipo_transbordo: ""
  }
];