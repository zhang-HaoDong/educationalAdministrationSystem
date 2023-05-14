import React from 'react'
import { Form, Input, Select, DatePicker, Button, message, Image, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { addAsk } from '../../api/askforleave'
import { PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function AddAskForLeave() {
    const { userInfo } = useSelector(state => state.user)
    const [attachment, setAttachment] = useState('')
    async function handleFinish(formData) {
        const newData = {
            ...formData,
            begin: formData.begin.format('YYYY-MM-DD'),
            end: formData.end.format('YYYY-MM-DD'),
            stuId: userInfo._id,
            tecId: userInfo.counselorId
        }
        const { data } = await addAsk(newData)
        if (data) {
            message.success('新增成功')
            return
        }
    }
    function handleChange(e) {
        if (e.file.status === 'done') {
            const data = e.file.response.data;
            setAttachment(data)
        }
    }
    return (

        <Form
            name="addAskForLeave"
            labelCol={{ flex: '150px' }}
            labelAlign="right"
            labelWrap
            wrapperCol={{ flex: 1 }}
            style={{
                maxWidth: 500,
            }}
            onFinish={e => handleFinish(e)}
        >
            <Form.Item label="请假类型" name="typeOfLeave" rules={[{ required: true }]}>
                <Select options={
                    [
                        {
                            label: '事假',
                            value: 'shijia'
                        },
                        {
                            label: '病假',
                            value: 'bingjia'
                        }
                    ]
                } />
            </Form.Item>
            <Form.Item label="联系电话" name="tel" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="请假原因" name="reason" rules={[{ required: true }]}>
                <TextArea />
            </Form.Item>
            <Form.Item label="起始时间" name="begin" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="截止时间" name="end" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="紧急联系人" name="emergencyContact" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="紧急联系人电话" name="emergencyTel" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            {attachment ?
                <Form.Item
                    label='附件'
                >
                    <Image
                        src={attachment}
                        width={150}
                    />
                </Form.Item> :
                null
            }
            <Form.Item
                label='上传附件'
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
                        <p>上传附件</p>
                    </div>
                </Upload>
            </Form.Item>
            <Form.Item label="">
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>

    )
}
