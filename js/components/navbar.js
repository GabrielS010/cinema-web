// Função exportada responsável pela injeção da barra de navegação global
export function carregarNavbar() {
  // Procura o elemento container do header
  const header = document.getElementById('header-nav');
  if (!header) return;

  // Injeta a estrutura de layout Bootstrap do menu
  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark border-bottom border-dark" style="background-color: #111;">
      <div class="container">
        <a class="navbar-brand fw-bold text-primary fs-4" href="index.html">
          <i class="bi bi-camera-reels-fill me-2"></i>CineBox
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center gap-3" id="nav-links">
            <li class="nav-item"><a class="nav-link" href="index.html">Início</a></li>
            <li class="nav-item"><a class="nav-link" href="cadastro-filmes.html">Filmes</a></li>
            <li class="nav-item"><a class="nav-link" href="cadastro-salas.html">Salas</a></li>
            <li class="nav-item"><a class="nav-link" href="cadastro-sessoes.html">Sessões</a></li>
            <li class="nav-item"><a class="nav-link" href="venda-ingressos.html">Caixa</a></li>
            <li class="nav-item">
              <a class="btn btn-primary fw-bold rounded-1 px-4" href="sessoes.html">
                <i class="bi bi-ticket-perforated me-2"></i>Ver Sessões
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Descobre qual página está aberta no navegador no momento
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('#nav-links .nav-link');
  
  // Compara o atributo href de cada link com a URL atual e adiciona as classes de destaque ativo
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active', 'fw-bold', 'text-primary'); 
    }
  });

  // Carregamento dinâmico do Script do Bootstrap caso ele ainda não exista no escopo global do documento
  if (typeof bootstrap === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);
  }
}