import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class SessoesController {
  constructor() {
    carregarNavbar();
    this.container = document.getElementById('container-sessoes');
    if (this.container) this.renderizarSessoes();
  }

  renderizarSessoes() {
    const sessoes = StorageService.buscar('sessoes');
    const filmes = StorageService.buscar('filmes');
    const salas = StorageService.buscar('salas');

    if (sessoes.length === 0) {
      this.container.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-ticket-detailed fs-1 text-secondary mb-3 d-block"></i>
          <p class="fs-5 text-secondary">Nenhuma sessão disponível no momento.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = sessoes.map(sessao => {
      const filme = filmes.find(f => f.id === sessao.filmeId);
      const sala = salas.find(s => s.id === sessao.salaId);

      return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card card-custom h-100">
            <img src="${filme ? filme.imagem : ''}" class="card-img-top movie-poster" alt="${filme ? filme.titulo : 'Filme'}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold text-light">${filme ? filme.titulo : 'Desconhecido'}</h5>
              <p class="card-text text-secondary mb-1"><i class="bi bi-door-open me-1"></i> ${sala ? sala.nome : 'N/A'}</p>
              <p class="card-text text-secondary mb-1"><i class="bi bi-clock me-1"></i> ${new Date(sessao.dataHora).toLocaleString('pt-BR')}</p>
              <p class="card-text text-primary fw-bold fs-5 mt-auto mb-3">R$ ${Number(sessao.preco).toFixed(2)}</p>
              <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-primary w-100 fw-bold">
                <i class="bi bi-cart-plus me-1"></i>Comprar
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

new SessoesController();