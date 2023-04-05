import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Switch, Button, Popconfirm, message, Modal, Descriptions, Image } from 'antd'
import { useState, useRef } from 'react'
import { getAllTeacher, deleteTeacher } from '../../services/teacher';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [teacherInfo, setTeacherInfo] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const formRef = useRef()
    const navigate = useNavigate();
    const columns = [
        {
            title: '序号',
            align: 'center',
            width: 50,
            render: (text, row, index) => { return (pagination.current - 1) * pagination.pageSize + index + 1 },
            search: false
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            valueType: 'image',
            align: "center",
            search: false
        },
        {
            title: '登陆账号',
            dataIndex: 'loginId',
            align: 'center'
        },
        {
            title: '姓名',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            align: 'center',
            render: text => text === 'male' ? '男' : '女'
        },
        {
            title: '权限',
            dataIndex: 'permission',
            align: 'center',
            render: text => text === '1' ? '超级管理员' : '教师'
        },
        {
            title: '联系方式',
            dataIndex: 'tel',
            align: 'center'
        },
        {
            title: '邮箱',
            dataIndex: 'mail',
            align: 'center',
            search: false
        },
        {
            title: '微信',
            dataIndex: 'wechat',
            align: 'center',
            search: false
        },
        {
            title: "状态",
            dataIndex: 'enabled',
            search: false,
            align: 'center',
            fixed: 'right',
            render: (status, row) => {
                return <Switch checked={status} onChange={(val) => userStatusHandleChange(val, row)} size='small' />
            }
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
                    <Button type="link" size='small' onClick={() => handleDetail(row)}>详情</Button>
                    <Button type="link" size='small' onClick={() => editHandle(row._id)}>编辑</Button>
                    <Popconfirm
                        title="是否确定删除此用户"
                        onConfirm={() => { handelDeleteTeacher(row._id) }}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button type="link" size='small'>删除</Button>
                    </Popconfirm>
                </>)
            }
        }
    ]
    function handlePageChange(cur) {
        setPagination({
            ...pagination,
            current: cur
        })
    }

    // 更改状态
    async function userStatusHandleChange(val, row) {
        const id = row._id;
        const { data } = await updateStudent(row._id, {
            enabled: val
        })
        formRef.current.reload();
    }
    // 详情点击
    function handleDetail(row) {
        setTeacherInfo(row);
        setIsModalOpen(true);
    }
    // 删除老师
    async function handelDeleteTeacher(teacherId) {
        await deleteTeacher(teacherId);
        messageApi.open({
            type: 'error',
            content: '删除成功'
        })
        formRef.current.reload()
    }
    // 修改教师信息
    function editHandle(id) {
        navigate(`/teacher/editteacher/${id}`)
    }
    return (
        <>
            {contextHolder}
            <PageContainer>
                <ProTable
                    scroll={{ x: 2000 }}
                    actionRef={formRef}
                    headerTitle='学生列表'
                    columns={columns}
                    rowKey={(row) => row._id}
                    pagination={{
                        showQuickJumper: true,
                        ...pagination,
                        onChange: handlePageChange
                    }}
                    request={async (params) => {
                        const res = await getAllTeacher(params);
                        return {
                            success: !res.code,
                            data: res.data,
                            total: res.data.length,
                        }
                    }}
                />
            </PageContainer>
            <Modal title="用户详情" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Descriptions
                    column={3}
                    bordered
                    size='default'
                    extra={<Button type="primary" onClick={() => navigate(`/user/edituser/${teacherInfo._id}`)}>编辑</Button>}
                >
                    <Descriptions.Item label="登陆账号" span={3} >{teacherInfo.loginId}</Descriptions.Item>
                    <Descriptions.Item label="姓名" span={3}>{teacherInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="头像" span={3}><Image src={teacherInfo.avatar} width={100} /></Descriptions.Item>
                    <Descriptions.Item label="邮箱" span={3}>{teacherInfo.mail}</Descriptions.Item>
                    <Descriptions.Item label="微信" span={3}>{teacherInfo.wechat}</Descriptions.Item>
                    <Descriptions.Item label="自我介绍" span={3}>{teacherInfo.intro}</Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};

export default HomePage;
