export function carregarNavbar() {
  const header = document.getElementById('header-nav');
  if (!header) return;

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-lg border-bottom border-warning">
      <div class="container">
        <a class="navbar-brand fw-bold text-warning fs-3" href="index.html">🌟 MovieSTAR</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item"><a class="nav-link" href="index.html">Início</a></li>
            <li class="nav-item"><a class="nav-link" href="cadastro-filmes.html">Filmes</a></li>
            <li class="nav-item"><a class="nav-link" href="cadastro-salas.html">Salas</a></li>
            <li class="nav-item"><a class="nav-link" href="cadastro-sessoes.html">Sessões</a></li>
            <li class="nav-item"><a class="nav-link" href="venda-ingressos.html">Vender Ingresso</a></li>
            <li class="nav-item"><a class="btn btn-warning text-dark fw-bold ms-lg-3 px-4 rounded-pill my-2 my-lg-0" href="sessoes.html">Ver Sessões</a></li>
            <li class="nav-item ms-lg-3">
              <button id="btn-tema" class="btn btn-outline-light rounded-circle p-2" title="Mudar Tema">🌗</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Garante que o script do Bootstrap esteja ativo para abrir o menu
  if (typeof bootstrap === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);
  }

  // Alternador de tema
  const htmlElement = document.documentElement;
  const temaSalvo = localStorage.getItem('tema-moviestar') || 'dark';
  htmlElement.setAttribute('data-bs-theme', temaSalvo);

  const btnTema = document.getElementById('btn-tema');
  if (btnTema) {
    btnTema.addEventListener('click', () => {
      const temaAtual = htmlElement.getAttribute('data-bs-theme');
      const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-bs-theme', novoTema);
      localStorage.setItem('tema-moviestar', novoTema);
    });
  }
}