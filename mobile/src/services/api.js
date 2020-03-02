import axios from 'axios';

// baseURL: 'http://192.168.1.10:3333'

const api = axios.create({
  baseURL: 'http://192.168.1.109:3333'
});

export default api;