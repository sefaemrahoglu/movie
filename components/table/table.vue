<template>
  <table class="table-list">
    <thead>
      <tr>
        <th></th>
        <th>Rank & Title</th>
        <th>Rating</th>
        <th>Your Rating</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <TableBody v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </tbody>
  </table>
</template>

<script>
import TableBody from '@/components/table/table-body.vue';
export default {
  components: { TableBody },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-spacing: 0 !important;
}
::v-deep {
  tr {
    border: 10px solid red !important;
  }
  td,
  th {
    text-align: left;
    padding: 4px 0;
  }

  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.05);
  }
  .poster-thumbnail {
  cursor: pointer;
  margin-right: 10px;
}
.title-link {
  text-decoration: none;

  &:hover {
    text-decoration: underline !important;
  }
}
}
</style>