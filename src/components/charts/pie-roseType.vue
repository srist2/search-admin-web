<template>
  <div id="pie-roseType"></div>
</template>

<script>
  export default {
    name: "pie-roseType",
    methods: {
      echartsInit() {
        let option = {
          legend: {
            top: 'bottom'
          },
          tooltip: {
            trigger: 'item'
          },
          color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: '网站用户类型',
              type: 'pie',
              radius: [50, 150],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: [
                { value: 40, name: '注册用户' },
                { value: 38, name: '志愿者' },
                { value: 32, name: '认领人' },
                { value: 30, name: '联系人' },
                { value: 15, name: '管理员' }
                // { value: 26, name: 'rose 6' },
                // { value: 22, name: 'rose 7' },
                // { value: 18, name: 'rose 8' }
              ]
            }
          ]
        };
        let main = document.getElementById("pie-roseType");
        this.$echarts.init(main).setOption(option);
      }
    },
    mounted() {
      this.echartsInit();
    }
  }
</script>

<style scoped>

  #pie-roseType {
    width: 550px;
    height: 550px;
  }

</style>
