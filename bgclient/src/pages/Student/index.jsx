import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Switch, Button, Popconfirm, message, Modal, Descriptions, Image, Select } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { getStudentByClassId, updateStudent, deleteStudent } from '../../services/student'
import { getClassByTeacherId } from '../../services/class'
import { useNavigate } from 'react-router-dom'
import { useModel } from '@umijs/max'
const Student = () => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [userInfo, setUserInfo] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [classesInfo, setClassesInfo] = useState([])
    const [classId, setClassId] = useState('')
    const formRef = useRef()
    const navigate = useNavigate()
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        (async () => {
            const teacherId = initialState?.adminInfo._id
            const { data } = await getClassByTeacherId(teacherId)
            setClassesInfo(data)
        })()
    }, [])
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
            title: '昵称',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '专业',
            dataIndex: 'majorName'
        },
        {
            title: '班级',
            dataIndex: 'className',
            align: 'center',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            align: 'center',
            render: text => text === 'male' ? '男' : '女'
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
                    <Button type="link" size='small' onClick={() => navigate(`/student/editstudent/${row._id}`)}>编辑</Button>
                    <Popconfirm
                        title="是否确定删除此用户"
                        onConfirm={() => { handleDeleteStudent(row._id) }}
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
        setUserInfo(row);
        setIsModalOpen(true)
    }
    // 删除学生
    async function handleDeleteStudent(stuId) {
        await deleteStudent(stuId);
        messageApi.open({
            type: 'error',
            content: '删除成功'
        })
        formRef.current.reload()
    }

    const classOptions = classesInfo.map(item => ({
        label: item.className,
        value: item._id
    }))
    return (
        <>
            {contextHolder}
            <PageContainer>
                <span>班级：</span>
                <Select
                    placeholder="请选择班级"
                    style={{
                        width: 120,
                        marginBottom: '24px'
                    }}
                    onChange={e => {
                        setClassId(e)
                        formRef.current.reload();
                    }
                    }
                    options={classOptions}
                />
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
                        if (!classId) return
                        const res = await getStudentByClassId(classId);
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
                    bordered
                    size='default'
                    extra={<Button type="primary" onClick={() => navigate(`/student/editstudent/${userInfo._id}`)}>编辑</Button>}
                    column={3}
                >
                    <Descriptions.Item label="登陆账号" span={3} >{userInfo.loginId}</Descriptions.Item>
                    <Descriptions.Item label="昵称" span={3}>{userInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="头像" span={3}><Image src={userInfo.avatar} width={100} /></Descriptions.Item>
                    <Descriptions.Item label="邮箱" span={3}>{userInfo.mail}</Descriptions.Item>
                    <Descriptions.Item label="微信" span={3}>{userInfo.wechat}</Descriptions.Item>
                    <Descriptions.Item label="自我介绍" span={3}>{userInfo.intro}</Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};

export default Student;
