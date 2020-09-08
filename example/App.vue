<template>
  <div class="root">
    <div class="group">
      <jason-vue-explorer
        mode="normal"
        :data-arr="dataArr"
        :selected-arr.sync="selectedArr"
        :action-arr="actionArr"
        @clickFolder="clickFolder"
        @clickFile="clickFile"/>
    </div>
    <div class="group">
      <jason-vue-explorer
        mode="table"
        :data-arr="dataArr"
        :selected-arr.sync="selectedArr"
        :other-column-arr="otherColumnArr"
        :action-arr="actionArr"
        @clickFolder="clickFolder"
        @clickFile="clickFile"/>
    </div>
  </div>
</template>

<script>
  let dataArr = [
    {
      key: 0,
      name: '文件夹',
      type: 'folder',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: 1,
      name: '图片',
      type: 'image',
      data: {
        time: '2020.02.22'
      }
    }
  ]

  export default {
    data () {
      return {
        dataArr,
        selectedArr: [
          dataArr[ 0 ]
        ],
        otherColumnArr: [
          {
            label: '时间',
            key: 'time'
          }
        ],
        actionArr: [
          {
            label: '下载',
            handler (data) {
              console.log('点击了下载按钮')
              console.log(data)
            }
          }
        ]
      }
    },
    methods: {
      clickFolder () {
        console.log('clickFolder')
      },
      clickFile () {
        console.log('clickFile')
      }
    }
  }
</script>

<style lang="scss">
  body {
    padding: 200px;
  }
  .root {

  }
  .group {
    padding: 30px;
    border: 1px solid rgba(#000, 0.1);
    & + & {
      margin-top: 20px;
    }
  }
</style>