<template>
  <v-card flat class="page-align">
    <v-toolbar dense flat class="nav-header page-layout" dark>
      <v-btn
        class="nav-button d-flex d-sm-flex d-md-none"
        icon
        @click="$emit('drawerStatus', !drawerStatus)"
      >
        <v-icon> mdi-menu </v-icon>
      </v-btn>
      <nuxt-link to="/" class="d-flex">
        <img :src="logo" alt="" />
      </nuxt-link>

      <v-btn
        class="nav-button d-none d-md-flex"
        text
        @click="$emit('drawerStatus', !drawerStatus)"
      >
        <v-icon> mdi-menu </v-icon>
        <span>Menu</span>
      </v-btn>

      <Search class="d-none d-md-flex" :is-mobile="false" />
      <Search
        v-if="browserWidth < 960 && mobileSearch"
        class="mobile-search"
        :is-mobile="true"
        @mobileSearch="mobileSearch = $event"
      />

      <v-spacer class="d-flex d-sm-flex d-md-none"></v-spacer>
      <v-btn
        icon
        class="d-flex d-sm-flex d-md-none"
        @click="mobileSearch = true"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn class="nav-button d-none d-md-flex" text>
        <v-icon> mdi-bookmark-plus </v-icon>
        <span>Watchlist</span>
        <v-chip class="ma-2 add-list-chip" x-small> 1.8K </v-chip>
      </v-btn>

      <v-menu offset-y transition="slide-y-transition" bottom>
        <template #activator="{ on, attrs, value }">
          <v-btn class="nav-button" text v-bind="attrs" v-on="on">
            <v-icon> mdi-account-circle </v-icon>
            <span class="d-none d-md-flex">User</span>
            <v-icon class="d-none d-md-flex">
              mdi-{{ value ? 'chevron-up' : 'chevron-down' }}
            </v-icon>
          </v-btn>
        </template>
        <v-list class="nav-header__nav-menus">
          <v-list-item v-for="(item, index) in userMenu" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu v-if="false" offset-y transition="slide-y-transition" bottom>
        <template #activator="{ on, attrs, value }">
          <v-btn class="nav-button" text v-bind="attrs" v-on="on">
            <span>{{ selectedLang.toUpperCase() }}</span>
            <v-icon class="d-none d-md-flex">
              mdi-{{ value ? 'chevron-up' : 'chevron-down' }}
            </v-icon>
          </v-btn>
        </template>
        <v-list class="nav-header__nav-menus">
          <v-list-item v-for="(item, index) in languages" :key="index">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon
          >mdi-{{ $vuetify.theme.dark ? 'brightness-6' : 'brightness-4' }}
        </v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import Search from './search.vue';
import browserSizes from '@/mixins/browser-sizes';
const imdb = require('@/assets/temporary/imdb.svg');

export default {
  components: {
    Search,
  },
  mixins: [browserSizes],
  props: {
    drawerStatus: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logo: imdb,

      userMenu: [
        { title: 'Your Activity', path: '' },
        { title: 'Your Watchlist', path: '' },
        { title: 'Your Ratings', path: '' },
        { title: 'Your Lists', path: '' },
        { title: 'Account Settings', path: '' },
        { title: 'Sign Out', path: '' },
      ],
      selectedLang: 'en',
      languages: ['en'],

      mobileSearch: false,
    };
  },
  watch: {
    drawerStatus() {
      if (this.drawerStatus) {
        document.body.classList.add('lock-body-scroll');
      } else {
        document.body.classList.remove('lock-body-scroll');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .nav-header {
    background: $dark-primary !important;
    border-radius: 0 !important;
    color: $dark-fourth !important;
    font-size: 10.5px !important;

    .nav-button {
      font-size: 10.5px !important;
    }

    &__nav-menus {
      padding: 0;
      background: $dark-primary;

      .v-list-item {
        min-height: 36px !important;
        cursor: pointer;

        &:hover {
          background: #ffffff14;
        }

        .v-list-item__title {
          font-size: 12px !important;
          color: $dark-fourth !important;
        }
      }
    }
  }
  .add-list-chip {
    background: $dark-third !important;
    padding: 4.8px;
    color: #000;
    font-size: 10px;
  }
  .nav-menus {
    padding: 0;
    background: $dark-primary;

    .v-list-item {
      min-height: 36px !important;
      cursor: pointer;

      &:hover {
        background: #ffffff14;
      }

      .v-list-item__title {
        font-size: 12px !important;
        color: $dark-fourth !important;
      }
    }
    .search-category-button {
      height: 40px !important;
      padding: 0 8px !important;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 1px solid #ffffff50;
    }
    .list-border {
      border-top: 1px solid #ffffff50;
    }
  }
  .mobile-search {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: $dark-primary;
    z-index: 2;
    margin: 0 !important;

    .v-input {
      margin: 0 !important;
    }
  }
  .v-input__slot {
    padding: 0 12px 0 0 !important;
  }

  .v-input__prepend-inner {
    margin: 0 !important;
    font-size: 16px !important;
  }
  .v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: rotate(0);
  }
  .v-select.v-text-field input {
    padding-left: 10px;
  }
}
</style>
