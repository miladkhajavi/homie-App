<template>
  <div class="bg-login">
    <v-container>
       <v-snackbar
          
          v-model="success"
          absolute
          elevation="14"
          color="#673AB7"
          text
          transition="scale-transition"
          multi-line
          dark
          top
          center
        >
        <v-icon color="yellow">mdi-lightbulb</v-icon>
          <span class="white--text content font-weight-bold">میتوانید به عنوان مهمان وارد شوید</span>
         <v-row justify="end">
          <v-btn
              small
              text
              color="success"
              to="/"
              aria-label="ورود مهمان"
            >
              بازدید
            </v-btn>
         </v-row>
        </v-snackbar>

      <v-row align="center" justify="center">
        <v-col xl="7" lg="7" md="7" sm="12" xs="12">
          <v-img class="animateLoginLogo" src="/svg/signin.svg"></v-img>
        </v-col>

        <v-col xl="5" lg="5" md="5" sm="12" xs="12" align-center>
          <h2 align="center">! Welcome Back</h2>
          <br />
          <div class="formLogin">
            <form>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="ایمیل"
                dense
                filled
                outlined
                color="blue-grey lighten-2"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field

                v-model="password"
                :error-messages="passwordErrors"
                dense
                outlined
                filled
                :type="show ?'text':'password'"
                :append-icon="show?'mdi-eye':'mdi-eye-off'"
                @click:append="show = !show"
                label="رمز عبور"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
              <p>فراموشی<nuxt-link to="/"> رمزعبور </nuxt-link></p>
              <v-btn @click="clear" outlined fab small color="red" class="ma-3" aria-label="پاک کن"
                ><v-icon>mdi-eraser</v-icon>
              </v-btn>

              <v-btn
                class="mr-2 loginbtn white--text"
                color="green"
                :disabled="disables()"
                :loading="loadingbtn"
                @click.prevent="submit"
                aria-label="ثبت"
              >
                ورود
              </v-btn>
            </form>
          </div>
          <p class="p-auth">
            حساب کاربری ندارید؟ از<nuxt-link to="/auth/register">
              اینجا</nuxt-link
            >
            ثبت نام کنید
          </p>
        </v-col>
      </v-row>
      <modal
        v-show="isModalVisible"
        @close="closeModal"
        title="اخطار"
        :modalBody="errorMassage"
        submitName="بستن"
      />
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import modal from "../../components/uiElement/modal";
export default {
  layout:'auth',
  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(5) },
    email: { required, email },
  },
// regex:/^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/
  data: () => ({
    success:true,
    show:false,
    password: "",
    email: "",
    width: "500",
    isModalVisible: false,
    errorMassage: null,
    loadingbtn: false,
  }),
  mounted() {
    this.$vuetify.goTo(0)
    this.$socket.emit('room', "12345"); 
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("رمز عبور باید بیشتر از 5 کاراکتر باشد");
      !this.$v.password.required && errors.push("رمز عبور الزامیست");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("ایمیل معتبر وارد کنید");
      !this.$v.email.required && errors.push("ایمیل الزامیست");
      return errors;
    },
  },

  methods: {
    closeModal() {
      this.isModalVisible = false;
    },

    submit() {
      this.$v.$touch();
      this.loadingbtn = true;
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("auth/login", userData)
        .then((response) => {
          this.loadingbtn = false;
          if (response.status === 200 || response.data.success) {
            this.$store.commit("auth/SET_AUTH", response.data);
            this.$router.push("/");
            // console.log(response.data, "response");
          }
        })
        .catch((error) => {
          if (error) {
            this.loadingbtn = false;
            this.errorMassage = "اطلاعات کاربر نادرست است";
            this.isModalVisible = true; 
             setInterval(() => {
            
              this.isModalVisible = false;
              
            }, 9000);
          }
        });
    },

    clear() {
      this.$v.$reset();
      this.password = "";
      this.email = "";
    },
    disables() {
      if (!this.$v.$invalid) {
        return (this.disable = false);
      } else {
        return (this.disable = true);
      }
    },
  },
};
</script>
<style scoped>
.bg-login {
  padding-top: 50px;
  background: url("/bg/bg1.png");
  background-repeat: repeat;
  height: 100%;
}
</style>

