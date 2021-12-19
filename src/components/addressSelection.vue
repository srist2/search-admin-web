<template>
  <el-form-item prop="qyzcd">
    <el-cascader
      placeholder="请点击选择地址"
      :options="options"
      v-model="qyzcd"
      @change="handleChange"
    ></el-cascader>
  </el-form-item>
</template>

<script>

  export default {
    name: 'addressSelection',
    data() {
      return {
        fileList: [],
        // 地址选择器
        options: [],
        selectedOptions: [],
        cityArr: [], //城市列表
        areaArr: [], //区县列表
        province: "", //省
        city: "", //市
        area: "", // 区县,
        provinceCityArea: "", //选择器选择的省市区
        qyzcd: [],  //  选择地址结果编号
        address: '' // 选择地址结果
      }
    },
    model: {
      prop: 'address',
      event: 'onChange'
    },
    methods: {
      // 地址选择
      initDistPicker() {
        let options = {
          url: this.config.service.static.districts,
          success: res => {
            if (res.status === 200) {
              let distData = res.data;
              let options = [];
              // 省
              for (var provinceKy in distData["100000"]) {
                let optProvinceItem = {
                  value: provinceKy,
                  label: distData["100000"][provinceKy]
                };
                if (distData[provinceKy]) {
                  // 市
                  for (var cityKy in distData[provinceKy]) {
                    optProvinceItem.children = optProvinceItem.children
                      ? optProvinceItem.children
                      : [];
                    let optCityItem = {
                      value: cityKy,
                      label: distData[provinceKy][cityKy]
                    };
                    if (distData[cityKy]) {
                      // 区
                      for (var areaKy in distData[cityKy]) {
                        optCityItem.children = optCityItem.children
                          ? optCityItem.children
                          : [];
                        let optAreaItem = {
                          value: areaKy,
                          label: distData[cityKy][areaKy]
                        };
                        optCityItem.children.push(optAreaItem);
                      }
                    }
                    optProvinceItem.children.push(optCityItem);
                  }
                }
                options.push(optProvinceItem);
              }
              this.distData = distData;
              this.options = options;
            }
          },
          fail: res => {
            console.error('res', res)
          }
        }
        this.utils.request(options);
      },
      //选择地区
      handleChange(value) {
        let self = this;
        // console.log("value=>", value);
        //获取省名
        self.options.map((item, index) => {
          if (item.value == value[0]) {
            self.cityArr = item.children; //存储城市列表
            self.province = item.label;
          }
        });
        //获取市名
        self.cityArr.map((item, index) => {
          if (item.value == value[1]) {
            self.areaArr = item.children; //存储区县列表
            self.city = item.label;
          }
        });
        //获取区县名
        self.areaArr.map((item, index) => {
          if (item.value == value[2]) {
            self.area = item.label;
          }
        });
        self.provinceCityArea = self.province + self.city + self.area;
        this.address = self.provinceCityArea;
        this.$emit('onChange', this.address)
      },
    },
    mounted() {
      this.initDistPicker();
    }
  };
</script>

<style scoped>

</style>
