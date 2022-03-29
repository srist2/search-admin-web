<template>
  <div class="modal-backdrop" v-show="sShow" @click="handleBack">
    <div class="modal" @click.stop="() => {}">
      <div class="close"><i @click="hide()" class="el-icon-close"/></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modalBase',
    components: {},
    data() {
      return {
        sShow: false,
      }
    },
    props: {
      modalData: {}
    },
    methods: {
      show() {
        this.sShow = true;
      },
      hide() {
        this.sShow = false;
      },
      handleBack() {
        // this.hide();
      }
    }
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2001;
  }

  .modal {
    /*width: 70%;*/
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    z-index: 2002;
    position: relative;
  }

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
