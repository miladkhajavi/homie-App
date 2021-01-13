<template>
  <v-app>
    <div>
      <v-container>
        <!-- snackbar -->
        <v-snackbar
          v-model="success"
          absolute
          elevation="24"
          color="success"
          text
          transition="scale-transition"
          multi-line
          dark
          top
          right
        >
          <v-icon color="success" dark>mdi-clock-fast</v-icon> درخواست شما با
          موفقیت ثبت شد و در اسرع وقت بررسی میشود
        </v-snackbar>
        <!-- snackbar/ -->
        <v-row justify="center">
          <v-col xl="5" lg="5" md="5" sm="12" cols="12">
            <v-card flat tile>
              <v-window v-model="onboarding">
                <v-window-item v-for="n in length" :key="`card-${n}`">
                  <v-card color="grey" height="300">
                    <div>
                      <v-img
                        class="image-main-page"
                        :src="`${$store.state.ImgURL}/places/${item.images[n]}`"
                        height="300px"
                      >
                      </v-img>
                    </div>
                  </v-card>
                </v-window-item>
                <!-- else image -->
                <v-window-item v-if="length === 0" :key="`card-${n}`">
                  <v-card color="grey" height="300">
                    <div>
                      <v-img
                        class="image-main-page"
                        :src="`${$store.state.ImgURL}/places/${item.images[0]}`"
                        height="300px"
                      >
                      </v-img>
                    </div>
                  </v-card>
                </v-window-item>
              </v-window>
              <!-- else image -->
              <v-card-actions class="justify-space-between">
                <v-btn text @click="prev" aria-label="قبلی">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-item-group
                  v-model="onboarding"
                  class="text-center"
                  mandatory
                >
                  <v-item
                    v-for="n in length"
                    :key="`btn-${n}`"
                    v-slot:default="{ active, toggle }"
                  >
                    <v-btn
                      :input-value="active"
                      icon
                      @click="toggle"
                      aria-label="دکمه"
                    >
                      <v-icon>mdi-record</v-icon>
                    </v-btn>
                  </v-item>
                </v-item-group>
                <v-btn text @click="next" aria-label="چپ">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col xl="7" lg="7" md="12" sm="12" cols="12">
            <v-card class="mx-auto" max-width="450" flat tile>
              <v-card-text>
                <div>
                  <v-icon color="deep-purple accent-4">mdi-home-variant</v-icon>
                  {{ rsd }} - {{ price }} تومان
                  <v-icon color="green">mdi-cash</v-icon>
                </div>
                <br />
                <h2 class="text--primary">
                  <v-icon color="deep-purple accent-4">mdi-map-marker</v-icon>
                  {{ item.address }}
                </h2>
                <br />

                <span class="black--text text--lighten-0 caption p-3">
                  <v-chip
                    color="indigo lighten-4"
                    text-color="deep-purple accent-4"
                    small
                  >
                    {{ type }}
                  </v-chip>
                  ({{ rate }})
                </span>
                <v-rating
                  v-model="rate"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  readonly
                  half-increments
                  size="15"
                ></v-rating>
                <span class="black--text caption mr-1"
                  ><v-icon color="deep-purple accent-4">mdi-bed-double</v-icon>
                  {{ item.bedRooms }} خواب </span
                ><br />
                <span class="black--text caption mr-1"
                  ><v-icon color="deep-purple accent-4">mdi-shower</v-icon>
                  {{ item.bathRooms }} سرویس بهداشتی </span
                ><br />
                <span class="black--text caption mr-1"
                  ><v-icon color="deep-purple accent-4">mdi-home-modern</v-icon>
                  {{ item.meter }} متری
                </span>
                <br />
                <div class="text--primary">
                  {{ item.description }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  large
                  color="deep-purple accent-4"
                  dark
                  rounded
                  @click="showModal"
                  aria-label="نمایش مودال"
                >
                  رزرو
                </v-btn>
                <v-btn icon @click="showMap" aria-label="نقشه">
                  <v-icon color="deep-purple accent"
                    >mdi-map-marker-circle</v-icon
                  >
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider><br />

        <div>پیشنهادی</div>
      </v-container>
      <!-- map -->
      <l-map v-show="showmap" @close="closeModal" :lat="lat" :lng="lng" />
      <!-- /map -->

      <!-- suggestion -->
      <suggestion />
      <!-- /suggestion -->
      <!-- request -->
      <request
        v-show="isModalVisible"
        @close="closeModal"
        :mobilenumber="mobile"
        @updateMobile="mobile = $event"
        :dates="date"
        @updateDates="date = $event"
        :times="time"
        @updateTimes="time = $event"
        :reserve="sendReservationRequest"
      ></request>
      <!-- request -->
    </div>
  </v-app>
</template>
<script>
import request from "../../components/case/request";
import LMap from "../../components/uiElement/showmap";
import suggestion from "../../components/case/suggestion";
export default {
  //  middleware:['auth'],
  layout: "single",
 
  components: {
    request,
    LMap,
  },
  data: () => ({
    success: false,
    showmap: false,
    type: "نامشخض",
    length: null,
    price: null,
    rsd: "ناشناس",
    onboarding: 0,
    rate: 0,
    lat: "",
    lng: "",
    item: [],
    isModalVisible: false,
    mobile: "",
    date: "",
    time: "",
  }),

  methods: {
    // get one data from all case ($store/case/getOneCase)
    async getDataOneCase() {
     await this.$store
        .dispatch("case/getOneCase", { id: this.$route.params.id })
        .then((response) => {
          // console.log(response);
          if (response.status === 200 || response.data.success) {
            this.lat = response.data.item.location.lat;
            this.lng = response.data.item.location.lng;
            this.item = response.data.item;
            this.rate = Number(response.data.item.star);
            this.length = response.data.item.images.length - 1;
            this.price = response.data.item.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.rsd = response.data.item.rsd.name;
            if (response.data.item.type === "rent") {
              this.type = "اجاره";
            }
            if (response.data.item.type === "fullrent") {
              this.type = "رهن کامل";
            }
            if (response.data.item.type === "sell") {
              this.type = "فروش";
            }
            if (response.data.item.type === "buy") {
              this.type = "خرید";
            }
          } else {
            console.log(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // send request for reserve visit ($store/case/sendReservation)
    async sendReservationRequest() {
      const data = {
        estate: this.$route.params.id,
        publisher: this.item.publisher._id,
        mobile: this.mobile,
        date: this.date,
        time: this.time,
      };
      
      // this.socket1.emit("reserve", {
      //   estate: this.$route.params.id,
      //   publisher: this.item.publisher._id,
      //   mobile: this.mobile,
      //   date: this.date,
      //   time: this.time,
      // }, (response) => {
      //   console.log(response);
      //   this.socket.on('reserveResp',d=>{
      //     console.log(d);
      //   })
      // });
      await this.$store
        .dispatch("case/sendReservation", data)
        .then((response) => {
          // console.log(response, "response");
          if (response.status === 200) {
            this.success = true;
            this.isModalVisible = false;
             this.$vuetify.goTo(0)
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    showMap() {
      this.showmap = true;
    },
    showModal() {
      
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.showmap = false;
    },

    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
  },
  mounted() {
    this.getDataOneCase();

    // this.socket = this.$nuxtSocket({
    //   channel: '/',
    //   reconnection: true,
    // });
    
    //   this.socket.on("hello",(dat)=>{
    //   console.log(dat);
    // })
  },
};
</script>
<style scoped>
/* modal */
</style>