<template>
  <div id="pie-roseType"></div>
</template>

<script>
  import {getDateStructure} from '@/api/index'

  export default {
    name: "pie-roseType",
    props: {
      pieRoseDate: {}
    },
    data() {
      return {

      }
    },
    methods: {
      echartsInit() {
        // if (this.pieRoseDate.adminNumber) {
        //   console.log('this.pieRoseDate.adminNumber22',this.pieRoseDate)
        // }
        console.log('pieRoseDate', this.pieRoseDate)
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
              radius: [50, 100],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              label: {
                show: false
              },
              data: [
                { value: this.pieRoseDate.generalUserNumber, name: '注册用户' },
                { value: this.pieRoseDate.volunteerNumber, name: '志愿者' },
                { value: this.pieRoseDate.claimNumber, name: '认领人' },
                { value: this.pieRoseDate.contactNumber, name: '联系人' },
                { value: this.pieRoseDate.adminNumber, name: '管理员' }
              ]
            }
          ]
        };
        let main = document.getElementById("pie-roseType");
        this.$echarts.init(main).setOption(option);
      }
    },
    created() {
      // getDateStructure()
      //   .then(res => {
      //     res = res.data
      //     console.log('res',res)
      //     if (res.status == 200) {
      //       this.pieRoseDate = res.data
      //     }
      //   })
    },
    mounted() {
      setTimeout(() => {
        this.echartsInit();
      }, 500)
    }
  }
</script>

<style scoped>

  #pie-roseType {
    width: 300px;
    height: 300px;
  }

</style>
