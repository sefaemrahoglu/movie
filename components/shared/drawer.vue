<template>
  <div class="nav-drawer">
    <div class="nav-drawer__full d-none d-md-block">
      <div class="d-flex align-center justify-space-between">
        <img :src="logo" alt="Logo" style="width: 90px; height: 56px" />
        <v-btn
          class="close-icon"
          icon
          large
          elevation="24"
          @click="closeDrawer"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-row>
        <v-col
          v-for="(menu, menuIndex) in menus"
          :key="menuIndex"
          md="4"
          class="nav-drawer__full__menus"
        >
          <h4 class="d-flex">
            <v-icon color="white">{{ menu.icon }}</v-icon>
            <span class="nav-drawer__full__menus__title">{{ menu.title }}</span>
          </h4>
          <p v-for="(menuItem, itemIndex) in menu.items" :key="itemIndex">
            <nuxt-link :to="menuItem.path">
              {{ menuItem.title }}
            </nuxt-link>
          </p>
        </v-col>
      </v-row>
    </div>
    <v-navigation-drawer
      v-if="browserWidth < 960"
      v-model="drawer"
      v-click-outside="closeDrawer"
      absolute
      permanent
      class="d-flex d-sm-flex d-md-none"
    >
      <v-list>
        <v-list-item>
          <div class="drawer-header">
            <img :src="logo" alt="Logo" />
            <v-btn icon @click="closeDrawer">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-list-item>
        <v-list-group
          v-for="menu in menus"
          :key="menu.title"
          v-model="menu.active"
          :prepend-icon="menu.icon"
          no-action
          color="#ff5722"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title v-text="menu.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in menu.items" :key="child.title" link>
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import browserSizes from '@/mixins/browser-sizes';
const imdb = require('@/assets/temporary/imdb.svg');

export default {
  mixins: [browserSizes],
  props: {
    drawerStatus: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logo: imdb,
      menus: [
        {
          title: 'Movies',
          icon: 'mdi-filmstrip',
          items: [
            { path: '', title: 'Top 250 Movies' },
            { path: '/movie/most-popular-movies', title: 'Most Popular Movies' },
            { path: '', title: 'Browse Movies by Genre' },
            { path: '', title: 'Top Box Office' },
            { path: '', title: 'In Theaters' },
            { path: '', title: 'Coming Soon' },
            { path: '', title: 'Release Calendar' },
            { path: '', title: 'Movie News' },
            { path: '', title: 'New Trailers' },
            { path: '', title: 'Polls' },
          ],
        },
        {
          title: 'TV Shows',
          icon: 'mdi-television',
          items: [
            { path: '', title: 'Top 250 TV Shows' },
            { path: '', title: 'Most Popular TV Shows' },
            { path: '', title: 'Browse TV Shows by Genre' },
            { path: '', title: 'TV News' },
            { path: '', title: 'New Trailers' },
            { path: '', title: 'Polls' },
          ],
        },
        {
          title: 'Awards & Events',
          icon: 'mdi-star-circle',
          items: [
            { path: '', title: 'Oscars' },
            { path: '', title: 'Best Picture Winners' },
            { path: '', title: 'Emmys' },
            { path: '', title: 'All Events' },
          ],
        },
        {
          title: 'Celebs',
          icon: 'mdi-account-multiple',
          items: [
            { path: '', title: 'Born Today' },
            { path: '', title: 'Most Popular Celebs' },
            { path: '', title: 'Celebrity News' },
          ],
        },
        {
          title: 'What to Watch',
          icon: 'mdi-television-guide',
          items: [
            { path: '', title: 'Suggest Movie' },
            { path: '', title: 'Suggest TV Show' },
          ],
        },
      ],
      group: null,
      drawer: false,
    };
  },
  watch: {
    group() {
      this.$emit('closeDrawer', false);
    },
  },
  created() {
    this.drawer = this.drawerStatus;
  },
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-drawer {
  position: absolute;
  width: 100%;
  height: 100%;

  &__full {
    width: 100%;
    height: 100%;
    padding: 60px;
    overflow: hidden;
    color: $dark-tcolor;
    position: absolute;
    z-index: 5;
    background: $dark-primary;

    .close-icon {
      background: $dark-third !important;
    }
    .row {
      margin: 20px 0;
    }
    &__menus {
      padding: 20px 0px;

      .v-icon {
        color: $dark-third !important;
      }

      &__title {
        margin-left: 5px;
      }

      p {
        margin: 0;
        padding: 6px 12px 6px 30px;
        font-size: 12px;

        a {
          text-decoration: none;
          color: $dark-fourth;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .drawer-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
}
</style>
