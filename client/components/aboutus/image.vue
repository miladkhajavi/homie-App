<template>
  
    <div class="parentImage">
      <v-img
      src="/svg/about.svg"
      max-height="auto"
      class="ndndndnnd"
      :aspect-ratio="16 / 9"
      alt="درباره_هومی"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" align="center">
          <h1 class="display-1 font-weight-bold mb-4">درباره ما</h1>
          <h6 class="subheading">هومی املاک آنلاین</h6>
        </v-col>
      </v-row>
    </v-img>
    </div>
  
</template>
<script>
export default {
    
}
</script>
<style scoped>
.parentImage{
  display: flex;
  width: 100%;
  justify-content: center;
  background: url("/bg/bg1.png");
  background-repeat: repeat;
}
.ndndndnnd{
    margin:10px 30px 10px 30px;
    max-width:700px;
}
</style>