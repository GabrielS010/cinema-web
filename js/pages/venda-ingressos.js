import { Ingresso } from '../models/Ingresso.js';
import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class VendaIngressosController {
  constructor() {
    carregarNavbar();
    // Atribuição de referências do DOM
    this.form = document.getElementById('form-ingresso');
    this.selectSessao = document.getElementById('select-sessao');
    this.mapaContainer = document.getElementById('mapa-assentos');
    this.inputAssento = document.getElementById('assento');
    this.spanEscolhido = document.getElementById('assento-escolhido');
    
    if (this.form) {
      this.carregarSessoes();
      // Verifica se houve redirecionamento vindo da tela de sessões com o id na URL
      this.verificarSessaoPreSelecionada();
      // Re-renderiza o mapa visual de assentos sempre que o usuário altera a sessão escolhida
      this.selectSessao.addEventListener('change', () => this.renderizarMapa());
      this.form.addEventListener('submit', (e) => this.vender(e));
    }
  }

  // Popula o select com as sessões disponíveis
  carregarSessoes() {
    const sessoes = StorageService.buscar('sessoes');
    const filmes = StorageService.buscar('filmes');

    sessoes.forEach(sessao => {
      const filme = filmes.find(f => f.id === sessao.filmeId);
      const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR');
      this.selectSessao.innerHTML += `<option value="${sessao.id}">${filme ? filme.titulo : 'Filme'} | ${dataFormatada}</option>`;
    });

    // Se houver sessões e nenhuma estiver selecionada, seleciona a primeira como padrão
    if (sessoes.length > 0 && !this.selectSessao.value) {
      this.selectSessao.value = sessoes[0].id;
      this.renderizarMapa();
    }
  }

  // Leitura de Query Parameters na URL para pré-selecionar a sessão vinda da tela de sessoes.html
  verificarSessaoPreSelecionada() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessaoIdParam = urlParams.get('sessaoId');
    if (sessaoIdParam) {
      this.selectSessao.value = sessaoIdParam;
      this.renderizarMapa();
    }
  }

  // Geração interativa da grade visual de assentos da sala
  renderizarMapa() {
    const sessaoId = this.selectSessao.value;
    // Reseta o estado do container de assentos
    this.mapaContainer.innerHTML = '';
    this.inputAssento.value = '';
    this.spanEscolhido.textContent = 'Nenhum';

    if (!sessaoId) return;

    // Busca das entidades relacionadas
    const sessoes = StorageService.buscar('sessoes');
    const salas = StorageService.buscar('salas');
    const sessao = sessoes.find(s => s.id === sessaoId);
    const sala = salas.find(s => s.id === sessao?.salaId);

    // Obtém a capacidade real da sala cadastrada
    const capacidadeTotal = sala ? Number(sala.capacidade) : 30;

    // Busca quais assentos já foram vendidos para esta sessão específica
    const ingressos = StorageService.buscar('ingressos');
    const assentosOcupados = ingressos
      .filter(i => i.sessaoId === sessaoId)
      .map(i => i.assento);

    const assentosPorLinha = 10;
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Loop que gera botão a botão a matriz de assentos (Ex: A1, A2... B1, B2...)
    for (let i = 1; i <= capacidadeTotal; i++) {
      const indiceLinha = Math.floor((i - 1) / assentosPorLinha);
      const letra = letras[indiceLinha] || 'X';
      const numero = ((i - 1) % assentosPorLinha) + 1;
      const codigoAssento = `${letra}${numero}`;

      // Criação dinâmica do botão do assento no DOM
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seat';
      btn.textContent = codigoAssento;

      // Se o assento já tiver sido comprado, desabilita a interação
      if (assentosOcupados.includes(codigoAssento)) {
        btn.disabled = true;
      } else {
        // Evento de clique para seleção de assento livre
        btn.addEventListener('click', () => {
          // Remove a classe de seleção de todos os outros assentos
          document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
          // Marca o botão atual como selecionado
          btn.classList.add('selected');
          // Grava a poltrona escolhida no input hidden do formulário e atualiza o feedback na tela
          this.inputAssento.value = codigoAssento;
          this.spanEscolhido.textContent = codigoAssento;
        });
      }

      // Insere o botão gerado na div do mapa
      this.mapaContainer.appendChild(btn);
    }
  }

  // Método de processamento da venda do ingresso
  vender(e) {
    e.preventDefault();
    const sessaoId = this.selectSessao.value;
    const nomeCliente = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpf').value;
    const assento = this.inputAssento.value;
    const tipoPagamento = document.getElementById('tipoPagamento').value;

    // Validação de segurança para garantir a escolha do assento
    if (!assento) {
      alert('Selecione um assento no mapa.');
      return;
    }

    // Instanciação e salvamento do ingresso
    const novoIngresso = new Ingresso(sessaoId, nomeCliente, cpf, assento, tipoPagamento);
    StorageService.salvar('ingressos', novoIngresso);
    alert('Ingresso vendido.');
    // Redirecionamento para a tela de sessões
    window.location.href = 'sessoes.html';
  }
}

new VendaIngressosController();