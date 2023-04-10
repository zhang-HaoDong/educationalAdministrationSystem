import { useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import Form from './Form'
import { message } from 'antd';
import { useNavigate } from '@umijs/max'
export default function AddBook() {
    // 新增书籍的信息
    const [newsInfo, setNewsInfo] = useState({});
    const navigate = useNavigate()
    // 提交新增书籍请求
    function onsubmit(editorVal) {
        addBook({
            ...newsInfo,
            content: editorVal
        })
        message.success('添加书籍成功');
        navigate('/book/booklist')
    }
    return (
        <>
            <PageContainer>
                <div style={{ width: 800 }}>
                    <Form
                        type='add'
                        bookInfo={newsInfo}
                        setBookInfo={setNewsInfo}
                        onsubmit={onsubmit}
                    />
                </div>
            </PageContainer>
        </>
    )
}