<template>
    <div id="project-body" :class="{'with-full':withFull}">
        <Subnavbar :closeBox.sync="withFull"></Subnavbar>
        <Tasklist></Tasklist>
    </div>
</template>

<script>
import Subnavbar from "@/views/subNav";
import Tasklist from "@/views/taskList";

export default {
  data() {
    return {
      withFull: false
    };
  },
  name: "project-view",
  components: {
    Subnavbar: Subnavbar,
    Tasklist: Tasklist
  }
};
</script>

<style lang="less">
.with-full {
  #project-content {
    right: 300px !important;
  }
  .menu-view .nav-menu-panel {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
    transition: 0.25s cubic-bezier(0, 1, 0.39, 1);
  }
}
</style>