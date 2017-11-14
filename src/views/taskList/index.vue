<template>
    <div id="project-content">
        <ul class="task-group-warp">
            <li v-for="item in progress.data" :key="item.id">
                <header class="scrum-stage-header">
                    <span class="progress-name"><span>{{item.progressName}}</span></span>
                </header>
                <div class="scrum-stage-wrap">
                    <section class="scrum-stage-content thin-scroll">
                        <ul class="task-list task-order-list">
                            <li v-for="task in item.taskData" :key="task.id">{{task.taskContent}}</li>
                        </ul>
                    </section>
                </div>
            </li>
            <li class="task-list-con">
                <a class="task-list-btn" @click="showPop" v-show="!progressPop"><i class="el-icon-plus"></i>新建任务列表</a>
                <div class="task-list-box" v-show="progressPop">
                    <el-input v-model.trim="progressName" @keyup.enter="savePop" placeholder="请输入内容"></el-input>
                    <div class="buttons">
                        <el-button @click="closePop" size="small">取消</el-button>
                        <el-button @click="savePop" size="small" type="primary">保存</el-button>
                    </div>
                </div>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import http from "@/services/xhr";
import apiSetting from "@/services/api";

export default {
  name: "Tasklist",
  data() {
    return {
      progress: {
        data: []
      },
      progressName: "",
      progressPop: false
    };
  },
  methods: {
    showPop() {
      this.progressPop = true;
    },
    closePop() {
      this.progressPop = false;
    },
    savePop() {
      if(this.progressName == ""){
        this.$message({
          showClose:true,
          duration: 2000,
          message: '不能为空！',
          type: 'error'
        });
        return false;
      }
      let obj = {
        progressName: this.progressName
      };
      this.progress.data.push(obj);
      let $con = document.getElementById("project-content");
      let $ul = $con.childNodes[0];
      let len = $ul.childNodes.length;
      let width_li = $ul.childNodes[0].clientWidth + 10;
      this.$nextTick(() => {
        $con.scrollLeft = width_li * len;
      });
    },
    documentActive(event) {
      let $li = this.closestElement(event.target, "li");
      if ($li && $li.className == "task-list-con") {
        event.preventDefault();
        return false;
      } else {
        this.closePop();
      }
    },
    //  Element.closest() 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
    //  https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest
    closestElement(el, selector) {
      var matchesSelector =
        el.matches ||
        el.webkitMatchesSelector ||
        el.mozMatchesSelector ||
        el.msMatchesSelector;

      while (el) {
        if (matchesSelector.call(el, selector)) {
          break;
        }
        el = el.parentElement;
      }
      return el;
    }
  },
  mounted() {
    http(apiSetting.getProgress)
      .then(
        res => {
          this.progress.data = res.data.data;
          return this.progress.data;
        },
        error => {}
      )
      .then(res => {
        res.forEach((element, index, array) => {
          http(apiSetting.getPage, { id: element.progressId }).then(
            page => {
              this.$set(
                this.progress.data[index],
                "taskData",
                page.data.data.list
              );
            },
            error => {}
          );
        });
      });
    document.addEventListener("click", this.documentActive, false);
  }
};
</script>

<style lang="less">
@import "../../../static/global.less";

#project-content {
  position: fixed;
  z-index: 0;
  top: 72px;
  bottom: 0;
  overflow-y: hidden;
  background: #fff;
  left: 0;
  right: 0;
  user-select: none;
  .task-group-warp {
    height: 100%;
    white-space: nowrap;
    margin: 0px;
    padding: 10px;
    > li.task-list-con {
      height: initial;
      .task-list-btn {
        font-size: @f-14;
        color: #a6a6a6;
        cursor: pointer;
        padding: 17px 18px;
        display: block;
        i.el-icon-plus {
          margin-right: 7px;
        }
        &:hover {
          color: #66b1ff;
        }
      }
      .task-list-box {
        padding: 5px 5px 0px 5px;
        .buttons {
          padding: 8px 0;
          text-align: right;
        }
      }
    }
    > li {
      position: relative;
      width: 280px;
      height: 100%;
      margin-right: 10px;
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
      background: #eee;
      header {
        flex: 1 0 auto;
        padding: 12px;
        font-size: 16px;
        margin: 0;
        .progress-name {
          width: 90%;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .scrum-stage-wrap {
        position: relative;
        height: 100%;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        .scrum-stage-content {
          flex: 1 1 0;
          overflow: auto;
          overflow-x: visible;
          .task-list {
            padding: 0;
            > li {
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              position: relative;
              white-space: normal;
              padding: 0;
              background-color: #fff;
              border-radius: 3px;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
              cursor: pointer;
              margin: 0 8px 8px;
            }
          }
        }
      }
    }
  }
}
</style>