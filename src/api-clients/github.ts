import axios from 'axios';

export const client = axios.create({ baseURL: 'https://api.github.com' });

export const fetchCurrentUser = (token: string) => {
  return client.get('/user', { headers: { Authorization: `token ${token}` } });
};
