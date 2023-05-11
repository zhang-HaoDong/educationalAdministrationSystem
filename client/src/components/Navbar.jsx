import { Button } from 'antd'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import LoginAvatar from './LoginAvatar';
export default function Navbar({ setCollapsed, collapsed, handleOpen }) {
    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    color: '#fff'
                }}
            />
            <LoginAvatar handleOpen={handleOpen} />
        </div>
    )
}
