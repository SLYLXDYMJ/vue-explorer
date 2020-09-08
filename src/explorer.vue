<template>
  <div class="explorer">
    <!-- mode normal -->
    <div
      class="explorer-normal"
      v-if="mode === 'normal' && dataArr.length">
      <div
        class="explorer-normal-item"
        :class="{ active: selectedKeyArr.indexOf(item.key) !== -1 }"
        v-for="(item, i) in dataArr"
        :key="item.key"
        @click="clickItem(item)">
        <!-- 选中按钮 -->
        <img
          class="explorer-normal-item-selected"
          src="./images/icon-selected.png"
          alt=""
          @click.stop="normalToggleSelected(item)">
        <!-- 图标 -->
        <img
          class="explorer-normal-item-icon"
          :src="typeIconMap[ item.type ] || typeIconMap['none']"
          alt="">
        <!-- 名称 -->
        <p class="explorer-normal-item-name">
          {{ item.name || '' }}
        </p>
      </div>
    </div>

    <!-- mode table -->
    <el-table
      class="explorer-table"
      ref="table"
      v-else-if="mode === 'table' && dataArr.length"
      :data="dataArr"
      @selection-change="tableToggleSelected">
      <!-- 多选列 -->
      <el-table-column type="selection"/>
      <!-- 名称列 -->
      <el-table-column label="名称">
        <template slot-scope="scope">
          <div
            class="explorer-table-name"
            @click="clickItem(scope.row)">
            <img :src="typeIconMap[ scope.row.type ]" alt="">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <!-- 自定义的列 -->
      <el-table-column
        v-for="column in otherColumnArr"
        :key="column.label"
        :label="column.label">
        <template slot-scope="scope">
          {{ column.filter ? column.filter(scope.row.data[column.key]) : scope.row.data[column.key] }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-for="action in actionArr"
            :key="action.label"
            size="small"
            @click="action.handler(scope.row)">
            {{ action.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="explorer-empty" v-else>
      暂无文件...
    </div>
  </div>
</template>

<script>
  import { Table, TableColumn, Button } from 'element-ui'

  export default {
    name: 'jason-vue-explorer',
    props: {
      /**
       *  文件数据，一维数组
       *  每一项数据如下:
       *    {
       *      // 唯一值
       *      key: [String, Number]
       *
       *      // 显示名称
       *      name: String,
       *
       *      // 类型
       *      type: Array[folder/docx/excel/image/mp3/pdf/ppt/txt/video/zip/none]
       *
       *      // 额外数据
       *      data: Object
       *    }
       **/
      dataArr: {
        type: Array,
        default () {
          return []
        }
      },

      // 选中的项
      selectedArr: {
        type: Array,
        default () {
          return []
        }
      },

      /**
       *  显示模式
       *  normal - 正常模式
       *  table  - 表格模式
       **/
      mode: {
        type: String,
        default: 'normal'
      },

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
      otherColumnArr: {
        type: Array
      },

      /**
       *  ! 未实现
       *  对于每一项的单独操作
       *  表现形式：
       *    normal 模式为右键项弹出选择框
       *    table  模式为最后一列会有操作按钮
       *  [
       *    {
       *      label: String（显示的名字）
       *      handler: Function（处理函数，参数为当前项）
       *    }
       *  ]
       **/
      actionArr: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        // 各个类型的图标数据
        typeIconMap: {
          docx: require('./images/icon-docx.png'),
          excel: require('./images/icon-excel.png'),
          folder: require('./images/icon-folder.png'),
          image: require('./images/icon-image.png'),
          mp3: require('./images/icon-mp3.png'),
          none: require('./images/icon-none.png'),
          pdf: require('./images/icon-pdf.png'),
          ppt: require('./images/icon-ppt.png'),
          txt: require('./images/icon-txt.png'),
          video: require('./images/icon-video.png'),
          zip: require('./images/icon-zip.png')
        }
      }
    },
    computed: {
      selectedKeyArr () {
        let result = []
        this.selectedArr.forEach(item => {
          result.push(item.key)
        })
        return result
      }
    },
    methods: {
      // 点击文件或者文件夹
      clickItem (item) {
        this.$emit(
          item.type === 'folder' ?
            'clickFolder' :
            'clickFile',
          item
        )
      },

      // normal 模式切换选中状态
      normalToggleSelected (item) {
        let arr = [ ...this.selectedArr ]
        let i = -1

        for (let j = 0; j < arr.length; j++) {
          if (arr[ j ].key === item.key) {
            i = j
            break
          }
        }

        if (i === -1) {
          arr.push(item)
        }
        else {
          arr.splice(i, 1)
        }

        this.$emit('update:selectedArr', arr)
      },

      // table 模式切换选中状态（el-table 自带全选功能）
      tableToggleSelected (arr) {
        this.$emit('update:selectedArr', [ ...arr ])
      },

      // 根据 prop selectedArr 同步 el-table 的选中状态
      syncElTableSelectedArr (newSelectedArr) {
        this.$refs.table.clearSelection()

        newSelectedArr.forEach(item => {
          this.$refs.table.toggleRowSelection(item)
        })
      }
    },
    components: {
      [ Table.name ]: Table,
      [ TableColumn.name ]: TableColumn,
      [ Button.name ]: Button
    },
    watch: {
      selectedArr: {
        immediate: true,
        handler (newArr, oldArr) {
          if (this.mode !== 'table' || JSON.stringify(newArr) === JSON.stringify(oldArr)) {
            return null
          }
          else if (this.$refs.table) {
            this.syncElTableSelectedArr(newArr)
          }
          else {
            this.$nextTick(() => {
              this.syncElTableSelectedArr(newArr)
            }, 20)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .explorer {
    color: #000;
    box-sizing: border-box;
    font-size: 14px;
    &-normal {
      display: flex;
      flex-wrap: wrap;
      &-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100px;
        border-radius: 5px;
        cursor: pointer;

        &-selected {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 5;
          padding: 5px;
          color: #4b4b4b;
          opacity: 0;
          cursor: pointer;
          width: 18px;
        }
        &-icon {
          display: block;
        }
        &-name {
          color: #8e8c8c;
          margin: 10px 0 0 0;
        }

        // 鼠标移入状态
        &, &-selected {
          transition: all .15s;
        }
        &:hover {
          background-color: rgba(#000, 0.05);
        }
        &:hover &-selected {
          opacity: 0.4;
        }
        & &-selected:hover {
          opacity: 0.7;
        }

        // 选中时的状态
        &.active &-selected {
          color: #409EFF;
          opacity: 1;
        }
      }
    }
    &-table {
      font-size: inherit;
      &-name {
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 30px;
          margin-right: 12px;
        }
      }
      td, th {
        padding: 14px;
        transition: all .15s;
      }
      th {
        text-align: left;
        font-size: 14px;
        font-weight: bold;
        color: #909399;
      }
      th, td {
        border: 1px solid #e6e6e6;
      }
      td:nth-child(2):hover {
        cursor: pointer;
        background-color: rgba(#000, 0.08);
      }
    }
  }
</style>