<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    class="mx-4 notranslate"
    hide-no-data
    hide-details
    single-line
    item-text="Description"
    item-value="API"
    placeholder="Search IMDb"
    :append-icon="!isMobile ? 'mdi-magnify' : 'mdi-close'"
    outlined
    dense
    return-object
    @click:append="isMobile ? $emit('mobileSearch', false) : ''"
  >
    <template v-if="!isMobile" #prepend-inner>
      <v-menu offset-y transition="slide-y-transition" bottom>
        <template #activator="{ on, attrs, value }">
          <v-btn
            class="nav-button search-category-button"
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-{{ selectedType.icon }}</v-icon>
            {{ selectedType.title }}
            <v-icon> mdi-{{ value ? 'chevron-up' : 'chevron-down' }} </v-icon>
          </v-btn>
        </template>
        <v-list class="nav-header__nav-menus">
          <v-list-item
            v-for="(item, index) in searchOptions"
            :key="index"
            :class="item.value === 'advanced' ? 'list-border' : ''"
            @click="
              item.value !== 'advanced'
                ? (selectedType = item)
                : $router.push('/search')
            "
          >
            <v-icon>mdi-{{ item.icon }} </v-icon>
            <v-list-item-title class="menu-title">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      searchText: null,
      selectedType: { title: 'All', value: 'all' },
      searchOptions: [
        { icon: 'magnify', title: 'All', value: 'all' },
        { icon: 'filmstrip', title: 'Titles', value: 'titles' },
        { icon: 'television', title: 'Tv Episodes', value: 'tv-episodes' },
        { icon: 'account-multiple', title: 'Celebs', value: 'celebs' },
        { icon: 'file-search', title: 'Advanced Search', value: 'advanced' },
      ],

      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    };
  },
  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || 'n/a',
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    },
  },
  watch: {
    search(val) {
      console.log(val, 'val');
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch('https://api.publicapis.org/entries')
        .then((res) => res.json())
        .then((res) => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.nav-header {
  &__nav-menus {
    padding: 0;
    background: $dark-primary;

    .v-list-item {
      min-height: 36px !important;
      cursor: pointer;
      .v-icon {
        color: $dark-third !important;
        margin-right: 10px;
      }
      &:hover {
        background: #ffffff14;
      }

      .v-list-item__title {
        font-size: 12px !important;
        color: $dark-tcolor !important;
      }
    }
  }
  .search-category-button {
    height: 40px !important;
    padding: 0 8px !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 1px solid #ffffff50;

    .v-icon {
      margin-right: 10px;
    }
  }
  .list-border {
    border-top: 1px solid #ffffff50;
  }
}
</style>
