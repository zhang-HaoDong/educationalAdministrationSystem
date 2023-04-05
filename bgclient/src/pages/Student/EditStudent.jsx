import { useParams, useNavigate } from '@umijs/max'
import { useEffect, useState } from 'react';
import { updateStudent, getStudentById } from '../../services/student'
import { PageContainer } from '@ant-design/pro-components'
import Form from './component/Form'
import { message } from 'antd';

export default function EditUser() {
    //获取用户的id
    const { id } = useParams();
    const navigate = useNavigate()
    //存储用户的数据
    const [studentInfo, setStudentInfo] = useState({})
    //根据id获取用户的数据
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getStudentById(id);
                setStudentInfo(data);
            } catch {
                message.error('该教师不存在')
            }
        })()
    }, [id])
    // 提交用户编辑信息
    function onsubmit() {
        updateStudent(id, {
            ...studentInfo
        })
        message.success('编辑成功')
        navigate('/student/list')
    }
    return (
        <>
            <PageContainer>
                <div style={{ width: 600 }}>
                    <Form
                        type='edit'
                        userInfo={studentInfo}
                        updateUserinfo={setStudentInfo}
                        onsubmit={onsubmit}
                    />
                </div>
            </PageContainer>
        </>
    )
}