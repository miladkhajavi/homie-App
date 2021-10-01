<template>
  <div>
    <v-container class="bg-main" fluid>
     
      <v-row justify="center">
        <div class="search-mainPage">
          <v-text-field
            floating
            append-icon="mdi-microphone"
            rounded
            class="mx-4 search-inputMain"
            v-model="search"
            hide-details
            label="جستجو شهر , منطقه"
            prepend-inner-icon="mdi-magnify"
            solo
            color="deep-purple accent-4"
          ></v-text-field>
        </div>
      </v-row>
      
      <index-page  :search="search" />
    </v-container>
  </div>
</template>

<script>

export default {
  components: {
     indexPage: () => import("@/components/indexpage.vue")
  },
  data: () => ({
    search:""
  }),
  computed:{
    cards() {
      return this.$store.state.items;
    },
  },
  watch:{
    search(value){
      setTimeout(() => {
        if (value.length === 0) {
          this.$store.dispatch("searchMainPage" , {
            page:this.$store.state.paginate.page,
            search:""
          })
        }else{
          this.$store.dispatch("searchMainPage" , {
            page:this.$store.state.paginate.page,
            search:value
          })
        }
      }, 1000);
    }
  }
  
};
</script>
<style >
.bg-main {
  background: url("/bg/bg1.png");
  background-repeat: repeat;
  height: 100%;
}

.spanMain {
  color: #ed217c;
  font-weight: bold;
}
</style>
