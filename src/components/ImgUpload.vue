<template>
  <el-upload
    ref="upload"
    class="avatar-uploader"
    action="http://localhost:8085/fileUpload"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :auto-upload="false"
    :on-change="imgSaveToUrl"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>

  export default {
    name: "ImgUpload",
    components: {},
    props: {
      imgUrl: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        imageUrl: null,
      }
    },
    methods: {
      // 上传成功回调
      handleSuccess(res, file) {
        if (file.response.status === 200) {
          this.imageUrl = file.response.data;
          this.$emit('update:imgUrl', this.imageUrl);
        }
      },
      // 上传预处理
      beforeUpload(file) {
        // 判断图片类型
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        // 判断图片大小 小于2M
        const isLt2M = file.size / 1024 / 1024 < 2;
        // 类型提醒
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M || isPNG && isLt2M;
      },
      // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      imgSaveToUrl(event) {
        // 获取上传图片的本地URL，用于上传前的本地预览
        let URL = null;
        if (window.createObjectURL != undefined) {
          // basic
          URL = window.createObjectURL(event.raw);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          URL = window.URL.createObjectURL(event.raw);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          URL = window.webkitURL.createObjectURL(event.raw);
        }
        // 转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
        this.imageUrl = URL;
      },
      // 上传图片
      submit() {
        this.$refs.upload.submit()
      },
    },
    created() {
    }
  }
</script>

<style scoped>
  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
