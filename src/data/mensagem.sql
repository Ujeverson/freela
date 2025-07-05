-- Banco de dados: Mensagem
-- Tabela para armazenar mensagens enviadas por corretores

CREATE TABLE mensagem (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  corretor_envio TEXT NOT NULL, -- Nome do corretor responsável pelo envio
  data_envio TEXT,              -- Data e hora do envio da mensagem (ISO 8601)
  data_retorno TEXT,            -- Data e hora do retorno (ISO 8601, pode ser nulo)
  finalizado_atendimento BOOLEAN, -- Se o atendimento foi finalizado
  nome_cliente TEXT,            -- Nome do cliente
  numero TEXT NOT NULL,         -- Número de telefone do cliente
  responsavel TEXT,             -- Responsável pelo atendimento
  retorno TEXT,                 -- Conteúdo do retorno
  status TEXT CHECK(status IN ('accepted','failed','pending','delivered')), -- Status da mensagem
  status_envio TEXT,            -- Detalhes do status de envio
  template TEXT,                -- Template utilizado na mensagem
  tipo_transbordo TEXT          -- Tipo de transbordo da mensagem
);
