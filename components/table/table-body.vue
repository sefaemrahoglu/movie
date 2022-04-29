<template>
  <tr>
    <td>
      <v-img
        class="poster-thumbnail"
        :lazy-src="require('@/assets/temporary/poster-thumb.jpg')"
        height="67"
        width="45"
        :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
        @click="$router.push('/movie/' + movie.id)"
      ></v-img>
    </td>
    <td>
      <nuxt-link :to="'/movie/' + movie.id" class="title-link">
        {{ movie.title }}
        ({{ movie.release_date.slice(0, 4) }})
      </nuxt-link>
    </td>
    <td class="text-center">
      <v-icon color="#FFD700"> mdi-star </v-icon>
      <span style="margin-left: 5px">{{ movie.vote_average.toFixed(1) }}</span>
    </td>
    <td class="text-center">
      <v-menu
        v-model="showRating"
        :close-on-content-click="false"
        offset-y
        bottom
        origin="center center"
        transition="scale-transition"
      >
        <template #activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">
            mdi-star{{ rating > 0 ? '' : '-outline' }}
          </v-icon>
        </template>

        <v-card class="rating-card">
          <v-rating
            v-model="rating"
            color="#FFD700"
            length="10"
            dense
            hover
            size="18"
            style="margin: 0 5px"
          ></v-rating>

          <v-icon size="18" @click="showRating = false">
            mdi-close-circle
          </v-icon>
        </v-card>
      </v-menu>
    </td>
    <td>
      <v-icon large :color="inWatchlist ? 'green' : ''">
        mdi-{{ inWatchlist ? 'bookmark-check' : 'bookmark-plus' }}
      </v-icon>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    movie: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      showRating: false,
      rating: 6,
      inWatchlist: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.rating-card {
  display: flex;
  align-items: center;
  padding: 5px;

  .v-icon:hover {
    color:#F32013
  }
}
</style>