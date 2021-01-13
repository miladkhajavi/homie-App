<template>
  <v-app dark>
     <v-main>
     <div class="bg-main">
    <v-card flat tile>
     <v-app-bar app color="#2D3047" dark fixed hide-on-scroll>
      
       <v-avatar>
      <img
        src="/brand.png"
        alt="brand"
      >
    </v-avatar>
      <v-spacer></v-spacer>
      <div >
          <v-btn icon @click="$router.go(-1)" aria-label="قبل">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </div>

      
    </v-app-bar>

      <nuxt />
   
</v-card>
   </div>
   </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
  },
}
</script>
