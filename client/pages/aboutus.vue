<template>
  <div>
    <v-responsive class="overflow-y-auto">
      <!-- image -->
      <image-about/>
      <!-- lazy loading -->
      <desc-about/>
      
    </v-responsive>
  </div>
</template>
<script>
export default {
  components: {
    imageAbout: () => import("@/components/aboutus/image"),
    descAbout: () => import("@/components/aboutus/description"),
  },
  
};
</script>
