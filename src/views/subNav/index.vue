<template>
    <div class="menu-view">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{projectCurrent.projectName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width:220px;">
          <el-dropdown-item v-for="item in projectArr" :key="item.id" @click.native="linkToProject(item)">
            {{item.projectName}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="nav-menu-right" @click="toggleMemberBox($event)">
        <a data-index="0" href="javascript:">成员 {{members.length}}</a>
        <a data-index="1" href="javascript:">视图</a>
        <a data-index="2" href="javascript:">菜单</a>
      </div>
      <div class="nav-menu-panel">
        <memberBox v-show="planelShow[0]" :memberList="members" :closeOtherBox.sync="withFullBox"></memberBox>
        <filterBox v-show="planelShow[1]" :closeOtherBox.sync="withFullBox"></filterBox>
        <menuBox v-show="planelShow[2]" :closeOtherBox.sync="withFullBox"></menuBox>
      </div>
    </div>
</template>

<script>
import http from "@/services/xhr";
import apiSetting from "@/services/api";
import memberBox from "@/views/subNav/_components/memberBox";
import filterBox from "@/views/subNav/_components/filterBox";
import menuBox from "@/views/subNav/_components/menuBox";

export default {
  data() {
    return {
      projectCurrent: {},
      members: [],
      planelShow: [false, false, false],
      planelVal: "",
      withFullBox: false
    };
  },
  computed: {
    projectArr() {
      return (this.$store.state.projectList =
        this.$store.state.projectList.length == 0
          ? JSON.parse(window.localStorage.getItem("projects"))
          : this.$store.state.projectList);
    }
  },
  watch: {
    withFullBox() {
      this.$emit("update:closeBox", this.withFullBox);
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
    linkToProject(item) {
      this.$router.push({
        path: "/project/" + item.projectId
      });
    },
    toggleMemberBox(event) {
      let val = event.target.getAttribute("data-index");
      this.planelShow.forEach((item, index, array) => {
        array.splice(index, 1, false);
      });
      this.withFullBox = this.planelVal == val ? false : true;
      this.planelVal = this.planelVal == val ? '' : val;
      this.planelShow.splice(val, 1, this.withFullBox);
    }
  },
  components: {
    memberBox,
    filterBox,
    menuBox
  }
};
</script>


<style lang="less">
@import "../../../static/global.less";
@height: 32px;
.menu-view {
  position: relative;
  padding: 0 10px;
  height: @height;
  line-height: @height;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-size: @f-14;
  .el-dropdown-link {
    float: left;
    user-select: none;
    cursor: pointer;
  }
  .nav-menu-right {
    float: right;
    height: @height;
    line-height: @height;
    padding: 0;
    margin: 0;
    list-style: none;
    a {
      float: left;
      font-size: @f-12;
      text-decoration: none;
      color: #5a5e66;
      position: relative;
      padding: 0 10px;
      margin: 0 5px;
      text-align: center;
      &:after {
        position: absolute;
        content: "";
        right: -7px;
        top: 6px;
        height: 18px;
        width: 1px;
        background-color: #a6a6a6;
      }
      &:last-child {
        &:after {
          content: none;
        }
      }
    }
  }
  .nav-menu-panel {
    position: fixed;
    width: 300px;
    top: 72px;
    right: 0px;
    bottom: 0;
    z-index: 50;
    background-color: #fff;
    box-shadow: -3px 0 3px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translate3d(300px, 0px, 0px);
    transition: 0.25s cubic-bezier(0, 1, 0.39, 1);
    .panel-con {
      position: relative;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      .panel-header {
        position: relative;
        overflow: hidden;
        height: 50px;
        line-height: 50px;
        text-align: center;
        z-index: 2;
        font-size: 16px;
        .title {
          padding: 0 15px;
          color: #383838;
          font-size: 15px;
          font-weight: 700;
          z-index: 1;
        }
        .close-handler {
          position: absolute;
          font-weight: normal;
          top: 0;
          right: 0;
          width: 50px;
          z-index: 2;
        }
        &:after {
          position: absolute;
          content: " ";
          bottom: 0;
          height: 1px;
          left: 15px;
          right: 15px;
          background-color: #e5e5e5;
        }
      }
      .panel-content {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 1;
        .panel-input {
          margin: 15px;
        }
      }
    }
  }
}
</style>