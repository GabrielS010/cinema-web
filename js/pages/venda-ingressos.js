import { Ingresso } from '../models/Ingresso.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class VendaIngressosController {
  constructor() {
    carregarNavbar();
    this.form = document.getElementById('form-ingresso');
    this.selectSessao = document.getElementById('select-sessao');
    this.mapaContainer = document.getElementById('mapa-assentos');
    this.inputAssento = document.getElementById('assento');
    this.spanEscolhido = document.getElementById('assento-escolhido');
    
    if (this.form) {
      this.carregarSessoes();
      this.verificarSessaoPreSelecionada();
      this.selectSessao.addEventListener('change', () => this.renderizarMapa());
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

    if (sessoes.length > 0 && !this.selectSessao.value) {
      this.selectSessao.value = sessoes[0].id;
      this.renderizarMapa();
    }
  }

  verificarSessaoPreSelecionada() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessaoIdParam = urlParams.get('sessaoId');
    if (sessaoIdParam) {
      this.selectSessao.value = sessaoIdParam;
      this.renderizarMapa();
    }
  }

  renderizarMapa() {
    const sessaoId = this.selectSessao.value;
    this.mapaContainer.innerHTML = '';
    this.inputAssento.value = '';
    this.spanEscolhido.textContent = 'Nenhum';

    if (!sessaoId) return;

    const sessoes = StorageService.buscar('sessoes');
    const salas = StorageService.buscar('salas');
    const sessao = sessoes.find(s => s.id === sessaoId);
    const sala = salas.find(s => s.id === sessao?.salaId);

    const capacidadeTotal = sala ? Number(sala.capacidade) : 30;

    const ingressos = StorageService.buscar('ingressos');
    const assentosOcupados = ingressos
      .filter(i => i.sessaoId === sessaoId)
      .map(i => i.assento);

    const assentosPorLinha = 10;
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 1; i <= capacidadeTotal; i++) {
      const indiceLinha = Math.floor((i - 1) / assentosPorLinha);
      const letra = letras[indiceLinha] || 'X';
      const numero = ((i - 1) % assentosPorLinha) + 1;
      const codigoAssento = `${letra}${numero}`;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seat';
      btn.textContent = codigoAssento;

      if (assentosOcupados.includes(codigoAssento)) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
          btn.classList.add('selected');
          this.inputAssento.value = codigoAssento;
          this.spanEscolhido.textContent = codigoAssento;
        });
      }

      this.mapaContainer.appendChild(btn);
    }
  }

  vender(e) {
    e.preventDefault();
    const sessaoId = this.selectSessao.value;
    const nomeCliente = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpf').value;
    const assento = this.inputAssento.value;
    const tipoPagamento = document.getElementById('tipoPagamento').value;

    if (!assento) {
      alert('Selecione um assento no mapa.');
      return;
    }

    const novoIngresso = new Ingresso(sessaoId, nomeCliente, cpf, assento, tipoPagamento);
    StorageService.salvar('ingressos', novoIngresso);
    alert('Ingresso vendido.');
    window.location.href = 'sessoes.html';
  }
}

new VendaIngressosController();