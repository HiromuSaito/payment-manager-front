<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title> Stock-Manager </v-app-bar-title>
      <v-btn>
        <v-icon> mdi-home </v-icon>
      </v-btn>
      <template v-slot:prepend>
        <v-app-bar-nav-icon v-on:click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav dense>
        <v-list-item
          title="商品台帳"
          to="/items"
          @click="hideDrawer"
        ></v-list-item>
        <v-list-item
          title="払出記録"
          to="/payouts"
          @click="hideDrawer"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const drawer = ref(false);
const hideDrawer = () => {
  drawer.value = false;
};
</script>
