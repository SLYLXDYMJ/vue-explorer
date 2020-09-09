# jason-vue-explorer
> 基于 vue 的文件管理试图

## 安装
```bash
npm i --save jason-vue-explorer
```

## 使用
```javascript
import Vue from 'vue'
import JasonVueExplorer from 'jason-vue-explorer'
import 'jason-vue-explorer/dist/vue-explorer.css'

Vue.use(JasonVueExplorer)
```

```vue
<template>
  <div>
    <jason-vue-explorer
      mode="normal"
      :data-arr="dataArr"
      :selected-arr="selectedArr"
      :action-arr="actionArr"
      @clickFolder="clickFolder"
      @clickFile="clickFile"/>
      
    <jason-vue-explorer
      mode="table"
      :data-arr="dataArr"
      :selected-arr="selectedArr"
      :action-arr="actionArr"
      :other-column-arr="otherColumnArr"
      @clickFolder="clickFolder"
      @clickFile="clickFile"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /**
         *  文件数据，一维数组
         *  每一项数据如下:
         *    {
         *      // 唯一值
         *      key: [String, Number],
         *
         *      // 显示名称
         *      name: String,
         *
         *      // 类型
         *      type: String[folder/docx/excel/image/mp3/pdf/ppt/txt/video/zip/none]
         *
         *      // 额外数据
         *      data: Object
         *    }
         **/
        dataArr: [],
        
        /**
         *  被选中的项数据集合
         *  注意：
         *    table 模式有引用地址的问题
         *    所以要保证项对象在 dataArr 中能找到并且全等
         **/
        selectedArr: [],
        
        /**
         *  对于每一项的单独操作
         *  右键项即可弹出操作列表
         *  [
         *    {
         *      label: String（显示的名字）
         *      handler: Function（处理函数，参数为当前项）
         *    }
         *  ]
         **/
        actionArr: [],
        
        /**
         *  table 模式显示新的列
         *  normal 该 prop 无效
         *  第一列选中，第二列名字
         *  是必有的，可以考虑通过 css 的方式隐藏这两个固有列
         *  来显示纯显示
         *  {
         *    label: String,
         *    path: String,
         *    filter: Function
         *  }
         **/
        otherColumnArr: []
      }
    },
    methods: {
      // 点击文件夹时触发
      clickFolder (data) {},
      
      // 点击文件时出发
      clickFile (data) {}
    }
  }
</script>
```