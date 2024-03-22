<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        Stock-Manager
      </v-app-bar-title>

      <v-btn>
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>

      <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <v-navigation-drawer permanent>
      Navigation Drawer
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation>
      Button Navigation
    </v-bottom-navigation>

    <v-footer color="primary" app>
      Footer
    </v-footer>
  </v-app>
</template>