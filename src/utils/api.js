import axios from 'axios';

const api = axios.create({
  baseURL: 'https://calendar.softwy.com/',
});
export default api;