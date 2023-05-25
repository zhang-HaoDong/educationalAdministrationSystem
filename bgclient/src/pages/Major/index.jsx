import { PageContainer, ProTable } from '@ant-design/pro-components';
import {  useRef, useState } from 'react';
import { getAllMajor,addMajor, deleteMajor} from '../../services/major'
import { Button, Popconfirm, Space, Input, message } from 'antd'
const Course = () => {
    const formRef = useRef()

    const [majorName, setMajorName] = useState('')

    async function handleDeleteCourse(id) {
       await deleteMajor(id)
        formRef.current.reload()
        message.error('删除成功')
    }

    async function handleAddCourse() {
        if(!majorName) {
            message.error('请输入专业名称')
            return
        }
        await addMajor({
            majorName:majorName
        })
        message.success('添加成功')
        formRef.current.reload()
    }

    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, row, index) => index + 1
        },
        {
            title: '专业名称',
            align: 'center',
            dataIndex: 'majorName'
        },
        {
            title: '操作',
            align: 'center',
            search: false,
            key: 'option',
            valueType: 'option',
            fixed: 'right',
            render: (_, row) => {
                return (<>
                    <Popconfirm
                        title="是否确定删除此课程"
                        onConfirm={() => { handleDeleteCourse(row._id) }}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button type="link" size='small'>删除</Button>
                    </Popconfirm>
                </>)
            }
        }
    ]
    return (
        <PageContainer>
            <Space
                size={'large'}
                style={{
                    marginBottom: 20
                }}
            >
                <span>专业名称：</span>
                <Input
                    style={{
                        width: 240
                    }}
                    value={majorName}
                    onChange={(e) => setMajorName(e.target.value)}
                />
                <Button
                    onClick={
                        () => handleAddCourse()
                    }
                    type='primary'
                >添加专业</Button>
            </Space>
            <ProTable
                search={false}
                actionRef={formRef}
                headerTitle='课程列表'
                columns={columns}
                rowKey={(row) => row._id}
                request={async () => {
                    const res = await getAllMajor();
                    return {
                        success: !res.code,
                        data: res.data,
                        total: res.data.length,
                    }
                }}
            />
        </PageContainer>
    );
};

export default Course;
