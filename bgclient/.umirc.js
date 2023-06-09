import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '教务管理系统后台',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      access: 'normalAdmin'
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      access: 'normalAdmin'
    },
    {
      name: '教师',
      path: '/teacher',
      access: 'superAdmin',
      routes: [
        {
          name: '教师列表',
          path: 'list',
          component: './Teacher'
        },
        {
          name: '添加教师',
          path: 'addteacher',
          component: './Teacher/AddTeacher'
        },
        {
          name: '修改教师',
          path: 'editteacher/:id',
          component: './Teacher/EditTeacher',
          hideInMenu: true
        }
      ]
    },
    {
      name: '学生',
      path: '/student',
      routes: [
        {
          name: '学生列表',
          path: 'list',
          component: './Student'
        },
        {
          name: '添加学生',
          path: 'addstudent',
          component: './Student/AddStudent'
        },
        {
          name: '编辑学生',
          path: 'editstudent/:id',
          component: './Student/EditStudent',
          hideInMenu: true
        }
      ]
    },
    {
      name: '专业',
      path: '/major',
      component: './Major'
    },
    {
      name: '班级',
      path: '/class',
      component: './Class'
    },
    {
      name: '课程',
      path: '/course',
      component: './Course'
    },
    {
      name: '课表',
      path: '/classschedule',
      component: './ClassSchedule'
    },
    {
      name: '成绩',
      path: '/scoreentry/list',
      component: './ScoreEntry'
    },
    {
      name: '评教',
      path: '/evaluation',
      routes: [
        {
          name: '评教列表',
          path: 'list',
          component: './Evaluation'
        },
        {
          name: '添加评教问题',
          path: 'add_evaluation',
          component: './Evaluation/AddEvaluation'
        }
      ]
    },
    {
      name: '请销假审批',
      path: '/askforleave',
      component: './AskForLeave'
    },
    {
      name: '新闻',
      path: '/news',
      routes: [
        {
          name: '新闻列表',
          path: 'list',
          component: './News'
        },
        {
          name: '新增新闻',
          path: 'add_news',
          component: './News/AddNews'
        },
        {
          name: '编辑新闻',
          path: 'edit_news/:id',
          component: './News/EditNews',
          hideInMenu: true
        },
        {
          name: '新闻详情',
          path: 'detail_news/:id',
          component: './News/NewsDetail',
          hideInMenu: true
        }
      ]
    },
    {
      path: '/login',
      component: './Login',
      menuRender: false,
    }
  ],
  npmClient: 'npm',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/upload': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    }
  }
});