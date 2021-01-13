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
              aria-label="Close modal"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </slot>
        </header>
        

        <div id="map-wrap">
         
          <!-- <client-only> -->
          <l-map :zoom="16" :center="[lat, lng]" :options="mapOptions">
            <l-tile-layer
              url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
              :attribution="attribution"
            ></l-tile-layer>
            <l-marker  :lat-lng="[lat, lng]"></l-marker>
          </l-map>
          <!-- </client-only> -->
        </div>
        
       
      </div>
    </div>
  </transition>
</template>
<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
   props: ['lat',"lng"],
  data: () => ({
    attribution: '&copy; <a href="https://miladkhajavi.ir">Milad khajavi</a>',
     mapOptions: {
        zoomSnap: 0.5
      },
  }),
  methods: {
    close() {
      this.$emit("close");
    },
  }
  
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
  height: 450px;
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
#map-wrap{
   width:100%;
    height: 50vh;
    

}
</style>