import { useRef, useEffect, useState } from 'react'
import { useNavigate } from '@umijs/max'
import { Form, Input, Button, Space, Image, Upload, Radio, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { isExist } from '../../../services/student'
import { getAllTeacher } from '../../../services/teacher'
import { getAllMajor } from '../../../services/major'
import { getClassByMajorId } from '../../../services/class'
export default function FormControll({ type, onsubmit, userInfo, updateUserinfo }) {
    const navigate = useNavigate()
    const formRef = useRef();

    const [teachersInfo, setTeachersInfo] = useState([])
    const [majorsInfo, setMajorsInfo] = useState([])
    const [classInfo, setClassInfo] = useState([])

    useEffect(() => {
        (async () => {
            const teachers = await getAllTeacher();
            setTeachersInfo(teachers.data);
        })();
        (async () => {
            const majors = await getAllMajor();
            setMajorsInfo(majors.data);
        })()
    }, [])

    useEffect(() => {
        formRef.current.setFieldsValue(userInfo)
    }, [userInfo])

    useEffect(() => {
        (async () => {
            if (userInfo.majorId) {
                const { data } = await getClassByMajorId(userInfo.majorId)
                if (data) {
                    setClassInfo(data)
                }
            }
        })()
    }, [userInfo.majorId])

    // 更新用户数据
    function updateInfo(val, key) {
        const newUserInfo = { ...userInfo };
        newUserInfo[key] = val;
        updateUserinfo(newUserInfo)
    }
    //表单提交
    function onFinish() {
        onsubmit()
    }
    // 验证loginId是否存在
    async function checkLoginIdIsExist() {
        const { data } = await isExist({ loginId: userInfo.loginId });
        if (data) {
            return Promise.reject('该用户已存在')
        }
    }
    // 用户头像上传操作
    function handleChange(e) {
        if (e.file.status === 'done') {
            const data = e.file.response.data;
            updateInfo(data, 'avatar')
        }
    }
    // 取消操作
    function cancelHandle() {
        navigate('/student/list')
    }

    let teacherOptions = teachersInfo.map(item => ({
        value: item._id,
        label: item.name
    }))
    let majorOptions = majorsInfo.map(item => ({
        value: item._id,
        label: item.majorName
    }))
    let classOptions = classInfo.map(item => ({
        value: item._id,
        label: item.className
    }))
    return (
        <>
            <Form
                onFinish={onFinish}
                name='studentFrom'
                initialValues={userInfo}
                labelAlign='right'
                ref={formRef}
                labelCol={
                    {
                        span: 5,
                        offset: 0
                    }
                }
            >
                {/* 用户账号 */}
                <Form.Item
                    label='登陆账号'
                    name='loginId'
                    rules={
                        type === 'add' ?
                            [
                                {
                                    required: true,
                                    message: '请输入用户账号'
                                },
                                {
                                    validator: checkLoginIdIsExist
                                },
                                {
                                    min: 6,
                                    message: '最小长度为6'
                                }
                            ] : null
                    }
                    validateTrigger='onBlur'
                >
                    <Input
                        placeholder='请输入注册的用户账号'
                        disabled={type === 'edit' ? true : false}
                        value={userInfo?.loginId}
                        onChange={(e) => updateInfo(e.target.value, 'loginId')}
                    />
                </Form.Item>

                {/* 管理员密码 */}
                <Form.Item
                    label='登陆密码'
                    name='loginPwd'
                    rules={type === 'edit' ? [{
                        required: true,
                        message: '请输入管理员密码'
                    }] : []}
                >
                    <Input.Password
                        placeholder='请输入注册的用户密码'
                        value={userInfo?.loginPwd}
                        onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
                    />

                </Form.Item>

                {/* 昵称 */}
                <Form.Item
                    label='姓名'
                    name='name'
                    rules={[{
                        required: true,
                        message: '请输入用户昵称'
                    }]}
                >
                    <Input
                        placeholder='请输入用户名称'
                        value={userInfo.nickname}
                        onChange={e => updateInfo(e.target.value, 'name')}
                    />

                </Form.Item>

                {/* 性别 */}
                <Form.Item
                    label='性别'
                    name='sex'
                    rules={[{
                        required: true,
                        message: '请选择性别'
                    }]}
                >
                    <Radio.Group onChange={e => updateInfo(e.target.value, 'sex')} value={userInfo.sex}>
                        <Radio value={'male'}>男</Radio>
                        <Radio value={'female'}>女</Radio>
                    </Radio.Group>

                </Form.Item>


                {/* 联系方式 */}
                <Form.Item
                    label='联系方式'
                    name='tel'
                >
                    <Input
                        placeholder='请留下您的联系方式'
                        value={userInfo.tel}
                        onChange={e => updateInfo(e.target.value, 'tel')}
                    />

                </Form.Item>

                {/* 辅导员 */}
                <Form.Item
                    label='辅导员'
                    name='counselorId'
                    rules={[{
                        required: true,
                        message: '请选择辅导员'
                    }]}
                >
                    <Select
                        // defaultValue="lucy" 做默认选择当前用户
                        placeholder="请选择的教师"
                        style={{
                            width: 120,
                        }}
                        onChange={e => updateInfo(e, 'counselorId')}
                        options={teacherOptions}
                    />

                </Form.Item>

                {/* 专业 */}
                <Form.Item
                    label='专业'
                    name='majorId'
                    rules={[{
                        required: true,
                        message: '请选择专业'
                    }]}
                >
                    <Select
                        // defaultValue="lucy" 做默认选择当前用户
                        placeholder="请选择专业"
                        style={{
                            width: 240,
                        }}
                        onChange={e => updateInfo(e, 'majorId')}
                        options={majorOptions}
                    />

                </Form.Item>

                {/* 班级 */}
                <Form.Item
                    label='班级'
                    name='classId'
                    rules={[{
                        required: true,
                        message: '请选择班级'
                    }]}
                >
                    <Select
                        // defaultValue="lucy" 做默认选择当前用户
                        placeholder="请选择班级"
                        style={{
                            width: 240,
                        }}
                        onChange={e => updateInfo(e, 'classId')}
                        options={classOptions}
                    />

                </Form.Item>


                {/* 当前用户头像 */}
                {userInfo.avatar ?
                    <Form.Item
                        label='当前用户头像'
                    >
                        <Image
                            src={userInfo.avatar}
                            width={150}
                        />
                    </Form.Item> :
                    null
                }

                {/* 上传用户头像 */}
                <Form.Item
                    label='用户头像'
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        showUploadList={false}
                        action="/static/upload"
                        onChange={handleChange}
                    >
                        <div>
                            <PlusOutlined />
                            <p>上传头像</p>
                        </div>
                    </Upload>
                </Form.Item>

                {/* 邮箱 */}
                <Form.Item
                    label='邮箱'
                    name='mail'
                >
                    <Input
                        placeholder='请输入你的邮箱'
                        value={userInfo.mail}
                        onChange={e => updateInfo(e.target.value, 'mail')}
                    />

                </Form.Item>
                {/* 微信 */}
                <Form.Item
                    label='微信'
                    name='wechat'
                >
                    <Input
                        placeholder='请输入你的微信'
                        value={userInfo.wechat}
                        onChange={e => updateInfo(e.target.value, 'wechat')}
                    />

                </Form.Item>

                {/* 自我介绍 */}
                <Form.Item
                    label='自我介绍'
                    name='intro'
                >
                    <Input.TextArea
                        placeholder='自我介绍(选填)'
                        value={userInfo.intro}
                        onChange={e => updateInfo(e.target.value, 'intro')}
                    />

                </Form.Item>

                {/* 按钮 */}
                <Form.Item
                    style={{
                        marginLeft: 348
                    }}
                >
                    <Space wrap size='large'>
                        <Button htmlType='submit' type="primary">
                            {type === 'add' ? '添加' : '修改'}
                        </Button>
                        <Button htmlType='button' type="default" onClick={cancelHandle}>
                            取消
                        </Button>
                    </Space>
                </Form.Item>
            </Form >
        </>
    )
}