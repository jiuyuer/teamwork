<template>
  <div style="padding:40px 20px;">
    <!-- <div style="margin-bottom:40px;">
      <memberSel></memberSel>
    </div> -->
    <h2>test</h2>
    <div style="margin-bottom:40px;">
      <elForm></elForm>
    </div>
  </div>
</template>
<script>
import memberSel from "@/components/test/_components/memberSel";
import elForm from "@/components/test/_components/form.vue";
import http from "@/services/xhr";
import apiSetting from "@/services/api";

export default {
  name: "Test",
  data() {
    return {};
  },
  mounted() {
    // let xhr = this.XHR();
    // console.log(xhr);
    // xhr.open("get", apiSetting.getProjects.url);
    // xhr.onreadystatechange = function() {
    //   console.log(xhr.readyState);
    //   if (xhr.readyState === xhr.DONE) {
    //     if (xhr.status === 200) {
    //       console.log(xhr.getResponseHeader("Content-Type"));
    //       console.log("Done " + xhr.DONE);
    //       console.log(xhr.status);
    //       console.log(xhr.responseText);
    //       console.log(xhr.responseXML + " dd");
    //     } else {
    //       console.log("There was a problem with the request.");
    //     }
    //   }
    // };
    xhr.send();
  },
  methods: {
    XHR() {
      let xhr;
      try {
        xhr = new XMLHttpRequest();
      } catch (e) {
        var IEXHRVers = [
          "Msxml3.XMLHTTP",
          "Msxml2.XMLHTTP",
          "Microsoft.XMLHTTP"
        ];
        for (var i = 0, len = IEXHRVers.length; i < len; i++) {
          try {
            xhr = new ActiveXObject(IEXHRVers[i]);
          } catch (e) {
            continue;
          }
        }
      }
      return xhr;
    }
  },
  components: {
    memberSel,
    elForm
  }
};
</script>