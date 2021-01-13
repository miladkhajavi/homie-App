<template>
  <div class="bg-login">
    <v-container>
      <v-row align="center" justify="center">
        <v-col xl="7" lg="7" md="7" sm="12" xs="12">
          <v-img
            class="animateLoginLogo"
            src="/svg/mobile.svg"
            alt="ثبت نام"
          ></v-img>
        </v-col>

        <v-col xl="5" lg="5" md="5" sm="12" xs="12" align-center>
          <h2 align="center">Sign Up</h2>
          <br />
          <div class="formLogin">
            <form>
              <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                label="نام کاربری"
                filled
                chips
                outlined
                color="blue-grey lighten-2"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="ایمیل"
                filled
                chips
                outlined
                color="blue-grey lighten-2"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"

                filled
                outlined
                :type="show?'text':'password'"
                :append-icon="show?'mdi-eye':'mdi-eye-off'"
                @click:append="show =!show"
                label="رمز عبور"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :error-messages="confirmPasswordErrors"
                filled
                outlined
                :type="show?'text':'password'"
                :append-icon="show?'mdi-eye':'mdi-eye-off'"
                label="تکرار رمز عبور "
                required
                @input="$v.confirmPassword.$touch()"
                @blur="$v.confirmPassword.$touch()"
              ></v-text-field>

              <v-btn @click="clear" outlined fab small color="red" class="ma-3" aria-label="پاک کن"
                ><v-icon>mdi-eraser</v-icon>
              </v-btn>

              <v-btn
                class="ma-3 loginbtn white--text"
                color="green"
                @click.prevent="submit"
                :disabled="disables()"
                aria-label="ثبت"
              >
                ثبت نام
              </v-btn>
            </form>
          </div>
          
          <p class="p-auth">
            قبلا ثبت نام کردید؟ از
            <nuxt-link to="/auth/login"> اینجا</nuxt-link> وارد شوید
          </p>
        </v-col>
      </v-row>

      <modal   v-show="isModalVisible"
      @close="closeModal" title="خطا" modalBody="کاربر بااین مشخصات موجود است" submitName="بستن"/>
    

    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import modal from '../../components/uiElement/modal';

export default {
  layout:'auth',
  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(5) },
    confirmPassword: { required, sameAs: sameAs("password") },
    username: { required, minLength: minLength(5) },
    email: { required, email },
  },

  data: () => ({
    show:false,
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    width: "500",
    disable: true,
    isModalVisible:false,
    error:null
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("رمز عبور باید بیشتر از 5 کاراکتر باشد");
      !this.$v.password.required && errors.push("رمز عبور الزامیست");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push("تکرار رمز عبور الزامیست");
      !this.$v.confirmPassword.sameAs && errors.push("رمز عبور ناهماهنگ");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("ایمیل معتبر وارد کنید");
      !this.$v.email.required && errors.push("ایمیل الزامیست");
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.minLength &&
        errors.push("نام کاربری باید حداقل شامل 5 کاراکتر باشد");
      !this.$v.username.required && errors.push("نام کاربری الزامیست");
      return errors;
    },
  },

  methods: {
      closeModal() {
        this.isModalVisible = false;
      },

    submit() {
      this.$v.$touch();
      const userData = {
        userName:this.username.toLowerCase(),
        email:this.email,
        password:this.password
      }
      this.$store.dispatch("auth/register",userData).then(response=>{
        this.$router.push("/auth/login");
      }).catch(err=>{
        console.log(err);
        this.isModalVisible = true;   
      })
      
    },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.confirmPassword = "";
      this.email = "";
      this.username = "";
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

