import axios from 'axios';

export const githubClient = axios.create({ baseURL: 'https://api.github.com' });
