import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { getAllMajor } from '../../services/major'
import { addCourse, deleteCourseById, getCourseByMajorId } from '../../services/course'
import { Button, Popconfirm, Space, Input, message, Select } from 'antd'
const Course = () => {
    const [majors, setMajors] = useState([])
    const [curmajorId, setCurmajorId] = useState('')
    const [courseInfo, setCourseInfo] = useState()
    const formRef = useRef()

    useEffect(() => {
        // 获取全部专业
        (async () => {
            const { data } = await getAllMajor();
            setMajors(data)
        })();
    }, [])

    function handleChange(e) {
        setCurmajorId(e);
        formRef.current.reload()
    }
    async function handleDeleteCourse(id) {
        await deleteCourseById(id)
        formRef.current.reload()
        message.error('删除成功')
    }

    async function handleAddCourse() {
        if (!curmajorId) {
            message.error('请选择专业')
            return
        }
        //  TODO add course
        await addCourse({
            ...courseInfo,
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
            title: '课程名称',
            align: 'center',
            dataIndex: 'courseName'
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

    // 获取专业下拉选项
    const majorsOptions = majors.map(item => ({
        label: item.majorName,
        value: item._id
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
                <span>课程名称：</span>
                <Input
                    style={{
                        width: 240
                    }}
                    value={courseInfo?.courseName}
                    onChange={(e) => setCourseInfo({
                        ...courseInfo,
                        courseName: e.target.value
                    })}
                />
                <Button
                    onClick={
                        () => handleAddCourse()
                    }
                    type='primary'
                >添加课程</Button>
            </Space>
            <ProTable
                search={false}
                actionRef={formRef}
                headerTitle='课程列表'
                columns={columns}
                rowKey={(row) => row._id}
                request={async () => {
                    if (!curmajorId) return
                    const res = await getCourseByMajorId(curmajorId);
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
