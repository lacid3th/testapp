<template>
  <v-card>
    <v-layout>
      <v-app-bar title="Ordering Automation"></v-app-bar>
      <v-navigation-drawer>
        <v-list density="compact" nav>
          <v-list-item
            prepend-avatar=""
            title="Jinsung Kim"
            subtitle="lacid3th@gmail.com"
          ></v-list-item>
          <router-link class="link" to="/">
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="Main Input"
              value="mainInput"
            ></v-list-item
          ></router-link>
          <router-link class="link" to="/result">
            <v-list-item
              prepend-icon="mdi-forum"
              title="Result Page"
              value="resultpage"
            ></v-list-item
          ></router-link>
          <router-link class="link" to="/register">
            <v-list-item
              prepend-icon="mdi-arrow-up-bold-box-outline"
              title="Register Page"
              value="registerpage"
            ></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100px">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
</script>

<style>
.link {
  text-decoration: none;
  color: black;
  font-size: 25px;
}
.link:hover {
  text-decoration: none;
  color: black;
  font-size: 25px;
}
</style>
