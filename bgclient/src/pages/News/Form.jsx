import { useRef, useEffect, useState } from 'react'
import { useNavigate } from '@umijs/max'
import { Form, Input, Image, Upload, Button, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
export default function BookForm({ type, newsInfo, setNesInfo, onsubmit }) {
    const formRef = useRef();
    const editorRef = useRef();
    const navigate = useNavigate();
    //用于判断是否是第一次回填
    const [isFirst, setIsFirst] = useState(true)
    useEffect(() => {
        // 编辑时的数据回填
        if (type === 'edit' && formRef.current && isFirst && Object.getOwnPropertyNames(newsInfo).length !== 0) {
            formRef.current.setFieldsValue(newsInfo);
            editorRef.current.getInstance().setHTML(newsInfo.bookIntro)
            setIsFirst(false)
        }
        if (type === 'edit' && formRef.current) {
            formRef.current.setFieldsValue(newsInfo);
        }
    }, [newsInfo])
    // 更新新增新闻信息函数
    function updateBookInfo(val, key) {
        const newNewsInfo = { ...newsInfo }
        newNewsInfo[key] = val;
        setNesInfo(newNewsInfo)
    }
    // 上传封面
    function handleChange(e) {
        if (e.file.status === 'done') {
            const { data } = e.file.response;
            updateBookInfo(data, 'cover')
        }
    }
    // 取消新增
    function cancelHandle() {
        // 跳转到新闻列表
        navigate('/news/list')
    }
    // 提交新增
    function onFinish() {
        //获取editor数据
        const editorVal = editorRef.current.getInstance().getHTML();
        if (editorVal === '<p><br></p>') {
            message.error('请填写新闻介绍');
            return;
        }
        onsubmit(editorVal)
    }
    return (
        <Form
            name='newsform'
            onFinish={onFinish}
            initialValues={newsInfo}
            labelAlign='right'
            ref={formRef}
            labelCol={
                {
                    span: 5,
                    offset: 0
                }
            }
        >
            {/* 标题 */}
            <Form.Item
                name='newsTitle'
                label='新闻标题'
                rules={[{
                    required: true,
                    message: '未填写新闻标题'
                }]}
            >
                <Input
                    placeholder='请填写新闻标题'
                    value={newsInfo.newsTitle}
                    onChange={(e) => updateBookInfo(e.target.value, 'newsTitle')}
                />
            </Form.Item>

            {/* 新闻封面 */}
            <Form.Item
                label='封面'
            >
                {newsInfo.cover ?
                    <Image
                        src={newsInfo.cover}
                        width={250}
                    /> : null}
            </Form.Item>

            {/* 上传封面 */}
            <Form.Item
                label='上传封面'
            >
                <Upload
                    listType="picture-card"
                    maxCount={1}
                    showUploadList={false}
                    action="/api/upload"
                    onChange={handleChange}
                >
                    <div>
                        <PlusOutlined />
                        <p>上传封面</p>
                    </div>
                </Upload>
            </Form.Item>

            {/* 新闻内容 */}
            <Form.Item
                label='新闻内容'
            >
                <Editor
                    initialValue=""
                    previewStyle="tab"
                    height="600px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    ref={editorRef}
                />
            </Form.Item>

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
        </Form>
    )
}