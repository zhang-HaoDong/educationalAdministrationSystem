import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNoticeById } from '../../api/notice'
export default function NoticeDetail() {
    const { id } = useParams()
    const [notice, setNotice] = useState({})
    useEffect(() => {
        (async () => {
            const data = await getNoticeById(id)
            setNotice(data.data)
        })()
    }, [id])
    return (
        <div>
            <h3>{notice.title}</h3>
            <span>{notice.createdAt}</span>
            <div dangerouslySetInnerHTML={{
                __html: notice.content
            }}></div>
        </div>
    )
}
