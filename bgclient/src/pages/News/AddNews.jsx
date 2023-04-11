import { useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import Form from './Form'
import { message } from 'antd';
import { useNavigate } from '@umijs/max'
import { addNews } from '../../services/NAN'

export default function AddNews() {
    // 新增书籍的信息
    const [newsInfo, setNewsInfo] = useState({});
    const navigate = useNavigate()
    // 提交新增书籍请求
    function onsubmit(editorVal) {
        addNews({
            ...newsInfo,
            content: editorVal
        })
        message.success('添加书籍成功');
        navigate('/news/list')
    }
    return (
        <>
            <PageContainer>
                <div style={{ width: 800 }}>
                    <Form
                        type='add'
                        newsInfo={newsInfo}
                        setNewsInfo={setNewsInfo}
                        onsubmit={onsubmit}
                    />
                </div>
            </PageContainer>
        </>
    )
}