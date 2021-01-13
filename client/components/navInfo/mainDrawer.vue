<template>
  <div>
     
    <v-navigation-drawer v-model="drawer" app right dark color="#2D3047">
      <userInfo :info="info" :auth="checkAuth" />

      <v-divider></v-divider>

      <v- list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          active-class="pink lighten-5 purple--text"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="checkAuth"
          @click="logout"
          link
          active-class="pink lighten-5 purple--text"
        >
          <v-list-item-icon>
            <v-icon>mdi-power-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>خروج</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
 props:{
     drawer:{
          type: Boolean,
        default: false
     }
 },
  components: {
    userInfo: () => import("@/components/navInfo/user"),
  },

  data: () => ({
     
    items: [
      { title: "صفحه اصلی", icon: "mdi-view-dashboard", route: "/" },
      { title: "مشاهده همه", icon: "mdi-polymer", route: "/all" },
    ],
  }),
  methods: {
    logout() {
      this.$store.commit("auth/SIGN_OUT");
    },
  },


  computed: {
    info() {
      return JSON.parse(localStorage.getItem("INFO"));
    },
    checkAuth() {
      return localStorage.getItem("HOMEITOKEN_KEY");
    },
  },
};
</script>