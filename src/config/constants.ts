export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  CHARACTER_SEARCH: (name: string) => `${API_BASE_URL}/api/character/search/${name}`,
  CHARACTER_BY_ID: (id: number) => `${API_BASE_URL}/api/character/id/${id}`,
} as const;
