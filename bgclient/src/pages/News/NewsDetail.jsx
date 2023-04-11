import React, { useEffect, useState } from 'react'
import { getNewsById } from '../../services/NAN'
import { useParams } from 'react-router-dom'
export default function NewsDetail() {
    const {id} = useParams()

    const [detail, setDetail] = useState({})
    useEffect(() => {
        (async () => {
            const {data} = await getNewsById(id)
            setDetail(data)
        })()
    },[id])
    return (
        <div dangerouslySetInnerHTML={{
            __html:detail.content
        }}>

        </div>
    )
}
