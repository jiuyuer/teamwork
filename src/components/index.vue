<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in projectArr" :key="item.index">
        <el-card>
          <div class="title">
            <a href="javascript:" @click="linkToProject(item)">{{item.projectName}}</a>
          </div>
          <div class="bottom clearfix">
            <time class="time">{{item.projectCreateTime | dateTimeFormatter('YYYY-MM-DD')}}</time>
          </div>
          <div class="operate">
            <el-button type="text" class="button" title="修改" @click="editProject(item)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="text" class="button" title="删除" @click="deleteProject(index)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :style="{'text-align':'center'}">
          <el-button title="添加" @click="dialogVisible = true">
            <i class="el-icon-plus"></i>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-form ref="form" :model="formProject" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="formProject.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureProject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from '@/services/xhr';
import apiSetting from '@/services/api';

export default {
  name: 'Portal',
  data() {
    return {
      dialogIsEdit: false,
      dialogVisible: false,
      formProject: {
        name: ''
      }
    };
  },
  computed: {
    projectArr() {
      return this.$store.state.projectList;
    }
  },
  mounted() {
    http(apiSetting.getProjects, { aaa: 'sss' }).then(
      res => {
        this.$store.commit('loadProject', res.data.data);
        window.localStorage.setItem('projects', JSON.stringify(res.data.data));
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    linkToProject(item) {
      this.$router.push({
        path: '/project/' + item.projectId
      });
    },
    deleteProject(index) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.$store.state.projectList.splice(index, 1);
          window.localStorage.setItem(
            'projects',
            JSON.stringify(this.$store.state.projectList)
          );
        })
        .catch(_ => {});
    },
    editProject(item) {
      this.formProject.name = item.projectName;
      this.formProject.id = item.projectId;
      this.dialogIsEdit = true;
      this.dialogVisible = true;
    },
    sureProject() {
      let obj = {
        projectName: this.formProject.name,
        projectId: this.formProject.id
      };
      let len = this.$store.state.projectList.findIndex(item => {
        return item.projectId == obj.projectId;
      });
      if (this.dialogIsEdit) {
        this.$store.state.projectList.splice(len, 1, obj);
        window.localStorage.setItem(
          'projects',
          JSON.stringify(this.$store.state.projectList)
        );
      } else {
        obj.projectId = (Math.random() * 1000000).toFixed();
        this.$store.state.projectList.push(obj);
        window.localStorage.setItem(
          'projects',
          JSON.stringify(this.$store.state.projectList)
        );
      }
      this.dialogIsEdit = false;
      this.dialogVisible = false;
      this.formProject.name = '';
    }
  }
};
</script>

<style lang="less">
@import '../../static/global.less';
.content {
  padding: 20px;
  .el-row {
    .el-col {
      margin-bottom: 20px;
      border-radius: 4px;
      .el-card__body {
        position: relative;
        .title {
          font-size: @f-18;
          margin-bottom: 10px;
          a {
            text-decoration: none;
          }
        }
        .time {
          font-size: @f-12;
        }
        .operate {
          display: none;
          position: absolute;
          right: 12px;
          top: 0px;
        }
      }
      &:hover {
        .operate {
          display: block;
        }
      }
    }
  }
}
</style>