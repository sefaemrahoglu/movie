<template>
  <v-row>
    <v-col md="8">
      <h1>Most Popular Movies</h1>
      <h6>As determined by Cinearth Users</h6>
      <Table :movies="movies" />
    </v-col>
    <v-col md="4"> ss </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { getPopularMovies } from '@/services/movies.js';
import Table from '@/components/table/table.vue';

export default {
  components: { Table },
  async asyncData({ store }) {
    const data = await getPopularMovies();
    data.sort(function (a, b) {
      if (a.popularity > b.popularity) return -1;
      if (a.popularity < b.popularity) return 1;
      return 0;
    });

    store.commit('movies/setPopularMovies', data);
  },
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    ...mapGetters({ getPopularMovies: 'movies/getPopularMovies' }),
  },
  created() {
    this.movies = this.getPopularMovies.map((movie) => ({
      ...movie,
      showRating: false,
    }));
  },
};
</script>


<style lang="scss" scoped>


</style>