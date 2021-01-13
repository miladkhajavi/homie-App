<template>
  <div>
    <div>
      <v-row>
        <!-- <v-spacer></v-spacer> -->

        <v-col
          v-for="card in cards"
          :key="card._id"
          cols="12"
          sm="6"
          md="3"
          lg="3"
        >
          <v-card :to="`/case/${card._id}`" shaped elevation="10">
            <v-img
             
              class="image-main-page"
              :src="`${$store.state.ImgURL}/places/${card.images[1]}`"
              lazy-src="/bg/default.png"
              gradient="to top right, rgba(100,115,201,0), rgba(0,0,0,.89)"
              height="200px"
            >
              <h3
                class="pr-4 pt-4 d-inline-block area-MainPage"
                v-text="card.address"
              ></h3>
            </v-img>
            <v-card-subtitle class="pb-0"
              >{{ card.propertyType }} - {{ card.type }}</v-card-subtitle
            >

            <v-card-text class="text--primary">
              <div>
                {{
                  card.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
                تومان
              </div>
              <div>{{ card.meter }} متری</div>
              <div>{{ card.bedRooms }} خواب</div>
              <div>{{ card.bathRooms }} سرویس بهداشتی</div>
              <span> {{ card.description }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination
          v-if="cards.length >= 1"
          v-model="page"
          :length="this.$store.state.countPage"
          :total-visible="this.$store.state.perPage"
        ></v-pagination>
      </div>
    </div>
    <div v-if="cards.length === 0">
      <v-row justify="center">
        <span class="headline font-weight-bold">
          <span class="red--text">({{ this.search }})</span> وجود ندارد
        </span>
        <v-icon large color="yellow accent-4">mdi-emoticon-sad</v-icon>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    search: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),

  computed: {
    cards() {
      return this.$store.state.items;
    },
    page: {
      get() {
        return Number(this.$route.query.page) || 1;
      },
      set(value) {
        this.$router.push({ path: this.$route.path, query: { page: value } });
        this.$store.dispatch("searchMainPage", {
          page: value,
          search: this.search,
        });
      },
    },
  },
  mounted() {
    this.$store.dispatch("searchMainPage", {
      page: this.page,
      search: this.search,
    });
  },
  methods: {
    getImage() {
      const min = 550;
      const max = 560;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>