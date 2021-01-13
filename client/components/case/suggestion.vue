<template>
  <div>
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-item v-for="n in 8" :key="n" v-slot="{ active, toggle }">
        <!-- <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="300"
          width="300"
          @click="toggle"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card> -->

        <v-card class="ma-4" dark to="/case">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(63, 35, 112,.3), rgba(0,0,0,.9)"
            max-width="300"
            min-height="300"
            :aspect-ratio="16 / 9"
          >
            <v-card-title>
              <v-icon large left> mdi-map-marker </v-icon>
              <span class="title font-weight-bold">تهران - شهران</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-content>
                  <div>
                    <v-chip  label color="pink">
                     رهن کامل
                    </v-chip>
                  </div>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-icon class="mr-1"> mdi-bed </v-icon>
                  <span class="subheading mr-2">2</span>
                  <!-- <span class="mr-1">-</span> -->
                  <v-icon class="mr-1"> mdi-home-modern</v-icon>
                  <span class="subheading">45</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>
<script>
export default {
  data: () => ({
    model: null,
  }),
};
</script>