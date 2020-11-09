<template>
  <div class="root">
    <div class="group">
      <vue-explorer
        mode="normal"
        :data-arr="dataArr"
        :selected-arr.sync="selectedArr"
        :action-arr="actionArr"
        @clickFolder="clickFolder"
        @clickFile="clickFile"
        @dragMove="dragMove"/>
    </div>
    <div class="group">
      <vue-explorer
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
  let i = 0
  let dataArr = [
    {
      key: i++,
      name: 'folder',
      type: 'folder',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'doc',
      type: 'doc',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'pdf',
      type: 'pdf',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'ppt',
      type: 'ppt',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'xls',
      type: 'xls',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'rar',
      type: 'rar',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'zip',
      type: 'zip',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'image',
      type: 'image',
      data: {
        time: '2020.02.22'
      }
    },
    {
      key: i++,
      name: 'video',
      type: 'video',
      data: {
        time: '2020.02.22'
      }
    },
    {
      key: i++,
      name: 'txt',
      type: 'txt',
      data: {
        time: '2020.02.09'
      }
    },
    {
      key: i++,
      name: 'none',
      type: 'none',
      data: {
        time: '2020.02.22'
      }
    }
  ]

  export default {
    data () {
      return {
        dataArr: [],
        selectedArr: [],
        otherColumnArr: [
          {
            label: '时间',
            key: 'time'
          }
        ],
        actionArr: [
          {
            label: '下载1',
            handler (data) {
              console.log('点击了下载按钮')
              console.log(data)
            }
          },
          {
            label: '下载2',
            handler (data) {
              console.log('点击了下载按钮')
              console.log(data)
            }
          },
          {
            label: '下载3',
            handler (data) {
              console.log('点击了下载按钮')
              console.log(data)
            }
          }
        ]
      }
    },
    methods: {
      init () {
        setTimeout(() => {
          this.dataArr = dataArr
          this.selectedArr = [ dataArr[ 0 ] ]
        }, 20)
      },
      clickFolder () {
        console.log('clickFolder')
      },
      clickFile () {
        console.log('clickFile')
      },
      dragMove (folder, data) {
        console.log(folder, data)
      }
    },
    created () {
      this.init()
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