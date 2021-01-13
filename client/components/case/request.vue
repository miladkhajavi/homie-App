<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header>
          <slot name="header">
            <v-btn
              small
              fab
              icon
              color="red"
              @click="close"
              aria-label="بستن مودال"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </slot>
        </header>
        <!-- stepers -->
        <v-card flat v-if="checkAuth">
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
              color="deep-purple accent-4"
              class="white--text"
              size="24"
              v-text="step"
            ></v-avatar>
          </v-card-title>

          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  prepend-inner-icon="mdi-phone"
                  color="purple"
                  label="موبایل"
                  required
                  type="number"
                  :error-messages="mobileErrors"
                  :value="mobilenumber"
                  @input="mobileInput"
                  @blur="$v.mobilenumber.$touch()"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  لطفا جهت رزرو بازدید, ارسال اطلاعات و هماهنگی بیشتر موبایل خود
                  را وارد نمایید
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-container>
                <date-picker
                  color="#7b1fa2"
                  :autoSubmit="true"
                  :disable="checkDate"
                  
                  placeholder="تاریخ"
                  :value="dates"
                  :error-messages="dateErrors"
                  @input="datesInput"
                  @blur="$v.dates.$touch()"
                />
                <br />
                <v-col cols="6">
                  <v-select
                    color="deep-purple accent-4"
                    menu-props="auto"
                    :value="times"
                    @input="timesInput"
                     @blur="$v.times.$touch()"
                    :items="items"
                     :error-messages="timeErrors"
                    prepend-icon="mdi-calendar-clock"
                    label="بازه زمانی"
                  ></v-select>
                </v-col>
                <span class="caption grey--text text--darken-1">
                  لطفا جهت تکمیل فرایند روز و بازه زمانی را مشخص نمایید <br />
                  (*بهتر است تاریخ یک روز آینده را انتخاب کنید*)
                </span>
              </v-container>
            </v-window-item>

            <v-window-item :value="3">
              <span class="pa-5 red--text ">{{errorVMessage}}</span>
              <div class="pa-4 text-center">
                <h3 class="caption black--text mb-2">
                  کاربر {{ info.userName }} آیا از تاریخ {{ date }} و بازه زمانی
                  {{ time }} اطمینان دارید؟
                </h3>
                <v-btn aria-label="لغو" @click="step--" rounded dark outlined color="red" small
                  ><v-icon color="red" small>mdi-close-circle-outline</v-icon>
                  لغو
                </v-btn>
                <v-btn
                  :disabled="disables()"
                  Block
                  color="deep-purple accent-4"
                  rounded
                  @click.prevent="reserve"
                  aria-label="رزرو"
                >
                  <v-icon color="green">mdi-checkbox-marked-circle</v-icon>
                  <span class="white--text">رزرو کن</span></v-btn
                >
                <span class="caption grey--text"></span>
              </div>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn :disabled="step === 1" text @click="step--"> قبلی </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled=" step === 3"
              color="purple"
              depressed
              @click="step++"
              aria-label="گام بعد"
            >
              <span class="white--text">گام بعد</span>
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else>
          <v-card-title class="title font-weight-regular">
            <v-icon color="yellow">mdi-lightbulb</v-icon>
          <span class="content ">برای رزرو وارد شوید</span>
          
         <v-row justify="end">
          <v-btn
              small
              text
              color="#673AB7"
              to="/auth/login"
              aria-label="ورود"
            >
              ورود / ثبت نام
            </v-btn>
         </v-row>
          </v-card-title>
        </v-card>
        <!-- /stepers/ -->
      </div>
    </div>
  </transition>
</template>
<script>
import DatePicker from "vue-persian-datetime-picker";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  props: {
    mobilenumber: { type: String, default: "" },
    dates: { type: String, default: "" },
    times: { type: String, default: "" },
    reserve: { type: Function },
  },

  validations: {
    mobilenumber: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
    dates: { required },
    times: { required },
  },

  data: () => ({
    step: 1,
    mobile: "",
    date: "",
    time: "",
    items: ["8 تا 12", "13 تا 16", "16 تا 19"],
    errorVMessage:null
  }),
  components: {
    DatePicker,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    mobileInput(event) {
      this.$v.mobilenumber.$touch();
      this.mobile = event;
      this.$emit("updateMobile", this.mobile);
    },
    datesInput(event) {
      this.$v.dates.$touch();
      this.date = event;
      this.$emit("updateDates", this.date);
    },
    timesInput(event) {
      this.$v.times.$touch();
      this.time = event;
      this.$emit("updateTimes", this.time);
    },
    checkDate(formatted, dateMoment, checkingFor) {
      return (
        formatted === new Date(Date.now()) ||
        // dateMoment.jMonth() === 4 ||
        dateMoment.locale("en").format("dddd") === "Friday"
      );
    },
    disables() {
      if (!this.$v.$invalid) {
       return ( this.disable = false ,this.errorVMessage = null)
        //  this.errorVMessage = null
      } else {
        return(this.disable = true , this.errorVMessage ="* لطفا همه ی فیلد ها را پر کنید")
        // this.errorVMessage ="* لطفا همه ی فیلد ها را پر کنید"
      }
    },
  },
  computed: {
    mobileErrors() {
      const errors = [];
      if (!this.$v.mobilenumber.$dirty) return errors;
      !this.$v.mobilenumber.minLength &&
        errors.push("شماره موبایل باید حداقل 11 رقم باشد");
      !this.$v.mobilenumber.maxLength &&
        errors.push("شماره موبایل نامعتبر است");
      !this.$v.mobilenumber.required && errors.push("موبایل الزامیست");
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.dates.$dirty) return errors;
      !this.$v.dates.required && errors.push("تاریخ الزامیست");
      return errors;
    },
    timeErrors() {
      const errors = [];
      if (!this.$v.times.$dirty) return errors;
      !this.$v.times.required && errors.push("انتخاب بازه زمانی الزامیست");
      return errors;
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return "ایمیل خود را وارد کنید";
        case 2:
          return "انتخاب تاریخ مراجعه";
        default:
          return "تایید";
      }
    },
    checkAuth() {
      return localStorage.getItem("HOMEITOKEN_KEY");
    },
    info() {
      return JSON.parse(localStorage.getItem("INFO"));
    },
  },
};
</script>
<style scoped>
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
  height: auto;
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
.modal-body {
  position: relative;
  padding: 20px 10px;
}
</style>