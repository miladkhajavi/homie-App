<template>
  <div>
    <br />
    <div v-if="requests.length > 0">
      <v-row justify="start">
        <div class="search-mainPage">
          <v-text-field
            floating
            append-icon="mdi-microphone"
            rounded
            class="mx-4 search-inputMain"
            hide-details
            label="جستجو"
            prepend-inner-icon="mdi-magnify"
            solo
            color="deep-purple accent-4"
          ></v-text-field>
        </div>
      </v-row>
      <br />
      <v-data-table
        :headers="headers"
        :items="requests"
        :items-per-page="10"
        hide-default-footer
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            v-if="item.status === 'sent'"
            :color="statusColor(item.status)"
            dark
          >
            <v-btn icon @click.prevent="removeItem(item._id)">
              <v-icon left >
                {{ statusIcons(item.status) }}
              </v-icon>
            </v-btn>

            {{ statusField(item.status) }}
          </v-chip>

          <v-chip
            v-if="item.status !== 'sent'"
            :color="statusColor(item.status)"
            dark
            ><v-icon left>
              {{ statusIcons(item.status) }}
            </v-icon>
            {{ statusField(item.status) }}
          </v-chip>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        v-if="this.$store.state.reserve.pageination.length != 1"
        :length="this.$store.state.reserve.pageination.length"
        :total-visible="this.$store.state.reserve.pageination.perpage"
      ></v-pagination>
    </div>
    <div v-else>
      <v-container>
        <v-row justify="center">
          <span class="headline font-weight-bold"> اطلاعاتی وجود ندارد </span>
          <v-icon large color="yellow accent-4">mdi-emoticon-sad</v-icon>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      headers: [
        {
          text: "شماره",
          align: "start",
          sortable: true,
          value: "_id",
        },
        {
          text: "وضعیت درخواست",
          value: "status",

          sortable: false,
        },
        {
          text: "محدوده",
          value: "estate.address",
          align: "start",
          sortable: false,
        },
        { text: "گیرنده", value: "publisher.userName", sortable: false },
        { text: "موبایل", value: "mobile" },
        { text: "تاریخ", value: "fullDate.date" },
        { text: "بازه زمانی", value: "fullDate.time", sortable: false },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("reserve/getAllUserRequests", { page: this.page });
  },
  computed: {
    requests() {
      return this.$store.state.reserve.items;
    },

   

    page: {
      get() {
        return Number(this.$route.query.page) || 1;
      },
      set(el) {
        this.$router.push({ path: this.$route.path, query: { page: el } });
        this.$store.dispatch("reserve/getAllUserRequests", { page: el });
      },
    },
  },  
  methods: {
     removeItem(id){
      this.$store.dispatch('reserve/remove',id).then(response=>{
        if (response.data.success) {
          this.$store.dispatch("reserve/getAllUserRequests", { page: this.page });
        }
      })
    },
    statusColor(status) {
      if (status === "sent") return "blue lighten-2";
      else if (status === "confirmed") return "green darken-1";
      else return "red";
    },
    statusField(status) {
      if (status === "sent") return "ارسال شده";
      else if (status === "confirmed") return "تایید شده";
      else return "پایان یافته";
    },
    statusIcons(status) {
      if (status === "sent") return "mdi-delete";
      else if (status === "confirmed")
        return "mdi-checkbox-marked-circle-outline";
      else return "mdi-clock-fast";
    },
  },
};
</script>