import Vue from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

Vue.use(require('vue-jalali-moment'));
Vue.component('date-picker', VuePersianDatetimePicker,{
    name: 'custom-date-picker',
    props:{
        
        autoSubmit: true,
    }
});