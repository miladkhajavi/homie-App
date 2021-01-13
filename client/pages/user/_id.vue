<template>
  <div class="bg-main">
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
          <v-icon color="success" dark>mdi-pen</v-icon>
          پروفایل شما با موفقیت ویرایش شد
        </v-snackbar>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-row justify="center">
            <v-badge icon bordered offset-x="180" offset-y="180" color="purple">
              <template v-slot:badge>
                <v-icon>mdi-paperclip</v-icon>
              </template>
              <v-avatar
                class="v-avatar-user"
                size="200"
                @click.prevent="$refs.avatar_badge_ref.click()"
              >
                <v-img

                  class="user-image"
                  :src="`${$store.state.ImgURL}/avatar/${user.avatar}`"
                  alt="Name"
                ></v-img>
              </v-avatar>
            </v-badge>
            <input type="file" hidden ref="avatar_badge_ref" @change="upload" />
          </v-row>
         
          <!-- <v-row justify="center">
            <span class="caption grey--text text--darken-1">23 kb</span>
          </v-row> -->
        </v-col>
        <v-divider class="ml-5" vertical></v-divider>

        <v-col cols="12" sm="12" md="7">
          <br />
          <v-text-field
            v-model="user.firstName"
            label="نام"
            chips
            outlined
            color="blue-grey lighten-2"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.lastName"
            label="نام خانوادگی"
            chips
            outlined
            color="blue-grey lighten-2"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.mobile"
            label="موبایل"
            chips
            outlined
            color="blue-grey lighten-2"
            required
          ></v-text-field>

          <v-btn color="purple" text @click="$router.go(-1)" aria-label="قبل">
            <v-icon>mdi-keyboard-return</v-icon>
          </v-btn>

          <v-btn color="green" dark @click="submit" aria-label="ثبت">
            ویرایش
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>
<script>
export default {
  data: () => ({
    success: false,
    user: {
      firstName: "",
      lastName: "",
      mobile: "",
      avatar:""
    },
    Attention: "",
  }),
  methods: {
    // get user data
    getUserProfile() {
      this.$store.dispatch("user/getProfileUser").then((res) => {
        this.$vuetify.goTo(0)
        if (res.status === 200 || res.data.success) {
          if (
            res.data.item.firstName &&
            res.data.item.lastName &&
            res.data.item.mobile
          ) {
            this.user = res.data.item;
            this.Attention = "ویرایش اطلاعات";
          } else {
            this.user.firstName = "";
            this.user.lastName = "";
            this.user.mobile = "";
            this.user.avatar =res.data.item.avatar
            this.Attention = "جهت تکمیل اطلاعات موارد مورد نیاز را کامل کنید";
          }
          // console.log(res.data.item, "get 1");
        }
      });
    },

    // edit button
    submit() {
      delete this.user.role;
      delete this.user.email;
      delete this.user.userName;
      delete this.user._id;
      delete this.user.avatar;
      delete this.user.createdAt;

      this.$store
        .dispatch("user/editProfile", this.user)
        .then((res) => {
          
          if(res.status === 200){
            this.getUserProfile();
            this.success = true;
            
          }
          // console.log(res,"updated 2");
          // console.log(this.user,"user 3");
        })
        .catch((err) => {
          err.response.data.msg.filter((item) => {
            console.log(item.message);
          });
        });
    },
    // upload image
    upload(event) {
      // console.log(event);
      let formData = new FormData();
      formData.append("avatar", event.target.files[0]);
      this.$store
        .dispatch("user/uploadProfileAvatar", formData)
        .then((res) => {
          if (res.status === 200) {
            /*
             * when we changing avatar twice
             * get user data and show new avatar
             */
            this.getUserProfile();
            // console.log(res, "res");
          }
        })
        .catch((err) => {
          console.log(err.response, "err");
        });
    },
  },
  mounted() {
    this.getUserProfile();
  },
  computed: {},
};
</script>
<style scoped>
/* .bg-main { */
/* background: url("/bg/bg1.png");
  background-repeat: repeat;
  height: 100%; */
/* } */
.v-avatar-user {
  cursor: pointer;
}
</style>
