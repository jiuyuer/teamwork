<template>
  <div class="top">
      <a class="logo" @click="linkIndex">{{name}}</a>
      <a class="test" @click="linkTest">{{test}}</a>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      name: "TeamWork",
      test: "test"
    };
  },
  methods: {
    linkIndex() {
        this.$router.push({
            path: "/"
        });
    },
    linkTest() {
        this.$router.push({
            path: "/test"
        });
    }
  }
};
</script>
<style lang="less">
@import "../../static/global.less";
@height: 40px;
.top {
  padding: 0 20px;
  height: @height;
  line-height: @height;
  background-color: #333;
  a {
    cursor: pointer;
    color: #fff;
  }
  .logo {
    font-size: @f-20;
  }
  .test {
    float: right;
    font-size: @f-16;
  }
}
</style>

