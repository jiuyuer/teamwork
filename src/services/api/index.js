const serviceModule = {
  getProjects: {
    url: '/sdpm/api/projects',
    method: 'get'
  },
  getProgress:{
    url:'/sdpm/api/projects/progresses',
    method: 'get'
  },
  getPage:{
    url:'/sdpm/api/projects/progresses/page',
    method: 'get'
  },
  getMembers:{
    url:'/sdpm/api/project/members',
    method: 'get'
  }
}
const apiSetting = { ...serviceModule }

export default apiSetting