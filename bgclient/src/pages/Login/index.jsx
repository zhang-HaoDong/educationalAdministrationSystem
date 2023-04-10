import { useState } from 'react'
import styles from './index.module.css'
import { Form, Button, Checkbox, Row, Col, Input, message } from 'antd'
import { UserOutlined, LockOutlined, BarcodeOutlined } from '@ant-design/icons'
import { login } from '../../services/teacher'
export default function Login() {
    const [loginInfo, setLoginInfo] = useState({
        loginId: '',
        loginPwd: '',
    })
    // 完成时操作
    async function onFinish() {
        const { data } = await login(loginInfo);
        if (!data) {
            message.error('用户名或密码错误');
            return;
        }
        //用户冻结 无token
        if (!data.enabled) {
            message.warning('该用户已冻结,请联系超级管理员');
            return;
        }
        //成功登陆
        localStorage.setItem('token', data.token);
        message.success('登陆成功');
        location.href = '/'
    }

    //更新数据
    function updateInfo(val, key) {
        const newInfo = { ...loginInfo }
        newInfo[key] = val;
        setLoginInfo(newInfo)
    }
    return (
        <div
            style={{ height: '100%' }}
        >
            {/* 登陆表单 */}
            <div className={styles.container}>
                <h2>教务系统管理系统</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={loginInfo}
                    onFinish={onFinish}
                >
                    {/* 输入账号 */}
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(e.target.value, 'loginId')}
                        />
                    </Form.Item>

                    {/* 输入密码 */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.loginBtn}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}