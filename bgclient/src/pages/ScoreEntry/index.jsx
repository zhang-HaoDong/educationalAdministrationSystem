import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useState, useEffect, useRef } from 'react';
import { getStudentByClassId } from '../../services/student'
import { getCourseByMajorId } from '../../services/course'
import { Input, Select, Button, message } from 'antd'
import { getClassByTeacherId } from '../../services/class'
import { useModel } from '@umijs/max'
import { updateStudent } from '../../services/student'
const HomePage = () => {
    const formRef = useRef()

    const [classesInfo, setClassesInfo] = useState([])
    const [classId, setClassId] = useState()
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [courseList, setCourseList] = useState([])
    const [curMajorId, setCurMajorId] = useState()
    const [scoresInfo, setScoresInfo] = useState({})


    const { initialState } = useModel('@@initialState');
    useEffect(() => {
        (async () => {
            const teacherId = initialState?.adminInfo._id
            const { data } = await getClassByTeacherId(teacherId)
            setClassesInfo(data)
        })()
    }, [])
    useEffect(() => {
        // 根据班级的专业id获取学科项目
        (async () => {
            const majorId = classesInfo.find(item => item._id === classId)
            if (majorId) {
                const curMajorId = majorId.majorId
                setCurMajorId(curMajorId)
                const { data } = await getCourseByMajorId(curMajorId)
                setCourseList(data)
            }
        })()
    }, [classId])

    let columns = [
        {
            title: '序号',
            render: (text, row, index) => index + 1,
            align: 'center'
        },
        {
            title: "姓名",
            align: 'center',
            dataIndex: 'name'
        }
    ]

    courseList.forEach(item => {
        columns.push({
            title: item.courseName,
            align: 'center',
            dataIndex: item.courseName,
            render: () => <Input
                style={{
                    width: '100px'
                }}
                value={scoresInfo[item.courseName]}
                onChange={e => {
                    setScoresInfo({
                        ...scoresInfo,
                        [item.courseName]: e.target.value
                    })
                }}
            />
        })
    })
    columns.push({
        title: '操作',
        align: 'center',
        render: (_, row) => {
            return (<>
                <Button type="link" size='small' onClick={() => handelUpdate(row)}>更新成绩</Button>
            </>)
        }
    })

    function handlePageChange(cur) {
        setPagination({
            ...pagination,
            current: cur
        })
    }
    async function handelUpdate(row) {
        const studentId = row._id
        const newStudentInfo = {
            ...row,
            scores: scoresInfo
        }
        await updateStudent(studentId, newStudentInfo)
        message.success('更新成功')
    }

    const classOptions = classesInfo.map(item => ({
        label: item.className,
        value: item._id
    }))
    return (
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
                scroll={{ x: 1000 }}
                actionRef={formRef}
                headerTitle='成绩列表'
                columns={columns}
                rowKey={(row) => row._id}
                pagination={{
                    showQuickJumper: true,
                    ...pagination,
                    onChange: handlePageChange
                }}
                search={false}
                request={
                    async () => {
                        const stuInfos = await getStudentByClassId(classId);
                        const coursesList = await getCourseByMajorId(curMajorId)
                        stuInfos.data.forEach(student => {
                            coursesList.data.forEach(course => {
                                if (!student.scores) {
                                    student.scores = {}
                                }
                                if (!student.scores[course.courseName]) {
                                    student.scores[course.courseName] = ''
                                }
                            })
                        })
                        const list = stuInfos.data.map(item => {
                            setScoresInfo({
                                ...item.scores
                            })
                            return {
                                ...item,
                                ...item.scores
                            }
                        })
                        return {
                            success: list.length,
                            data: list,
                            total: list.length,
                        }
                    }
                }
            />
        </PageContainer>
    );
};

export default HomePage;