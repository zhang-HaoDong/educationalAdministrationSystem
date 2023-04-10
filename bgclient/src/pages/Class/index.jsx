import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { getAllMajor } from '../../services/major'
import { Button, Popconfirm, Space, Input, message, Select } from 'antd'
import { getClassByMajorId, deleteClassById, addClass } from '../../services/class'
import { getAllTeacher } from '../../services/teacher'
const Class = () => {
    const [majors, setMajors] = useState([])
    const [curmajorId, setCurmajorId] = useState('')
    const [teachersInfo, setTeachersInfo] = useState([])
    const [classInfo, setClassInfo] = useState({})
    const formRef = useRef()

    useEffect(() => {
        // 获取全部专业
        (async () => {
            const { data } = await getAllMajor();
            setMajors(data)
        })();
        // 获取全部教师
        (async () => {
            const teachers = await getAllTeacher();
            setTeachersInfo(teachers.data);
        })();
    }, [])

    function handleChange(e) {
        setCurmajorId(e);
        formRef.current.reload()
    }
    async function handleDeleteClass(id) {
        await deleteClassById(id);
        formRef.current.reload()
        message.error('删除成功')
    }

    async function handleAddClass() {
        if (!curmajorId) {
            message.error('请选择专业')
            return
        }
        await addClass({
            className: classInfo.className,
            counselorId: classInfo.counselorId,
            majorId: curmajorId
        })
        message.success('添加成功')
        formRef.current.reload()
    }

    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, row, index) => index
        },
        {
            title: '班级名称',
            align: 'center',
            dataIndex: 'className'
        },
        {
            title: '辅导员名称',
            align: 'center',
            dataIndex: 'counselorName'
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
                        title="是否确定删除此班级"
                        onConfirm={() => { handleDeleteClass(row._id) }}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button type="link" size='small'>删除</Button>
                    </Popconfirm>
                </>)
            }
        }
    ]

    // 获取专业下拉选项
    const majorsOptions = majors.map(item => ({
        label: item.majorName,
        value: item._id
    }))
    let teacherOptions = teachersInfo.map(item => ({
        value: item._id,
        label: item.name
    }))
    return (
        <PageContainer>
            <Space style={{
                marginBottom: 20
            }}>
                <span>请选则专业：</span>
                <Select
                    value={curmajorId}
                    style={{
                        width: 240,
                    }}
                    onChange={handleChange}
                    options={majorsOptions}
                />
            </Space>
            <br />
            <Space
                size={'large'}
                style={{
                    marginBottom: 20
                }}
            >
                <span>班级名称：</span>
                <Input
                    style={{
                        width: 240
                    }}
                    value={classInfo?.className}
                    onChange={(e) => setClassInfo({
                        ...classInfo,
                        className: e.target.value
                    })}
                />
                <span>教师名称：</span>
                <Select
                    placeholder="请选择的教师"
                    style={{
                        width: 120,
                    }}
                    onChange={e => setClassInfo({
                        ...classInfo,
                        counselorId: e
                    })}
                    options={teacherOptions}
                />
                <Button
                    onClick={
                        () => handleAddClass()
                    }
                    type='primary'
                >添加班级</Button>
            </Space>
            <ProTable
                search={false}
                actionRef={formRef}
                headerTitle='班级列表'
                columns={columns}
                rowKey={(row) => row._id}
                request={async () => {
                    if (!curmajorId) return
                    const res = await getClassByMajorId(curmajorId);
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

export default Class;
