export default{
  methods: {
    // 关闭右上角tab功能
    closeBox() {
      this.$emit("update:closeOtherBox", false);
    }
  }
}
