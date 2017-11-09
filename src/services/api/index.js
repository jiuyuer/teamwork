const serviceModule = {
  getProjects: {
    url: '/static/data/projects.json',
    method: 'get'
  },
  getProgress:{
    url:'/static/data/progresses.json',
    method: 'get'
  },
  getPage:{
    url:'/static/data/page.json',
    method: 'get'
  },
  getMembers:{
    url:'/static/data/members.json',
    method: 'get'
  }
}
const apiSetting = { ...serviceModule }

export default apiSetting