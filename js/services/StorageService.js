// Classe de serviço contendo métodos estáticos para abstrair o uso da Web Storage API (LocalStorage)
export class StorageService {
  
  // Busca e converte uma coleção em JSON do LocalStorage para Array JavaScript
  static buscar(chave) {
    const dados = localStorage.getItem(chave);
    // Retorna o array parseado ou um array vazio como fallback de segurança
    return dados ? JSON.parse(dados) : [];
  }

  // Adiciona um novo objeto à coleção especificada
  static salvar(chave, objeto) {
    try {
      // Recupera a lista atualizada do storage
      const lista = this.buscar(chave);
      // Adiciona o novo registro
      lista.push(objeto);
      // Serializa a lista novamente para JSON e salva no LocalStorage
      localStorage.setItem(chave, JSON.stringify(lista));
    } catch (e) {
      // Tratamento de exceção para estouro do limite do navegador (geralmente 5MB)
      if (e.name === 'QuotaExceededError') {
        alert('Limite de armazenamento atingido!');
      }
    }
  }
}