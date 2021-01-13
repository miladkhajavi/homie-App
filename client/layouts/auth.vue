<template>
  <v-app dark>
    
        <nuxt />
   

   
  </v-app>
</template>

<script>
export default {
  middleware:'authenticated',
  data () {
    return {
      
    }
  }
}
</script>
