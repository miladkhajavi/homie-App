<template>
  
</template>

<script>
export default {
  name: "modal",
  data: () => ({

  }),
  methods: {
    close() {
      this.$emit("close");
    },

   
  },
  props: ["type", "propertyType", "bedRooms","bathRooms","star"],
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
  z-index:5 ;
}

.modal {
  width: 500px;
  height: 550px;
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
  width:5px;
}
/* Track */
.modal::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
.modal::-webkit-scrollbar-thumb {
  background: #2D3047; 
  border-radius: 10px;
}

/* Handle on hover */
.modal::-webkit-scrollbar-thumb:hover {
  background: #4c4456; 
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}
/* transition */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0.1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s linear;
}
</style>