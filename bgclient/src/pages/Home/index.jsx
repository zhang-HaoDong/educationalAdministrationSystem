import { Image } from 'antd'
import logo from '../../assets/logo.png'
const HomePage = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image src={logo} style={
        {
          width: '128px'
        }
      }></Image>
      <span style={{
        fontSize: '48px',
        height: '48px',
        lineHeight: '48px',
      }}>欢迎使用教务管理系统后台</span>
    </div>
  );
};

export default HomePage;
