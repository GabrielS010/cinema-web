import { StorageService } from '../services/StorageService.js';
import { carregarNavbar } from '../components/navbar.js';

class SessoesController {
  constructor() {
    carregarNavbar();
    this.container = document.getElementById('container-sessoes');
    if(this.container) this.renderizarSessoes();
  }

  renderizarSessoes() {
    const sessoes = StorageService.buscar('sessoes');
    const filmes = StorageService.buscar('filmes');
    const salas = StorageService.buscar('salas');

    if (sessoes.length === 0) {
      this.container.innerHTML = '<p class="text-center w-100">Nenhuma sessão disponível.</p>';
      return;
    }

    this.container.innerHTML = sessoes.map(sessao => {
      const filme = filmes.find(f => f.id === sessao.filmeId);
      const sala = salas.find(s => s.id === sessao.salaId);

      return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <img src="${filme ? filme.imagem : ''}" class="card-img-top img-fluid" style="height: 350px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${filme ? filme.titulo : 'Desconhecido'}</h5>
              <p class="card-text text-muted mb-1"><strong>Sala:</strong> ${sala ? sala.nome : 'N/A'}</p>
              <p class="card-text text-muted mb-1"><strong>Hora:</strong> ${new Date(sessao.dataHora).toLocaleString('pt-BR')}</p>
              <p class="card-text text-primary fw-bold mt-auto">R$ ${Number(sessao.preco).toFixed(2)}</p>
              <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-primary w-100">Comprar</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}
new SessoesController();