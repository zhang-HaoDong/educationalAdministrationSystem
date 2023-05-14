import React from 'react'
import { Tabs } from 'antd'
import MyAskForLeave from './MyAskForLeave'
import AddAskForLeave from './AddAskForLeave'
export default function AskForLeave() {
    const items = [
        {
            key: '1',
            label: '我的请销假',
            children: <MyAskForLeave />
        },
        {
            key: '2',
            label: '新增请销假',
            children: <AddAskForLeave />
        }
    ]
    return (
        <div style={{
            overflowY: 'scroll',
            height: '100%'
        }}>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}
