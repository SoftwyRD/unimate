import axios from 'axios';
import { API_BASE_URL } from './config';

export const getEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/events`);
  return response.data;
};