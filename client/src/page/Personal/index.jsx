import React from 'react'
import { Avatar, Descriptions, Button, Upload, Form, Modal, Input, Radio } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getTeacherById } from '../../api/student'
import './index.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/userSlice'

export default function Personal() {
    const { TextArea } = Input;

    const { userInfo } = useSelector(res => res.user)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [teacherInfo, setTeacherInfo] = useState({})
    useEffect(() => {
        if (!userInfo.counselorId) return
        (async () => {
            const { data } = await getTeacherById(userInfo.counselorId)
            setTeacherInfo(data)
        })()
    }, [userInfo.counselorId])

    async function handleChange(e) {
        if (e.file.status === 'done') {
            const avatar = e.file.response.data;
            dispatch(updateUser({
                userId: userInfo._id,
                newInfo: {
                    avatar
                }
            }))

        }
    }
    function handleCancel() {
        setIsModalOpen(false)
    }
    function handleOk() {
        setIsModalOpen(false)
    }
    function handleEdit() {
        setIsModalOpen(true)
    }
    function onFinish(newInfo) {
        dispatch(updateUser({
            userId: userInfo._id,
            newInfo
        }))
        handleCancel()
    }
    console.log(teacherInfo);
    return (
        <div>
            <div className="avatar">
                <Upload
                    maxCount={1}
                    showUploadList={false}
                    action="/static/upload"
                    onChange={handleChange}
                >
                    <Avatar
                        src={userInfo.avatar}
                        size={128}
                        icon={<UserOutlined />}
                        style={{
                            cursor: 'pointer'
                        }}
                    />
                </Upload>
            </div>
            <div className="baseInfo">
                <Descriptions title="基础信息" extra={(<Button type='link' style={{
                    marginRight: 48
                }} onClick={handleEdit}>编辑</Button>)}>
                    <Descriptions.Item label="登录账号">{userInfo.loginId}</Descriptions.Item>
                    <Descriptions.Item label="姓名">{userInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="性别">{userInfo.sex === 'male' ? '男' : '女'}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{userInfo.tel}</Descriptions.Item>
                    <Descriptions.Item label="微信">{userInfo.wechat}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{userInfo.mail}</Descriptions.Item>
                    <Descriptions.Item label="个人简介">{userInfo.intro}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="班级信息" style={{ marginTop: '32px' }}>
                    <Descriptions.Item label="专业">{userInfo.majorName}</Descriptions.Item>
                    <Descriptions.Item label="班级">{userInfo.className}</Descriptions.Item>
                    <Descriptions.Item label="辅导员">{userInfo.teacherName}</Descriptions.Item>
                    <Descriptions.Item label="辅导员联系方式">{teacherInfo.tel}</Descriptions.Item>
                    <Descriptions.Item label="辅导员微信">{teacherInfo?.wechat}</Descriptions.Item>
                    <Descriptions.Item label="辅导员邮箱">{teacherInfo?.mail}</Descriptions.Item>
                </Descriptions>
            </div>
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
                    initialValues={
                        {
                            ...userInfo
                        }
                    }
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input placeholder='请输入姓名' />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[{ required: true, message: '请选择性别' }]}
                    >
                        <Radio.Group>
                            <Radio value='female'>女</Radio>
                            <Radio value='male'>男</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="联系方式"
                        name="tel"
                    >
                        <Input placeholder='请输入联系方式' />
                    </Form.Item>
                    <Form.Item
                        label="微信"
                        name="wechat"
                    >
                        <Input placeholder='请输入微信号码' />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="mail"
                        rules={[{
                            validator: function (_, mail) {
                                if (!mail) return Promise.resolve()
                                if (!/.+@.+\.com/.test(mail)) {
                                    return Promise.reject()
                                }
                                return Promise.resolve()
                            },
                            message: '请输入正确的邮箱格式'
                        }]}
                    >
                        <Input placeholder='请输入邮箱' />
                    </Form.Item>
                    <Form.Item
                        label="个人介绍"
                        name="intro"
                    >
                        <TextArea placeholder='请输入个人简介' />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{
                            marginRight: '24px',
                            marginTop: '24px'
                        }}>
                            编辑
                        </Button>
                        <Button type="default" htmlType="button" onClick={handleCancel}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
