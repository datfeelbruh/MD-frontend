export const BASE_URL = `/api`;

export const MOVIES_URL = {
  SEARCH: `${BASE_URL}/movie`,
  BY_ID: (id) => `${BASE_URL}/movie/${id}`,
  USER_MOVIES: (id) => `${BASE_URL}/movie/user/${id}`,
  RANDOM_TITLE: `${BASE_URL}/movie/moviesTitles`,
  BY_GENRE: `${BASE_URL}/movie/genre`
};

export const AUTH_URL = {
  LOGIN: `${BASE_URL}/auth/login`,
  REFRESH: `${BASE_URL}/auth/refresh`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

export const USER_URL = {
  REGISTER: `${BASE_URL}/users`,
};

export const REVIEW_URL = {
  UPDATE: (id) => `${BASE_URL}/reviews/${id}`,
  DELETE: (id) => `${BASE_URL}/reviews/${id}`,
  SEARCH: `${BASE_URL}/reviews`,
  CREATE: `${BASE_URL}/reviews`,
};
