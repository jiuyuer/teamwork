<template>
    <div class="content">
        <ul>
          <li v-for="item in projectArr" :key="item.id">
            <!-- <img src="http://wx3.sinaimg.cn/mw690/6d794e8ely1fl7j4qgbyrj20m80xcwkp.jpg"/> -->
            <a href="javascript:" @click="linkToDetail(item)">{{item.projectName}}</a>
            <p>{{item.projectCreateTime | dateTimeFormatter('YYYY-MM-DD HH:mm:ss')}}</p>
          </li>
        </ul>
        <memberSel></memberSel>
    </div>
</template>

<script>
import memberSel from "@/views/subNav/_components/memberSel";
import http from "@/services/xhr";
import apiSetting from "@/services/api";

export default {
  name: "Portal",
  data() {
    return {};
  },
  computed: {
    projectArr() {
      return this.$store.state.projectList;
    }
  },
  mounted() {
    http(apiSetting.getProjects).then(
      res => {
        this.$store.commit("loadProject", res.data.data);
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    linkToDetail(item) {
      this.$router.push({
        path: "/project/" + item.projectId
      });
    }
  },
  components: {
    memberSel: memberSel
  }
};
</script>