import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cantina-app-api.herokuapp.com',
});

export default api;
