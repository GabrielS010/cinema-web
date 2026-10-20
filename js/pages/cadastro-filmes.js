// Importação da classe de modelo Filme para instanciação de objetos padronizados
import { Filme } from '../models/Filme.js';
// Importação da camada de serviço responsável pela persistência no LocalStorage
import { StorageService } from '../services/StorageService.js';
// Importação da função de carregamento da Navbar modularizada
import { carregarNavbar } from '../components/navbar.js';

// Controller responsável por gerenciar a regra de negócio da página de cadastro de filmes
class CadastroFilmesController {
  constructor() {
    // Renderiza a barra de navegação no cabeçalho
    carregarNavbar();
    // Mapeia o formulário HTML através do seu ID
    this.form = document.getElementById('form-filme');
    // Adiciona o ouvinte de evento submit, redirecionando para a função de cadastro se o formulário existir
    if (this.form) this.form.addEventListener('submit', (e) => this.cadastrar(e));
  }

  // Método disparado na submissão do formulário
  cadastrar(e) {
    // Previne o comportamento padrão do navegador de recarregar a página ao enviar o formulário
    e.preventDefault();
    
    // Captura dos valores digitados nos inputs da tela
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    // Captura o valor do Radio Button da classificação indicativa que está marcado (:checked)
    const classificacao = document.querySelector('input[name="classificacao"]:checked').value;
    const descricao = document.getElementById('descricao').value;
    const duracao = document.getElementById('duracao').value;
    const dataEstreia = document.getElementById('dataEstreia').value;
    const imagem = document.getElementById('imagem').value;

    // Instanciação da classe Filme criando um objeto estruturado
    const novoFilme = new Filme(titulo, genero, descricao, classificacao, duracao, dataEstreia, imagem);
    
    // Persistência do objeto criado dentro da chave 'filmes' no LocalStorage usando o StorageService
    StorageService.salvar('filmes', novoFilme);
    
    // Feedback visual ao usuário e limpeza do formulário
    alert('Filme cadastrado.');
    this.form.reset();
  }
}

// Inicializa a execução do Controller assim que o módulo é importado
new CadastroFilmesController();