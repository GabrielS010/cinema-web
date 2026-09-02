export class Filme {
  constructor(titulo, genero, descricao, classificacao, duracao, dataEstreia, imagem) {
    this.id = Date.now().toString();
    this.titulo = titulo;
    this.genero = genero;
    this.descricao = descricao;
    this.classificacao = classificacao;
    this.duracao = Number(duracao);
    this.dataEstreia = dataEstreia;
    this.imagem = imagem; 
  }
}