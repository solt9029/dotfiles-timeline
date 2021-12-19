import axios from 'axios';
import rateLimit from 'axios-rate-limit';

export const client = rateLimit(axios.create({ baseURL: 'https://api.github.com' }), {
  maxRequests: 1,
  perMilliseconds: 1000,
});

export const fetchCurrentUser = (token: string) => {
  return client.get('/user', { headers: { Authorization: `token ${token}` } });
};
