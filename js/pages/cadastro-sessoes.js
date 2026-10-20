import { Sessao } from '../models/Sessao.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class CadastroSessoesController {
  constructor() {
    carregarNavbar();
    // Mapeamento dos elementos DOM interativos
    this.form = document.getElementById('form-sessao');
    this.selectFilme = document.getElementById('select-filme');
    this.selectSala = document.getElementById('select-sala');
    
    if(this.form) {
      // Popula dinamicamente os elementos de Select com os dados gravados no banco/storage
      this.carregarOpcoes();
      this.form.addEventListener('submit', (e) => this.cadastrar(e));
    }
  }

  // Busca filmes e salas cadastradas no LocalStorage e injeta nos elementos <select>
  carregarOpcoes() {
    const filmes = StorageService.buscar('filmes');
    const salas = StorageService.buscar('salas');

    // Percorre a lista de filmes e gera elementos <option> contendo a chave estrangeira (f.id)
    filmes.forEach(f => {
      this.selectFilme.innerHTML += `<option value="${f.id}">${f.titulo}</option>`;
    });
    
    // Percorre a lista de salas e gera elementos <option>
    salas.forEach(s => {
      this.selectSala.innerHTML += `<option value="${s.id}">${s.nome} (${s.tipo})</option>`;
    });
  }

  cadastrar(e) {
    e.preventDefault();
    
    // Extração dos IDs selecionados no formulário (chaves de relacionamento)
    const filmeId = this.selectFilme.value;
    const salaId = this.selectSala.value;
    const dataHora = document.getElementById('dataHora').value;
    const preco = document.getElementById('preco').value;
    
    // Captura dos valores marcados nos grupos de rádio buttons
    const idioma = document.querySelector('input[name="idioma"]:checked').value;
    const formato = document.querySelector('input[name="formato"]:checked').value;

    // Cria a nova sessão vinculando o ID do filme e o ID da sala
    const novaSessao = new Sessao(filmeId, salaId, dataHora, preco, idioma, formato);
    
    // Salva na coleção 'sessoes'
    StorageService.salvar('sessoes', novaSessao);
    alert('✅ Sessão criada com sucesso!');
    this.form.reset();
  }
}

new CadastroSessoesController();