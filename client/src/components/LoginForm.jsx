import React from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { login } from '../api/student'
import { useDispatch } from 'react-redux'
import { initUserInfo, changeLoginStatus } from '../redux/userSlice'
export default function LoginForm({ isModalOpen, handleOk, handleCancel }) {
    const dispatch = useDispatch()
    async function onFinish(info) {
        const { data, authorization } = await login(info)
        // 数据不存在
        if (!data) {
            message.error('请检查用户名或密码')
            return
        }
        // 冻结
        if (!data.enabled) {
            message.warning('该用户已被冻结，请联系老师处理')
        }
        // 登录成功
        if (data) {
            message.success('登陆成功')
            handleCancel()
            localStorage.setItem('token', authorization);
            dispatch(changeLoginStatus(true))
            dispatch(initUserInfo(data))
        }
    }
    return (
        <Modal title="登录" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered footer={null}>
            <Form
                name="basic"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                style={{
                    maxWidth: 600,
                    marginTop: 48
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="loginId"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input placeholder='请输入用户名' />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="loginPwd"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password placeholder='请输入用户密码' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{
                        marginRight: '24px',
                        marginTop: '24px'
                    }}>
                        登录
                    </Button>
                    <Button type="default" htmlType="button" onClick={handleCancel}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
