export class Sala {
  constructor(nome, capacidade, tipo) {
    this.id = Date.now().toString();
    this.nome = nome;
    this.capacidade = Number(capacidade);
    this.tipo = tipo;
  }
}