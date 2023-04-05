import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '教师',
      path: '/teacher',
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
      name: '班级',
      path: '/class',
      component: './Class'
    },
    {
      name: '成绩',
      path: '/scoreentry',
      routes: [
        {
          name: '成绩列表',
          path: 'list',
          component: './ScoreEntry'
        },
        {
          name: '成绩录入',
          path: 'entry',
          component: './ScoreEntry/Entry'
        }
      ]
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
      name: '请销假',
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
        }
      ]
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