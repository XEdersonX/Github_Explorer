import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com', // onde fica pedaco do endereco que vai ser utilizado em todas as requisicoes
});

export default api;
