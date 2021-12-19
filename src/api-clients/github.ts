import axios from 'axios';
import rateLimit from 'axios-rate-limit';

type FetchCurrentUserResponse = {
  data: {
    avatar_url: string;
    login: string;
    twitter_username: string;
    followers: number;
    following: number;
    bio: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type FetchFollowingUsersResponse = {
  data: {
    login: string;
    avatar_url: string;
    [key: string]: unknown;
  }[];
  [key: string]: unknown;
};

export const client = rateLimit(axios.create({ baseURL: 'https://api.github.com' }), {
  maxRequests: 1,
  perMilliseconds: 1000,
});

export const fetchCurrentUser = (token: string): Promise<FetchCurrentUserResponse> => {
  return client.get('/user', { headers: { Authorization: `token ${token}` } });
};

export const fetchFollowingUsers = (login: string, token: string): Promise<FetchFollowingUsersResponse> => {
  return client.get(`/users/${login}/following?per_page=100`, { headers: { Authorization: `token ${token}` } });
};
