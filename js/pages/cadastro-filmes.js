import { Filme } from '../models/Filme.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class CadastroFilmesController {
  constructor() {
    carregarNavbar();
    this.form = document.getElementById('form-filme');
    if (this.form) this.form.addEventListener('submit', (e) => this.cadastrar(e));
  }

  cadastrar(e) {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const classificacao = document.querySelector('input[name="classificacao"]:checked').value;
    const descricao = document.getElementById('descricao').value;
    const duracao = document.getElementById('duracao').value;
    const dataEstreia = document.getElementById('dataEstreia').value;
    const imagem = document.getElementById('imagem').value;

    const novoFilme = new Filme(titulo, genero, descricao, classificacao, duracao, dataEstreia, imagem);
    
    StorageService.salvar('filmes', novoFilme);
    alert('Filme cadastrado.');
    this.form.reset();
  }
}

new CadastroFilmesController();