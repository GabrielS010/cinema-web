import { Ingresso } from '../models/Ingresso.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class VendaIngressosController {
  constructor() {
    carregarNavbar();
    this.form = document.getElementById('form-ingresso');
    this.selectSessao = document.getElementById('select-sessao');
    
    if(this.form) {
      this.carregarSessoes();
      this.verificarSessaoPreSelecionada();
      this.form.addEventListener('submit', (e) => this.vender(e));
    }
  }

  carregarSessoes() {
    const sessoes = StorageService.buscar('sessoes');
    const filmes = StorageService.buscar('filmes');

    sessoes.forEach(sessao => {
      const filme = filmes.find(f => f.id === sessao.filmeId);
      const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR');
      this.selectSessao.innerHTML += `<option value="${sessao.id}">${filme ? filme.titulo : 'Filme'} | ${dataFormatada}</option>`;
    });
  }

  verificarSessaoPreSelecionada() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessaoIdParam = urlParams.get('sessaoId');
    if (sessaoIdParam) this.selectSessao.value = sessaoIdParam;
  }

  vender(e) {
    e.preventDefault();
    const sessaoId = this.selectSessao.value;
    const nomeCliente = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpf').value;
    const assento = document.getElementById('assento').value;
    const tipoPagamento = document.getElementById('tipoPagamento').value;

    const novoIngresso = new Ingresso(sessaoId, nomeCliente, cpf, assento, tipoPagamento);
    StorageService.salvar('ingressos', novoIngresso);
    alert('Ingresso vendido!');
    window.location.href = 'sessoes.html';
  }
}
new VendaIngressosController();