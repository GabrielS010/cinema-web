// Importações das dependências necessárias (Modelo, Serviço e Componente)
import { Sala } from '../models/Sala.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

// Controller responsável pelo gerenciamento da tela de salas
class CadastroSalasController {
  constructor() {
    carregarNavbar();
    this.form = document.getElementById('form-sala');
    // Registra o evento de submit no formulário se ele estiver presente na página
    if(this.form) this.form.addEventListener('submit', (e) => this.cadastrar(e));
  }

  cadastrar(e) {
    // Interrompe o recarregamento nativo do submit
    e.preventDefault();
    
    // Leitura dos campos de entrada
    const nome = document.getElementById('nome').value;
    const capacidade = document.getElementById('capacidade').value;
    const tipo = document.getElementById('tipo').value;

    // Instanciação de um novo objeto Sala com os atributos do formulário
    const novaSala = new Sala(nome, capacidade, tipo);
    
    // Armazenamento sob a coleção 'salas' no LocalStorage
    StorageService.salvar('salas', novaSala);
    
    // Notificação e reset de estado dos campos
    alert('Sala cadastrada!');
    this.form.reset();
  }
}

// Instanciação para execução imediata do módulo
new CadastroSalasController();