import { useEffect, useState } from 'react'
import { getTeacherByStuId } from '../../api/teacher'
import { useSelector } from 'react-redux'
import { Descriptions, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function Evaluation() {
    const { userInfo } = useSelector(state => state.user)
    const [teacher, setTeacher] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            if (!userInfo._id) return
            const teacherinfo = await getTeacherByStuId(userInfo.counselorId)
            setTeacher(teacherinfo.data)
        })()
    }, [userInfo._id, userInfo.counselorId])
    function handleClick() {
        navigate('/evaluationdetail')
    }
    return (

        <Descriptions title="我的教师" extra={(<Button type='primary' style={{
            marginRight: 48,
            marginTop: 16
        }} onClick={handleClick}>评教</Button>)}
            bordered
        >
            <Descriptions.Item label="姓名">{teacher?.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{teacher?.sex === 'male' ? '男' : '女'}</Descriptions.Item>
            <Descriptions.Item label="联系方式">{teacher?.tel}</Descriptions.Item>
            <Descriptions.Item label="微信">{teacher?.wechat}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{teacher?.mail}</Descriptions.Item>
            <Descriptions.Item label="个人简介">{teacher?.intro ?? '无'}</Descriptions.Item>
        </Descriptions>

    )
}
