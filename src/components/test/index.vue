<template>
  <div style="padding:40px 20px;">
    <!-- <div style="margin-bottom:40px;">
      <memberSel></memberSel>
    </div> -->
    <div style="margin-bottom:40px;">
      <elForm></elForm>
    </div>
  </div>
</template>
<script>
import memberSel from "@/components/test/_components/memberSel";
import elForm from "@/components/test/_components/form.vue";

export default {
  name: "Test",
  data() {
    return {};
  },
  methods: {},
  components: {
    memberSel,
    elForm
  }
};
</script>