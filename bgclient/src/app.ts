// 运行时配置
import { message } from 'antd'
import { whoami, } from './services/teacher'
// const logo = require('./assets/logo.png')
import logo from './assets/logo.png'

export async function getInitialState() {
  if (location.pathname === '/login') {
    // 强制进入login页面
    // 判断是否含有有效的token
    const token = localStorage.getItem('token');
    if (token) {
      const { data } = await whoami();
      if (data) {
        message.warning('请先退出登录')
        setTimeout(() => {
          history.go(-1)
        }, 1500);
      }
    }
  }
  else {
    //强制跳转登陆页面
    const token = localStorage.getItem('token');
    if (!token) {
      location.href = '/login'
    } else {
      const { data } = await whoami();
      if (data) {
        // token有效
        return {
          name: data.name,
          avatar: data.avatar,
          adminInfo: data,
        }
      } else {
        // token无效
        localStorage.removeItem('token');
        location.href = '/login'
      }
    }
  }
  return;
}


export const layout = () => {
  return {
    logo: logo,
    menu: {
      locale: false,
    },
    logout: () => {
      localStorage.removeItem('token');
      location.href = '/login'
    },
  };
};

export const request = {
  timeout: '3000',
  requestInterceptors: [
    // 直接写一个 function，作为拦截器
    (url, options) => {
      // do something
      const token = localStorage.getItem('token');
      if (token) {
        // 如果有token就判断token是否有效
        options.headers['Authorization'] = 'Bearer ' + token;
      }
      return { url, options }
    },
  ]
}
