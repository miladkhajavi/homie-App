<template>
  <v-app dark>
    <v-main>
      <div class="bg-main">
        <v-card flat tile>
          <v-app-bar app color="#2D3047" dark fixed hide-on-scroll>
            <v-app-bar-nav-icon
              @click.stop="toggleDrawer"
              aria-label="بار"
            ></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <!-- <div class="search-mainPage">
        <v-text-field
          floating
          append-icon="mdi-microphone"
          rounded
          class="mx-4 search-inputMain"
          flat
          hide-details
          label="جستجو"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
        ></v-text-field>
      </div> -->

            <!-- <template v-slot:extension>
        <v-tabs v-model="tabs" centered>
          <v-tab v-for="n in 3" :key="n"> ملک {{ n }} </v-tab>
        </v-tabs>
      </template> -->
          </v-app-bar>

          <nuxt />
        </v-card>
      </div>
    </v-main>

    <v-navigation-drawer v-model="drawer" app right dark color="#2D3047">

        <userInfo  :info="person" :auth="checkAuth" />

      <v-divider></v-divider>

      <v-list dense>
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
          to="/user/requests"
          link
          active-class="pink lighten-5 purple--text"
        >
          <v-list-item-icon>
            <v-icon color="deep-purple accent-1">mdi-clock-fast</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>درخواست های من</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="checkAuth"
          :to="`/user/${person._id}`"
          link
          active-class="pink lighten-5 purple--text"
        >
          <v-list-item-icon>
            <v-icon color="green accent-1">mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>پروفایل</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
          
          to="/aboutus"
          link
          active-class="pink lighten-5 purple--text"
        >
          <v-list-item-icon>
            <v-icon color="green accent-1">mdi-account-multiple-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>درباره ما</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
          
          to="/contact"
          link
          active-class="pink lighten-5 purple--text"
        >
          <v-list-item-icon>
            <v-icon color="yellow accent-1">mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>تماس با ما</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="checkAuth"
          @click="logout"
          link
          active-class="pink lighten-5 purple--text"
        >
          <v-list-item-icon>
            <v-icon color="red">mdi-power-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>خروج</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  components: {
    userInfo: () => import("@/components/navInfo/user"),
  },

  data: () => ({
    drawer: null,
    // tabs:null,
    person: {},
    items: [
      { title: "صفحه اصلی", icon: "mdi-view-dashboard", route: "/" },
      { title: "فیلتر", icon: "mdi-filter-outline", route: "/case" },
      
    ],
  }),
  methods: {
    logout() {
      this.$store.commit("auth/SIGN_OUT");
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    info() {
      // return JSON.parse(localStorage.getItem("INFO"));
      if(localStorage.getItem("HOMEITOKEN_KEY")){
      this.$store.dispatch("user/getProfileUser").then((res) => {
        this.person = res.data.item;
        // console.log(this.person);
      });  
      }
    },
  },
  mounted() {
    this.info();
  },
  computed: {
    checkAuth() {
      return localStorage.getItem("HOMEITOKEN_KEY");
    },
  },
};
</script>
<style>
</style>
