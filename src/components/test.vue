<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">a</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">b</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">c</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">d</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">e</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">f</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Test"
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>