<template>
   <v-responsive height="auto" class="text-center pa-2">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 0.9,
          }"
          min-height="200"
          transition="fade-transition"
        >
          <v-card class="mx-auto" max-width="79%" flat>
            <v-card-title>درباره ما</v-card-title>

            <v-card-text>
              هومی پلتفرم آنلاین در زمینه املاک است, ابتدا کار خود را در سال
              1399 آغاز کرد. اپلیکیشن هومی جهت سهولت در بازدید از منازل توسط
              مردم ایجاد شده به این صورت که ابتدا آژانس های املاک یا مراکز منتخب
              مورد هایی اعم از خانه هایی ویلایی آپارتمان های مسکونی، ویلا ها،
              زمین یا باغ ها و... را میتوانند به اشتراک بگذارند در اینصورت
              کاربران بدون مراجعه و به صورت انلاین میتوانند مورد خود را انتخاب
              کنند در نتیجه اگر در اپلیکیشن ثبت نام کرده باشند میتوانند مورد خود
              را رزرو کنند. سپس مراکزی که مورد ها را به اشتراک گذاشته اند
              درخواست رزرو کاربران را میبینند و میتوانند آنها را به طور
              سازماندهی شده به بازدید میفرستند
            </v-card-text>
            <v-card-subtitle
              ><span class="yellow--text">****</span></v-card-subtitle
            >
          </v-card>
        </v-lazy>
      </v-responsive>
</template>
<script>
export default {
    data: () => ({
    isActive: false,
  }),
}
</script>