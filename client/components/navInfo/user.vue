<template>
  <div>
    <v-list-item v-if="auth">
      
      <v-list-item-avatar>
        <v-img :src="`${$store.state.ImgURL}/avatar/${info.avatar}`"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-if="info.firstName === undefined">{{ info.userName }}</v-list-item-title>
        <v-list-item-title v-else>{{ info.firstName }} - {{info.lastName}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-bottom-navigation  background-color="#2D3047" v-else>
      
        <v-btn text to="auth/login" aria-label="ورود">
          <span>ورود</span>
          <v-icon>mdi-door</v-icon>
        </v-btn>
        <v-btn text to="auth/register" aria-label="ثبت نام">
          <span>ثبت نام</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      
    </v-bottom-navigation >
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    auth: {
      type: String,
    },
  },
  data:()=>({
    person:{}
  }),

  computed: {
    
  },
};
</script>