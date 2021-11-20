<template>
  <modal-base ref="modalBaseCommon">
    <div class="common">
      <div class="header">{{this.modalData.title}}</div>
      <div class="body">{{this.modalData.context}}</div>
      <div class="footer">
        <el-button v-if="this.modalData.showCancel" class="btn-close" @click.stop="close" size="medium">{{this.modalData.cancelButtonText}}</el-button>
        <el-button class="btn-confirm" type="primary" @click.stop="confirm" size="medium">{{this.modalData.confirmButtonText}}</el-button>
      </div>
    </div>
  </modal-base>
</template>

<script>
  import modalBase from "./base";

  export default {
    name: 'modalCommon',
    components: {
      modalBase,
    },
    props: {
      modalData: {
        title: '',                  // 标题
        context: '',                // 提示文本
        confirmButtonText: '确定',  // 确认按钮文本
        cancelButtonText: '取消',   // 取消按钮文本
        showCancel: false,          // 是否显示取消按钮
        confirm: () => {},          // 提交回调方法
        close: () => {}             // 取消回调方法
      }
    },
    data() {
      return {
      }
    },
    methods: {
      confirm() {
        this.modalData.confirm();
      },
      close() {
        this.modalData.close();
      },
      show() {
        this.$refs.modalBaseCommon.show();
      },
      hide() {
        this.$refs.modalBaseCommon.hide();
      }
    }
  };
</script>

<style scoped>
  .common {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px;
    display: flex;
  }
  .footer {
    display: flex;
    justify-content: space-evenly;
    padding: 15px;
  }
  .body {
    display: flex;
    justify-content: center;
    padding: 20px 10px;
    min-width: 250px;
  }
  .btn-close, .btn-confirm {
    border-radius: 8px;
  }
</style>
