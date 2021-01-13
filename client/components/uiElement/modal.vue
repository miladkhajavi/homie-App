<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
           {{title}}
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
        <section class="modal-body" id="modalDescription">
          <slot name="body"> {{modalBody}} </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <v-btn
             color="purple"
             small
             outlined
              @click="close"
              aria-label="Close modal"
            >
              {{submitName}}
            </v-btn>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
  props: ['title',"modalBody","submitName"]
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
}

.modal {
  width: 500px;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  margin: auto
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
    transition: opacity .3s linear;
   
  }
</style>