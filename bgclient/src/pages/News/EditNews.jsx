import { useEffect, useState } from 'react'
import { useParams, useNavigate } from '@umijs/max'
import { PageContainer } from '@ant-design/pro-components'
import { getNewsById, updateNewsById } from '../../services/NAN'
import Form from './Form'
import { message } from 'antd'
export default function EditNews() {
    const { id } = useParams();
    const navigate = useNavigate();
    // 新闻信息
    const [newsInfo, setNewsInfo] = useState({})
    useEffect(() => {
        // 获取新闻的信息
        (async () => {
            const { data } = await getNewsById(id)
            setNewsInfo(data)
        })()
    }, [])
    function onsubmit(editorVal) {
        updateNewsById(id, {
            ...newsInfo,
            content: editorVal
        })
        message.success('修改新闻信息成功');
        navigate('/news/list')
    }
    return (
        <>
            <PageContainer>
                <Form
                    newsInfo={newsInfo}
                    setNewsInfo={setNewsInfo}
                    type='edit'
                    onsubmit={onsubmit}
                />
            </PageContainer>
        </>
    )
}