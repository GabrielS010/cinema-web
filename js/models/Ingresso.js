export class Ingresso {
  constructor(sessaoId, nomeCliente, cpf, assento, tipoPagamento) {
    this.id = Date.now().toString();
    this.sessaoId = sessaoId;
    this.nomeCliente = nomeCliente;
    this.cpf = cpf;
    this.assento = assento;
    this.tipoPagamento = tipoPagamento;
  }
}