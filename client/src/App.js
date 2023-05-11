import {
  HomeOutlined,
  FormOutlined,
  EditOutlined,
  CoffeeOutlined,
  ProjectOutlined,
  TableOutlined
} from '@ant-design/icons';
import { whoami } from './api/student'
import { Layout, Menu } from 'antd';
import RouteConfig from './router/routerConfig';
import { useState } from 'react'
import './app.css'
import { NavLink } from 'react-router-dom'
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import { changeLoginStatus, initUserInfo } from './redux/userSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      const res = await whoami()
      if (!res.data) {
        // token 已过期
        localStorage.removeItem('token')
        return
      }
      dispatch(initUserInfo(res.data))
      dispatch(changeLoginStatus(true))
    })()
  }, [dispatch])

  const items = [
    {
      key: '1',
      icon: <CoffeeOutlined />,
      label: <NavLink to='/notice'>新闻推送</NavLink>,
    },
    {
      key: '2',
      icon: <HomeOutlined />,
      label: <NavLink to='/home'>信息面板</NavLink>,
    },
    {
      key: '3',
      icon: <FormOutlined />,
      label: <NavLink to='/askforleave'>请销假</NavLink>,
    },
    {
      key: '4',
      icon: <EditOutlined />,
      label: <NavLink to='/evaluation'>评教</NavLink>,
    },
    {
      key: '5',
      icon: <ProjectOutlined />,
      label: <NavLink to='/score'>成绩查询</NavLink>,
    },
    {
      key: '6',
      icon: <TableOutlined />,
      label: <NavLink to='/classschedule'>课表查询</NavLink>,
    },
  ]

  function handleCancel() {
    setIsModalOpen(false)
  }
  function handleOpen() {
    setIsModalOpen(true)
  }
  return (
    <>
      <Layout className='layout'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: '0 100px 0 0',
              background: '',
            }}
          >
            <Navbar
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              handleOpen={handleOpen}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: '',
            }}
          >
            <RouteConfig />
          </Content>
        </Layout>
      </Layout>
      <LoginForm isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </>
  );
}

export default App;
