<template>
  <div class="panel-con">
    <div class="panel-header">
      <div class="title">项目成员</div> <a @click="closeBox" href="javascript:" class="close-handler"><i class="el-icon-close"></i></a>
    </div>
    <div class="panel-content">
      <div class="panel-input">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <ul class="member-list">
        <li v-for="item in memberArr" :key="item.id">{{item.memberName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import viewFun from "@/mixins/viewFun";
export default {
  mixins: [viewFun],
  props: ["memberList"],
  data() {
    return {
      input: ""
    };
  },
  computed: {
    memberArr() {
      return this.memberList;
    }
  },
  methods: {}
};
</script>

<style lang="less">
.member-list {
  padding: 0 0 15px;
  margin-bottom: 0;
  > li {
    cursor: pointer;
    padding: 5px 12px 5px 20px;
    position: relative;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
