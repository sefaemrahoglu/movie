<template>
  <v-app dark>
    <Navbar :drawer-status="drawer" @drawerStatus="drawer = $event" />
    <Drawer
      v-if="drawer"
      :drawer-status="drawer"
      @closeDrawer="drawer = $event"
    />
    <v-main class="page-align">
      <v-container class="page-layout">
        <Nuxt />
      </v-container>
    </v-main>
    <div class="page-align">
      <v-footer class="page-layout" absolute app tile>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/shared/navbar.vue';
import Drawer from '@/components/shared/drawer.vue';
export default {
  components: {
    Navbar,
    Drawer,
  },
  data() {
    return {
      drawer: false,
    };
  },
  watch: {
    $route() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
.page-align {
  display: flex;
  justify-content: center;

  .page-layout {
    max-width: 1280px !important;
  }
  .v-footer {
    margin: auto;
  }
}
</style>
