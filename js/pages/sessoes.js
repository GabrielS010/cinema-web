import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class SessoesController {
  constructor() {
    carregarNavbar();
    // Elemento HTML que receberá a renderização dos cards
    this.container = document.getElementById('container-sessoes');
    if (this.container) this.renderizarSessoes();
  }

  renderizarSessoes() {
    // Carrega todas as coleções do LocalStorage para cruzamento de dados
    const sessoes = StorageService.buscar('sessoes');
    const filmes = StorageService.buscar('filmes');
    const salas = StorageService.buscar('salas');
    const ingressos = StorageService.buscar('ingressos');

    // Estado de Fallback: Caso não haja sessões, exibe uma mensagem informativa
    if (sessoes.length === 0) {
      this.container.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-ticket-detailed fs-1 text-secondary mb-3 d-block"></i>
          <p class="fs-5 text-secondary">Nenhuma sessão disponível no momento.</p>
        </div>
      `;
      return;
    }

    // Mapeamento e renderização dinâmica dos cards
    this.container.innerHTML = sessoes.map(sessao => {
      // Faz o cruzamento (JOIN em memória) dos dados da sessão com seu filme e sua sala correspondentes
      const filme = filmes.find(f => f.id === sessao.filmeId);
      const sala = salas.find(s => s.id === sessao.salaId);
      
      // Cálculo de Vagas Disponíveis: Capacidade da Sala (-) Ingressos já comprados para esta sessão
      const capacidadeTotal = sala ? sala.capacidade : 32;
      const ingressosVendidos = ingressos.filter(i => i.sessaoId === sessao.id).length;
      const vagasRestantes = Math.max(0, capacidadeTotal - ingressosVendidos);

      // Retorna a estrutura HTML com os dados formatados usando Template Literals
      return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card card-custom h-100">
            <img src="${filme ? filme.imagem : ''}" class="card-img-top movie-poster" alt="${filme ? filme.titulo : 'Filme'}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold text-light">${filme ? filme.titulo : 'Desconhecido'}</h5>
              <p class="card-text text-secondary mb-1"><i class="bi bi-door-open me-1"></i> ${sala ? sala.nome : 'N/A'}</p>
              <p class="card-text text-secondary mb-1"><i class="bi bi-clock me-1"></i> ${new Date(sessao.dataHora).toLocaleString('pt-BR')}</p>
              <p class="card-text text-info small mb-2"><i class="bi bi-people me-1"></i> Vagas restantes: <strong>${vagasRestantes}</strong></p>
              <p class="card-text text-primary fw-bold fs-5 mt-auto mb-3">R$ ${Number(sessao.preco).toFixed(2)}</p>
              <!-- Botão envia o ID da sessão selecionada na URL como parâmetro Query String -->
              <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-primary w-100 fw-bold">
                <i class="bi bi-cart-plus me-1"></i>Comprar
              </a>
            </div>
          </div>
        </div>
      `;
    }).join(''); // Agrupa o array de strings em uma única string HTML
  }
}

new SessoesController();