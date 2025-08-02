import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemonList = async () => {
  const response = await apiClient.get('pokemon?limit=151');
  const promises = response.data.results.map(p => axios.get(p.url));
  const results = await Promise.all(promises);
  return results.map(r => r.data);
};

export const getPokemonDetail = async (name) => {
  const response = await apiClient.get(`pokemon/${name}`);
  return response.data;
};
