import { useEffect, useState } from 'react'
import { Card } from 'antd'
import { useSelector } from 'react-redux'
import { getClassSchedule } from '../../api/classSchdule'

const gridStyle = {
  width: '12.5%',
  textAlign: 'center',
};

export default function ClassScheduleSearch() {
  const [classSchedule, setClassSchedule] = useState([])
  const userInfo = useSelector(state => state.user.userInfo)
  useEffect(() => {
    if (!userInfo.classId) return
    (async () => {
      const { data } = await getClassSchedule(userInfo.classId)
      if (data[0]) {
        setClassSchedule(data[0].courses)
      }
    })()
  }, [userInfo.classId])
  const classScheduleList = []
  classSchedule.forEach((item, i) => (
    item.forEach((item, j) => (
      classScheduleList.push(
        <Card.Grid
          style={{
            ...gridStyle,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80px'
          }}
          hoverable={false}
          key={i + "" + j}
        >
          {item}
        </Card.Grid>
      )
    ))
  ))
  return (
    <div>
      <Card title="课表">
        {classSchedule.length > 0 ? classScheduleList : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#666'
            }}
          >
            您的教师暂未发布课表~
          </div>
        )}
      </Card>
    </div>
  )
}
