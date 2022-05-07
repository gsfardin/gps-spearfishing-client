<template>
  <v-app>
    <v-navigation-drawer app permanent 
      v-model="drawer"
      :expand-on-hover="expandOnHover"
      :mini-variant.sync="miniVariant"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/99.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Usuário logado
            </v-list-item-title>
            <v-list-item-subtitle>usuario@email.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item v-for="item in items" :key="item" link :to="item.url">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app> GPS SPEAR FISHING </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    miniVariant: false,
    expandOnHover: false,

    items: [
      {icon: 'mdi-home', title: 'Home', url: '/'},
      {icon: 'mdi-account-multiple', title: 'Usuários', url: '/userList'},
      {icon: 'mdi-fish', title: 'Mergulhos', url: '/diveList'},
    ],
  })
};
</script>

<style>
</style>