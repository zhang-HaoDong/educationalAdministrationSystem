import { useEffect, useState } from 'react'
import { getAskByStuId } from '../../api/askforleave'
import { useSelector } from 'react-redux'
import { Descriptions, Tag } from 'antd'

export default function MyAskForLeave() {
    const { userInfo } = useSelector(state => state.user)

    const [askList, setAskList] = useState([])
    useEffect(() => {
        (async () => {
            const { data } = await getAskByStuId(userInfo._id)
            setAskList(data)
        })()
    }, [userInfo._id])
    return (
        <div
            style={{
                overflowY: 'scroll',
                margin: '0 auto',
                backgroundColor: '#fff'
            }}
        >
            {askList.map(item => (
                <div style={{
                    padding: '32px 48px'
                }}
                    key={item._id}
                >
                    <Descriptions title="请假信息" layout="vertical" style={{
                        borderBottom: '1px solid #bbb',
                    }}>
                        <Descriptions.Item label="请假类型">{item.typeOfLeave}</Descriptions.Item>
                        <Descriptions.Item label="请假时间">{`${item.begin}-${item.end}`}</Descriptions.Item>
                        <Descriptions.Item label="请假原因">{item.reason}</Descriptions.Item>
                        <Descriptions.Item label="审批状态"><Tag style={{
                            color: item.isPass === 'success' ? '#1a8754' : '#dc3545'
                        }}>
                            {item.isPass === 'pending' ? '未审批' : (item.isPass === 'success' ? '审批通过' : '审批驳回')}
                        </Tag></Descriptions.Item>
                        <Descriptions.Item label="其他选项">...</Descriptions.Item>

                    </Descriptions>
                </div>
            ))}
        </div>
    )
}
