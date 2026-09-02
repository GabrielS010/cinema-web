import { Sala } from '../models/Sala.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class CadastroSalasController {
  constructor() {
    carregarNavbar();
    this.form = document.getElementById('form-sala');
    if(this.form) this.form.addEventListener('submit', (e) => this.cadastrar(e));
  }

  cadastrar(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const capacidade = document.getElementById('capacidade').value;
    const tipo = document.getElementById('tipo').value;

    const novaSala = new Sala(nome, capacidade, tipo);
    StorageService.salvar('salas', novaSala);
    alert('Sala cadastrada!');
    this.form.reset();
  }
}
new CadastroSalasController();