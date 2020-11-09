# vue-explorer
> 基于 vue 的文件管理试图
> 依赖 element-ui 的 table、table-column 组件

## 安装
```bash
npm i --save element-ui
npm i --save vue-explorer-component
```

## 使用
```javascript
import Vue from 'vue'

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import vueExplorer from 'vue-explorer-component'

// 或者只注册 table 和 table-column 组件也可以
Vue.use(Element)
Vue.use(vueExplorer)
```

## 注意
> 目前使用需要提前全局注册 el-table 和 el-table-column

element-ui table 组件有些 bug... <br/>
我尝试在 explorer 中局部注册 table 和 table-column <br/>
打包在其他项目中使用异常（注册正常，数据正常，显示异常） <br/>
原因不明


## 包罗万象的例子
```vue
<template>
  <div>
    <vue-explorer
      mode="normal"
      :data-arr="dataArr"
      :selection="selection"
      :selected-arr="selectedArr"
      :action-arr="actionArr"
      @clickFolder="clickFolder"
      @clickFile="clickFile"
      @dragMove="dragMove"/>
      
    <vue-explorer
      mode="table"
      :data-arr="dataArr"
      :selection="selection"
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
         *  是否开启选择
         **/
        selection: true,
        
        /**
         *  被选中的项数据集合
         *  注意：
         *    selection 要为 true
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
         *    key: String,
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
      clickFile (data) {},
      
      // 拖拽移动时触发
      // 只有拖拽到文件夹才会触发
      // 注意：目前只有 normal 模式才有拖拽
      dragMove (targetFolderData, selectedArr) {}
    }
  }
</script>
```
