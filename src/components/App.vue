<template>
  <div>
    <Navbar></Navbar>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "content",
  components: {
    Navbar: Navbar
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  }
};
</script>
