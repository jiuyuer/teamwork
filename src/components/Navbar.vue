
<template>
  <div class="top">
      <a class="logo" href="/">{{name}}</a>
  </div>
</template>
<script>
    export default {
        name:'navbar',
        data(){
            return {
                name: 'TeamWork'
            }
        }
    }
</script>
<style lang="less">
    @import '../../static/global.less';
    @topSize: 40px;
    .top{
        height: @topSize;
        line-height: @topSize;
        background-color: #333;
        font-size: @f-14;
        .logo{
            color:#fff;
            text-decoration: none;
        }
    }
</style>

