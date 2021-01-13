<template>
  <div>
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
      center
    >
      <div v-for="msg in message" :key="msg.text">
        <span
          ><v-icon color="success" dark>mdi-pen</v-icon> {{ msg.text }}</span
        >
      </div>
    </v-snackbar>
    <image-contact />

    <!-- contact -->
    <form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="firstName"
              :error-messages="firstNameErrors"
              label="نام"
              filled
              chips
              outlined
              color="blue-grey lighten-2"
              required
              @input="$v.firstName.$touch()"
              @blur="$v.firstName.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="lastName"
              :error-messages="lastNameErrors"
              label="نام خانوادگی"
              filled
              chips
              outlined
              color="blue-grey lighten-2"
              required
              @input="$v.lastName.$touch()"
              @blur="$v.lastName.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="mobile"
              :error-messages="mobileErrors"
              label="موبایل"
              filled
              chips
              type="number"
              outlined
              color="blue-grey lighten-2"
              required
              @input="$v.mobile.$touch()"
              @blur="$v.mobile.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
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
          </v-col>
        </v-row>
        <v-textarea
          v-model="description"
          filled
          auto-grow
          label="توضیحات"
          rows="4"
          row-height="30"
          shaped
        ></v-textarea>
        <div class="button-send">
          <v-btn
            class="ma-3 loginbtn white--text"
            block
            rounded
            color="green"
            aria-label="ارسال"
            @click.prevent="submit"
            :disabled="disables()"
          >
            ارسال</v-btn
          >
        </div>
      </v-container>
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: {
    imageContact: () => import("@/components/contactus/parallax"),
  },
  validations: {
    firstName: { required },
    lastName: { required },
    mobile: { required, minLength: minLength(11), maxLength: maxLength(12) },
    email: { required, email },
  },
  data: () => ({
    success: false,
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    description: "",
    message: [{ text: "" }],
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("ایمیل معتبر وارد کنید");
      !this.$v.email.required && errors.push("ایمیل الزامیست");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("نام الزامیست");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;

      !this.$v.lastName.required && errors.push("نام خانوادگی الزامیست");
      return errors;
    },
    mobileErrors() {
      const errors = [];
      if (!this.$v.mobile.$dirty) return errors;
      !this.$v.mobile.minLength && errors.push("موبایل معتبر نیست");
      !this.$v.mobile.maxLength && errors.push("موبایل معتبر نیست");
      !this.$v.mobile.required && errors.push("موبایل الزامیست");

      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      const data = {
        firstName: this.firstName.toLowerCase(),
        lastName: this.lastName.toLowerCase(),
        mobile: this.mobile.toLowerCase(),
        email: this.email.toLowerCase(),
        description: this.description.toLowerCase(),
      };
      this.$store
        .dispatch("user/contactUs", data)
        .then((result) => {
          this.message = [];
          if (result.data.success) {
            this.$vuetify.goTo(0);
            this.message.push({ text: "ممنون از وقتی که برای ما گذاشتید" });
            this.success = true;
          }
        })
        .catch((err) => {
          this.message = [];
          if (err) {
            this.$vuetify.goTo(0);
            this.message.push({ text: "فیلد های مورد نیاز را پر کنید" });
            this.success = true;
          }
        });
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
.button-send {
  display: flex;
  justify-content: center;
}
</style>