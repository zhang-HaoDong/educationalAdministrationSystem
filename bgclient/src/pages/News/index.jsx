import { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components';
import { getNews } from '../../services/NAN'
import { Card, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteNews } from '../../services/NAN'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card;
const HomePage = () => {
    const [count, setCount] = useState(0);
    const [newsInfo, setNewsInfo] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const { data } = await getNews();
            setNewsInfo(data)
        })()
    }, [count])

    async function handleDelete(e, id) {
        e.stopPropagation()
        await deleteNews(id);
        setCount(count + 1)
        message.error('删除成功');
    }

    const newsList = newsInfo.map(item => (
        <Card
            key={item._id}
            style={{
                width: '30%',
                marginBottom: 32,
                height: 350,
                display: 'flex',
                flexDirection: 'column'
            }}
            bodyStyle={{
                flexGrow: 1
            }}
            cover={
                item.cover ?
                    <img
                        alt="cover"
                        src={item.cover}
                        height={180}
                        style={{
                            objectFit: 'cover'
                        }}
                    /> : null
            }
            actions={[
                <EditOutlined key="edit" onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/news/edit_news/${item._id}`)
                }} />,
                <DeleteOutlined key='delete' onClick={(e) => handleDelete(e, item._id)} />
            ]}
            onClick={() => navigate(`/news/detail_news/${item._id}`)}
        >
            <Meta
                title={item.title > 0 ? (item.title.substring(0, 10) + '...') : item.title}
                description={`发布于${item.createdAt}`}
            />
        </Card>
    ))
    return (
        <PageContainer>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'start'
            }}>
                {newsList}
            </div>
        </PageContainer>
    );
};

export default HomePage;
