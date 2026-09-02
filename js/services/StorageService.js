export class StorageService {
  static buscar(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
  }

  static salvar(chave, objeto) {
    try {
      const lista = this.buscar(chave);
      lista.push(objeto);
      localStorage.setItem(chave, JSON.stringify(lista));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert('Limite de armazenamento atingido!');
      }
    }
  }
}