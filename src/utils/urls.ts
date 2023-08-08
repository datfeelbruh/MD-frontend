export const BASE_URL = `/api`;

export const MOVIES_URL = {
  SEARCH: `${BASE_URL}/movie`,
  BY_ID: (id: number) => `${BASE_URL}/movie/${id}`,
  USER_MOVIES: (id: number) => `${BASE_URL}/movie/user/${id}`,
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
  CHANGE_ABOUT: (id: number) => `${BASE_URL}/users/${id}`,
  UPLOAD_AVATAR: `${BASE_URL}/users/avatar`,
};

export const REVIEW_URL = {
  UPDATE: (id: number) => `${BASE_URL}/reviews/${id}`,
  DELETE: (id: number) => `${BASE_URL}/reviews/${id}`,
  SEARCH: `${BASE_URL}/reviews`,
  CREATE: `${BASE_URL}/reviews`,
};

export const RESET_PASSWORD_URL = {
  SEND_MAIL: (email: string) => `${BASE_URL}/forgotPassword/reset?email=${email}`,
  RESET: (token: string) => `${BASE_URL}/forgotPassword/reset?token=${token}`,
};
