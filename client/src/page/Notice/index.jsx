import { useEffect, useState } from 'react'
import { List } from 'antd'
import { getNoticeByPage } from '../../api/notice';
export default function Notice() {
    const [notices, setNotices] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getNoticeByPage()
            setNotices(data.data)
        })()
    }, [])
    const data = notices.map((item) => ({
        href: `/notice/${item._id}`,
        title: item.title,
        description: item.createdAt,
        content: item.content,
        cover: item.cover
    }));
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                overflowY: 'scroll'
            }}
        >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={data}
                footer={
                    <div style={{
                        color: '#666',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <p>我是有底线的~</p>
                    </div>
                }
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={item.cover}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        <div dangerouslySetInnerHTML={{
                            __html: item.content?.slice(0, 30),
                        }}>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}
