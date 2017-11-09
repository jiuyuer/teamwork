<template>
  <div class="select-search">
    <div class="select-header" @click="isExpand=!isExpand">
      <input type="text" autocomplete="off" readonly :placeholder="placeholder" :value="placeholderValue" @keydown.down.prevent="selectChildWidthArrowDown" @keydown.up.prevent="selectChildWidthArrowUp" @keydown.enter="selectChildWidthEnter">
      <i class="fzicon " :class="isExpand?'fz-ad-jiantou1':'fz-ad-jiantou'"></i>
    </div>
    <div class="select-body" v-if="isExpand">
      <input type="text" placeholder="关键字" v-model="searchVal" autocomplete="off" @blur="resetDefaultStatus" @keydown.esc="resetDefaultStatus" @keydown.down.prevent="selectChildWidthArrowDown" @keydown.up.prevent="selectChildWidthArrowUp" @keydown.enter="selectChildWidthEnter">
      <transition name="el-fade-in-linear" mode="out-in">
        <div class="typeahead-filter" v-show="typeaheadData">
          <transition-group tag="ul" name="el-fade-in-linear">
            <li v-for="(item,index) in typeaheadData " :key="index" :class="item.active ? 'active':''" @mouseenter="setActiveClass(index)" @mouseleave="setActiveClass(index)" @click="selectChild(index)">
              <a href="javascript:;">
                {{item.text}}
              </a>
            </li>
          </transition-group>
          <p class="noFound" v-show="typeaheadData && typeaheadData.length === 0">未能查询到,请重新输入!</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'selectSearch',
    data: function () {
      return {
        placeholderValue: '',// 给看到选择内容的
        isExpand: false,
        searchVal: '', // 搜索关键字
        resultVal: '', // 保存搜索到的值
        searchList: [], //保存过滤的结果集
        currentIndex: -1, // 当前默认选中的index,
      }
    },
    computed: {
      typeaheadData () {
        let temp = [];
        if (this.searchVal === '') {
          return this.mapData;
        } else {
          this.currentIndex = -1;  // 重置特殊情况下的索引
          this.mapData.forEach(item => {
            item.active = false; // 取消高亮
            if (item.text.indexOf(this.searchVal.toLowerCase().trim()) !== -1) {
              temp.push(item)
            }
          })
          return temp;
        }
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '--请选择--'
      },
      mapData: {
        type: Array,
        default: function () {
          return [
            {
              text: 'wofsdf',
              value: 0
            },
            {
              text: '我是技术渣1',
              value: 1
            },
            {
              text: '我是技术渣2',
              value: 2
            },
            {
              text: '我是天坑',
              value: 3
            },
            {
              text: '我是天坑,分身乏术',
              value: 4
            },
            {
              text: '我是天坑2,分身乏术',
              value: 5
            },
            {
              text: '我是天坑3,分身乏术',
              value: 6
            }
          ]
        }
      }
    },
    methods: {
      resetDefaultStatus () {
        this.searchVal = '';
        this.resultVal = '';
        this.currentIndex = -1;
        this.typeaheadData.forEach(item => {
          this.$set(item, 'active', false);
        })
      },
      setActiveClass (index) { // 设置样式活动类
        this.mapData.forEach((item, innerIndex) => {
          if (index === innerIndex) {
            this.$set(item, 'active', true);
            this.currentIndex = index;  // 这句话是用来修正index,,就是键盘上下键的索引,不然会跳位
          } else {
            this.$set(item, 'active', false)
          }
        })
      },
      selectChildWidthArrowDown () {
        // 判断index选中子项
        if (this.currentIndex < this.typeaheadData.length) {
          this.currentIndex++;
          this.typeaheadData.forEach((item, index) => {
            this.currentIndex === index ? this.$set(item, 'active', true) : this.$set(item, 'active', false);
          })
        }
      },
      selectChildWidthArrowUp () {
        // 判断index选中子项
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.typeaheadData.forEach((item, index) => {
            this.currentIndex === index ? this.$set(item, 'active', true) : this.$set(item, 'active', false);
          })
        }
      },
      selectChildWidthEnter () {
        // 若是结果集只有一个,则默认选中
        if (this.typeaheadData.length === 1) {
          this.searchVal = this.typeaheadData[0].text;
          this.resultVal = this.typeaheadData[0].value;
          this.placeholderValue = this.typeaheadData[0].text;
          this.isExpand = false;
          this.$emit('selectValue', { text: this.searchVal, value: this.resultVal })
        } else {
          // 若是搜索的内容完全匹配到项内的内容,则默认选中
          this.typeaheadData.forEach(item => {
            if (this.searchVal === item.text || item.active === true) {
              this.searchVal = item.text;
              this.placeholderValue = item.text;
              this.resultVal = item.value;
              this.isExpand = false;
              this.$emit('selectValue', { text: this.searchVal, value: this.resultVal })
            }
          })
        }
        this.resetDefaultStatus();
      },
      selectChild (index) {
        // 鼠标点击选择子项
        this.mapData.forEach((item, innerIndex) => {
          if (index === innerIndex || item.active) {
            this.searchVal = item.text;
            this.resultVal = item.value;
            this.placeholderValue = item.text;
            this.isExpand = false;
          }
          this.$set(item, 'active', false);
        })
        this.$emit('selectValue', { text: this.searchVal, value: this.resultVal });
        this.resetDefaultStatus();
      },
    }
  }
</script>

<style scoped lang="scss">
  .el-fade-in-linear-enter-active,
  .el-fade-in-linear-leave-active,
  .fade-in-linear-enter-active,
  .fade-in-linear-leave-active {
    transition: opacity .2s linear;
  }

  .el-fade-in-enter,
  .el-fade-in-leave-active,
  .el-fade-in-linear-enter,
  .el-fade-in-linear-leave,
  .el-fade-in-linear-leave-active,
  .fade-in-linear-enter,
  .fade-in-linear-leave,
  .fade-in-linear-leave-active {
    opacity: 0;
  }


  .select-search {
    a {
      color: #333;
      text-decoration: none;
      padding: 5px;
    }
    ul {
      list-style: none;
      padding: 6px 0;
      margin: 0;
      overflow: visible;
      li {
        display: block;
        width: 100%;
        padding: 5px;
        font-size: 14px;
        padding: 8px 10px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #48576a;
        height: 36px;
        line-height: 1.5;
        box-sizing: border-box;
        cursor: pointer;
        &.active {
          background-color: #20a0ff;
          a {
            color: #fff;
          }
        }
      }
    }
    .select-header {
      position: relative;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      outline: 0;
      padding: 0 8px;
      >input {
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        outline: 0;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 36px;
        line-height: 1;
      }
      >i {
        transition: all .3s linear;
        display: inline-block;
        position: absolute;
        right: 3%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .select-body {
      z-index: 1000;
      border-radius: 2px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      box-sizing: border-box;
      margin: 5px 0;
      padding: 8px;
      >input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        display: inline-block;
      }
    }
  }
</style>