import { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { Space, Select, Card, Button, message } from 'antd'
import { getAllMajor } from '../../services/major'
import { getClassByMajorId } from '../../services/class'
import { getClassScheduleByClassID, addClassSchedule,editClassSchedule } from '../../services/classSchedule'
import { getCourseByMajorId } from '../../services/course'

const gridStyle = {
  width: '12.5%',
  textAlign: 'center',
};

export default function ClassSchedule() {
  const [curmajorId, setCurmajorId] = useState('')
  const [curClassId, setCurClassId] = useState('')
  const [majors, setMajors] = useState([])
  const [classes, setClasses] = useState([])
  const [classScheduleInfo, setClassScheduleInfo] = useState([[], [], [], [], [], []])
  const [courses, setCourses] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    (async () => {
      const { data } = await getAllMajor()
      setMajors(data)
    })()
  }, [])

  useEffect(() => {
    if (!curmajorId) return
    (async () => {
      const { data } = await getClassByMajorId(curmajorId)
      setClasses(data)
    })()
  }, [curmajorId])
  useEffect(() => {
    if (!curmajorId) return
    (async () => {
      const { data } = await getCourseByMajorId(curmajorId)
      setCourses(data)
    })()
  }, [curmajorId])

  useEffect(() => {
    if (!curClassId) return
    (async () => {
      const { data } = await getClassScheduleByClassID(curClassId)
      if (data[0].courses.length === 0) {
        setClassScheduleInfo(
          [
            [
              '',
              '周一',
              '周二',
              '周三',
              '周四',
              '周五',
              '周六',
              '周日',
            ],
            [
              '第一节(8:00 - 10:00)',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
            ],
            [
              '第二节(10:00 - 12:00)',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
            ],
            [
              '第三节(14:00 - 16:00)',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
            ],
            [
              '第四节(16:00 - 18:00)',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
            ],
            [
              '第五节(19:00 - 21:00)',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
            ],
          ]
        )
        return
      }
      setIsEdit(true)
      setClassScheduleInfo(data[0].courses)
    })()
  }, [curClassId])

  async function handleSubmit() {
    if (!curmajorId) {
      message.error('请选择专业')
      return
    }
    if (!curClassId) {
      message.error('请选择班级')
      return
    }
    if (isEdit) {
      await editClassSchedule(curClassId, {
        courses:classScheduleInfo
      })
      message.success('编辑成功')
      return
    }
    await addClassSchedule({
      courses: classScheduleInfo,
      classId: curClassId
    });
    message.success('发布成功')
  }

  const majorsOptions = majors.map(item => ({
    label: item.majorName,
    value: item._id
  }))
  const classesOptions = classes.map(item => ({
    label: item.className,
    value: item._id
  }))
  const coursesOptions = courses.map(item => ({
    label: item.courseName,
    value: item._id
  }))
  const classScheduleList = []
  classScheduleInfo.forEach((item, i) => (
    item.forEach((item, j) => (
      classScheduleList.push(
        i === 0 || j === 0
          ? <Card.Grid
            style={{
              ...gridStyle,
              backgroundColor: '#ddd'
            }}
            hoverable={false}
            key={i + "" + j}
          >
            {item}
          </Card.Grid>
          :
          <Card.Grid
            style={gridStyle}
            hoverable={false}
            key={i + "" + j}
          >
            <Select
              value={classScheduleInfo[i][j]}
              dropdownMatchSelectWidth={150}
              style={{
                width: '100%',
              }}
              onChange={e => {
                const newArr = [...classScheduleInfo]
                newArr[i][j] = e
                console.log(newArr);
                setClassScheduleInfo(newArr)
              }}
              options={coursesOptions}
            />
          </Card.Grid>
      )
    ))
  ))
  return (
    <PageContainer>
      <Space style={{
        marginBottom: 20
      }}>
        <span>请选择专业：</span>
        <Select
          value={curmajorId}
          style={{
            width: 240,
          }}
          onChange={e => {
            setCurClassId('')
            setCurmajorId(e)
          }}
          options={majorsOptions}
        />
        <span>请选择班级：</span>
        <Select
          value={curClassId}
          style={{
            width: 240,
          }}
          onChange={e => {
            setCurClassId(e)
          }}
          options={classesOptions}
        />
        <Button
          type='primary'
          onClick={e =>
            handleSubmit()
          }
          style={{
            marginLeft: 48
          }}
        >
          {isEdit ? '编辑课表' : '发布课表'}
        </Button>
      </Space>
      <Card title="课表">
        {classScheduleList}
      </Card>
    </PageContainer>
  )
}
