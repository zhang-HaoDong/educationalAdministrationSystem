import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useModel } from '@umijs/max'
import { getEvaluationByTecId } from '../../services/evaluation'
import { Button, Modal, Descriptions } from 'antd';

const HomePage = () => {
    const formRef = useRef()
    const { initialState } = useModel('@@initialState');

    const [curEvaluation, setcurEvaluation] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)


    function handleDetail(row) {
        setcurEvaluation(row.evaluation)
        setIsModalOpen(true)
    }

    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, row, index) => index + 1
        },
        {
            title: '教师名称',
            align: 'center',
            dataIndex: 'teacherName'
        },
        {
            title: '学生名称',
            align: 'center',
            dataIndex: 'studentName'
        },
        {
            title: '总分',
            align: 'center',
            dataIndex: 'sumScore'
        },
        {
            title: '操作',
            align: 'center',
            search: false,
            key: 'option',
            valueType: 'option',
            fixed: 'right',
            render: (_, row) => {
                return <Button type="link" size='small' onClick={() => handleDetail(row)}>详情</Button>
            }
        }
    ]
    return (
        <PageContainer>
            <ProTable
                search={false}
                actionRef={formRef}
                headerTitle='课程列表'
                columns={columns}
                rowKey={(row) => row._id}
                request={async () => {
                    if (!initialState.adminInfo) return
                    const res = await getEvaluationByTecId(initialState.adminInfo._id);
                    const data = res.data.map((item) => ({
                        ...item,
                        sumScore: item.evaluation.reduce((acc, cur) => acc + cur.score, 0)
                    }))
                    return {
                        success: !res.code,
                        data,
                        total: res.data.length,
                    }
                }}
            />
            <Modal title="用户详情" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Descriptions
                    bordered
                    size='default'
                    column={5}
                >
                    {
                        curEvaluation.map(item => <Descriptions.Item label={item.questionId} span={3} key={item._id}>{item.score}</Descriptions.Item>)
                    }
                </Descriptions>
            </Modal>
        </PageContainer>
    );
};

export default HomePage;
