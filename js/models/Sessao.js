export class Sessao {
  constructor(filmeId, salaId, dataHora, preco, idioma, formato) {
    this.id = Date.now().toString();
    this.filmeId = filmeId;
    this.salaId = salaId;
    this.dataHora = dataHora;
    this.preco = Number(preco);
    this.idioma = idioma;
    this.formato = formato;
  }
}