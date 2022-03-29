<template>
  <div id="sankey-miss"></div>
</template>

<script>
  export default {
    name: "sankey-miss",
    props: {
      sankeyList: []
    },
    data() {
      return {
        links: [
          {
            source: '失踪者类型',
            target: '男性',
            value: 15
          },
          {
            source: '失踪者类型',
            target: '女性',
            value: '202'
          },
          {
            source: '女性',
            target: '离家出走',
            value: 8
          },
          {
            source: '女性',
            target: '失散亲友',
            value: 3
          },
          {
            source: '女性',
            target: '送养',
            value: 3
          },
          {
            source: '女性',
            target: '遗弃',
            value: 3
          },
          {
            source: '女性',
            target: '失散亲友',
            value: 2
          },
          {
            source: '女性',
            target: '死亡',
            value: 1
          },
          {
            source: '男性',
            target: '离家出走',
            value: 3
          },
          {
            source: '男性',
            target: '被拐卖',
            value: 2
          },
          {
            source: '男性',
            target: '收养',
            value: 2
          },
          {
            source: '男性',
            target: '遗弃',
            value: 2
          },
          {
            source: '男性',
            target: '孤儿',
            value: 2
          },
          {
            source: '男性',
            target: '不明原因',
            value: 2
          },
          {
            source: '男性',
            target: '迷路走失',
            value: 0
          },
        ]
      }
    },
    methods: {
      echartsInit() {
        let links = this.sankeyList
        let option = {
          title: {
            text: '失踪者类型',
            height: 1200
          },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
          series: {
            type: 'sankey',
            layout: 'none',
            top: 50,
            left: 20,
            emphasis: {
              focus: 'adjacency'
            },
            data: [
              {
                name: '失踪者类型'
              },
              {
                name: '男性'
              },
              {
                name: '女性'
              },
              {
                name: '失散亲友'
              },
              {
                name: '被拐卖'
              },
              {
                name: '离家出走'
              },
              {
                name: '迷路走失'
              },
              {
                name: '不明原因'
              },
              {
                name: '孤儿'
              },
              {
                name: '遗弃'
              },
              {
                name: '送养'
              },
              {
                name: '收养'
              },
              {
                name: '死亡'
              },
            ],
            links
          }

        };
        let main = document.getElementById("sankey-miss");
        this.$echarts.init(main).setOption(option);
      }
    },
    mounted() {
      setTimeout(() => {
        this.echartsInit();
      }, 1000)
    }
  }
</script>

<style scoped>
  #sankey-miss {
    width: 950px;
    height: 400px;
  }

</style>
