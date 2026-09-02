import { Sessao } from '../models/Sessao.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class CadastroSessoesController {
  constructor() {
    carregarNavbar();
    this.form = document.getElementById('form-sessao');
    this.selectFilme = document.getElementById('select-filme');
    this.selectSala = document.getElementById('select-sala');
    
    if(this.form) {
      this.carregarOpcoes();
      this.form.addEventListener('submit', (e) => this.cadastrar(e));
    }
  }

  carregarOpcoes() {
    const filmes = StorageService.buscar('filmes');
    const salas = StorageService.buscar('salas');

    filmes.forEach(f => {
      this.selectFilme.innerHTML += `<option value="${f.id}">${f.titulo}</option>`;
    });
    salas.forEach(s => {
      this.selectSala.innerHTML += `<option value="${s.id}">${s.nome} (${s.tipo})</option>`;
    });
  }

  cadastrar(e) {
    e.preventDefault();
    const filmeId = this.selectFilme.value;
    const salaId = this.selectSala.value;
    const dataHora = document.getElementById('dataHora').value;
    const preco = document.getElementById('preco').value;
    
    // Pegando valores dos Radio Buttons
    const idioma = document.querySelector('input[name="idioma"]:checked').value;
    const formato = document.querySelector('input[name="formato"]:checked').value;

    const novaSessao = new Sessao(filmeId, salaId, dataHora, preco, idioma, formato);
    StorageService.salvar('sessoes', novaSessao);
    alert('✅ Sessão criada com sucesso!');
    this.form.reset();
  }
}
new CadastroSessoesController();