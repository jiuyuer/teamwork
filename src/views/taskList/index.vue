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
      }
    };
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
  }
};
</script>

<style lang="less">
#project-content {
  position: fixed;
  z-index: 0;
  top: 73px;
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
    > li {
      position: relative;
      width: 280px;
      height: 100%;
      margin-right: 10px;
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
      border: 1px solid #ccc;
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