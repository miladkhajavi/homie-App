<template>
  <v-app>
    <div>
      <v-container class="bg-main" fluid>
        <v-row>
          <v-btn
            class="mt-3"
            text
            @click.prevent="openFilter()"
            v-show="page === 1"
            aria-label="فیلتر"
          >
            <span>فیلتر</span>
            <v-icon color="indigo">mdi-filter</v-icon>
          </v-btn>
          <v-col md="2" sm="6" v-show="page === 1">
            <v-select
              :items="sortItems"
              label="فیلتر براساس قیمت"
              dense
              solo
              @input="sortInput"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col
            v-for="item in items"
            :key="item._id"
            cols="12"
            sm="6"
            md="3"
            lg="3"
          >
            <v-card :to="`/case/${item._id}`" shaped elevation="10">
              <v-img
                class="image-main-page"
                :src="`${$store.state.ImgURL}/places/${item.images[1]}`"
                lazy-src="/bg/default.png"
                height="200px"
               gradient="to top right, rgba(100,115,201,0), rgba(0,0,0,.89)"
              >
              
                <h3
                  class="pr-4 pt-4 d-inline-block area-MainPage"
                  v-text="item.address"
                ></h3>
              </v-img>

              <v-card-subtitle class="pb-0"
                >{{ item.propertyType }} - {{ item.type }}</v-card-subtitle
              >

              <v-card-text class="text--primary">
                <div>
                  {{
                    item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                  تومان
                </div>
                <div>{{ item.meter }} متری</div>
                <div>{{ item.bedRooms }} خواب</div>
                <div>{{ item.bathRooms }} سرویس بهداشتی</div>
                <span> {{ item.description }}</span>
              </v-card-text>

              <v-card-actions class="white justify-center">
                <!-- <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
                aria-label="ایکن"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="this.$store.state.case.countPage"
          :total-visible="this.$store.state.case.perPage"
        ></v-pagination>
      </div>
      <!-- modal -->
      <!-- <filters 
      v-show="isModalVisible"
        @close="closeModal"
    /> -->
      <transition name="modal-fade">
        <div class="modal-backdrop" v-show="isModalVisible">
          <div
            class="modal"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription"
          >
            <header class="modal-header" id="modalTitle">
              <slot name="header">
                فیلتر
                <v-btn
                  small
                  fab
                  icon
                  color="red"
                  @click="closeModal"
                  aria-label="Close modal"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </slot>
            </header>
            <section class="modal-body" id="modalDescription">
              <slot name="body">
                <!-- type -->

                <p>نوع : {{ type || "انتخاب نشده" }}</p>
                <v-chip-group
                  v-model="type"
                  active-class="deep-purple--text text--accent-4"
                >
                  <v-chip value="sell"> فروشی </v-chip>
                  <v-chip value="fullrent"> رهن </v-chip>
                  <v-chip value="rent"> اجاره </v-chip>
                </v-chip-group>
                <br />
                <v-divider class="mx-4"></v-divider><br />
                <!--/ type end -->

                <!-- propertyType -->
                <p>نوع ملک : {{ propertyType || "انتخاب نشده" }}</p>
                <v-chip-group
                  v-model="propertyType"
                  active-class="deep-purple--text text--accent-4"
                >
                  <v-chip value="house"> ویلایی </v-chip>
                  <v-chip value="apartment"> آپارتمان </v-chip>
                  <v-chip value="garden"> باغ </v-chip>
                  <v-chip value="piot"> زمین </v-chip>
                </v-chip-group>
                <br />
                <v-divider class="mx-4"></v-divider><br />
                <!-- /propertyType end -->

                <!-- bedRooms-->
                <p>اتاق خواب : {{ bedRooms || "مهم نیست" }}</p>
                <v-chip-group
                  v-model="bedRooms"
                  active-class="deep-purple--text text--accent-4"
                >
                  <v-chip value="">مهم نیست</v-chip>
                  <v-chip value="1"> 1 خواب </v-chip>
                  <v-chip value="2"> 2 خواب </v-chip>
                  <v-chip value="3"> 3 خواب </v-chip>
                  <v-chip value="4"> 4 خواب </v-chip>
                </v-chip-group>
                <br />
                <v-divider class="mx-4"></v-divider><br />
                <!-- /bedRooms end-->

                <!-- bathRooms-->
                <p>سرویس بهداشتی : {{ bathRooms || "مهم نیست" }}</p>
                <v-chip-group
                  v-model="bathRooms"
                  active-class="deep-purple--text text--accent-4"
                >
                  <v-chip value="">مهم نیست</v-chip>
                  <v-chip value="1"> 1 </v-chip>
                  <v-chip value="2"> 2 </v-chip>
                  <v-chip value="3"> 3 </v-chip>
                </v-chip-group>
                <br />
                <v-divider class="mx-4"></v-divider><br />
                <!-- /bathRooms end-->
                <!-- star -->
                <p>
                  بر اساس امتیاز :<span
                    class="grey--text text--lighten-1 caption mr-1"
                  >
                    ({{ star }})
                  </span>
                </p>
                <v-rating
                  v-model="star"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  dark
                  half-increments
                  hover
                  size="18"
                ></v-rating>
                <!--/ star end -->
              </slot>
            </section>
            <footer class="modal-footer">
              <slot name="footer">
                <v-btn
                  color="green"
                  block
                  dark
                  @click="filterAllCase"
                  aria-label="Close modal"
                >
                  <span class="text-white-50">اعمال</span>
                </v-btn>
              </slot>
            </footer>
          </div>
        </div>
      </transition>
      <!--/modal -->
    </div>
    <!-- <div >
    <v-row justify="center">
      موردی یافت نشد
    </v-row>
  </div> -->
  </v-app>
</template>

<script>
export default {
  //  middleware:['auth'],
  components: {
    //  filters: () => import("@/components/all/filter"),
  },
  props: {},
  data: () => ({
    type: "",
    propertyType: "",
    bedRooms: "",
    bathRooms: "",
    star: "",
    sortItems: [
      { value: -1, text: "بیشترین" },
      { value: 1, text: "کمترین" },
    ],
    sorts: null,
    isModalVisible: false,
    // socials: [
    //   {
    //     icon: "mdi-facebook",
    //     color: "indigo",
    //   },
    //   {
    //     icon: "mdi-linkedin",
    //     color: "cyan darken-1",
    //   },
    //   {
    //     icon: "mdi-instagram",
    //     color: "red lighten-3",
    //   },
    // ],
  }),
  mounted() {
    this.$store.dispatch("case/getAllCases", {
      page: this.page,
      type: this.type,
      propertyType: this.propertyType,
      bedRooms: this.bedRooms,
      bathRooms: this.bathRooms,
      star: this.star,
    });
  },
  computed: {
    items() {
      return this.$store.state.case.items;
    },
    page: {
      get() {
        return Number(this.$route.query.page) || 1;
      },
      set(value) {
        this.$router.push({ path: this.$route.path, query: { page: value } });
        this.$store.dispatch("case/getAllCases", {
          page: value,
          type: this.type,
          propertyType: this.propertyType,
          bedRooms: this.bedRooms,
          bathRooms: this.bathRooms,
          star: this.star,
        });
      },
    },
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    openFilter() {
      this.isModalVisible = true;
    },
    filterAllCase() {
      this.$store.dispatch("case/getAllCases", {
        page: this.page,
        type: this.type,
        propertyType: this.propertyType,
        bedRooms: this.bedRooms,
        bathRooms: this.bathRooms,
        star: this.star,
      });
      this.isModalVisible = false;
    },
    sortInput(event) {
      // this.sorts = event;
      this.$store.dispatch("case/sortPrices", {
        page: this.page,
        price: event,
      });
    },
    sortPriceEstate() {},
  },
};
</script>
<style scoped>
.bg-main {
  background: url("/bg/bg1.png");
  background-repeat: repeat;
  height: 100%;
}

.spanMain {
  color: #ed217c;
  font-weight: bold;
}

/* modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.modal {
  width: 500px;
  height: 450px;
  background: #ffffff;
  box-shadow: 0px 0px 10px black;
  overflow-y: scroll;
  touch-action: manipulation;
  display: flex;
  flex-direction: column;
  margin: auto;
  border-radius: 8px;
}

.modal::-webkit-scrollbar {
  width: 5px;
}
/* Track */
.modal::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
.modal::-webkit-scrollbar-thumb {
  background: #2d3047;
  border-radius: 10px;
}

/* Handle on hover */
.modal::-webkit-scrollbar-thumb:hover {
  background: #4c4456;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}
/* transition */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0.1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s linear;
}
/* modal end */
</style>
