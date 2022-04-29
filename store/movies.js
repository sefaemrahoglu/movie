// import movies from '@/services/movies.js';
export const state = () => ({
  popularMovies: [],
});
export const getters = {
  getPopularMovies(state) {
    return state.popularMovies;
  },
};
export const mutations = {
  setPopularMovies(state, payload) {
    state.popularMovies = payload;
  },
};
export const actions = {
  async fetchMostPopularMovies({ context }) {},
};
