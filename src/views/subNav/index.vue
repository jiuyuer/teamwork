<template>
    <div class="menu-view">
        <span class="project-name" @click="showProjectList">{{projectCurrent.projectName}}</span>
        <div class="project-list" v-show="isShowBox">
            <ul>
                <li v-for="item in projectArr" :key="item.id">{{item.projectName}}</li>
            </ul>
        </div>
        <span class="project-member">成员 {{members.length}}</span>
    </div>
</template>

<script>
import http from "@/services/xhr";
import apiSetting from "@/services/api";

export default {
  data() {
    return {
      projectCurrent: {},
      members: [],
      isShowBox: false
    };
  },
  computed: {
    projectArr() {
      return this.$store.state.projectList;
    }
  },
  mounted() {
    http(apiSetting.getMembers).then(
      res => {
        this.members = res.data.data.members;
      },
      error => {}
    );
    this.$store.state.projectList.forEach(item => {
      if (this.$route.params.id === item.projectId) {
        this.projectCurrent = item;
      }
    });
  },
  methods: {
    showProjectList() {
      this.isShowBox = this.isShowBox ? false : true;
    }
  }
};
</script>


<style lang="less">
@import "../../../static/global.less";
@height: 32px;
.menu-view {
  position: relative;
  padding: 0 20px;
  height: @height;
  line-height: @height;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  .project-name {
    float: left;
    user-select: none;
    cursor: pointer;
  }
  .project-list {
    width: 200px;
    position: absolute;
    top: 34px;
    left: 0;
    background: #f5f5f5;
    z-index: 10;
  }
  .project-member {
    font-size: @f-12;
    float: right;
  }
}
</style>