import { useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import Form from './component/Form'
import { useNavigate } from '@umijs/max'
import { addStudent } from '../../services/student'
import { message } from 'antd'
export default function AddStudent() {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()
    async function onsubmit() {
        userInfo.counselorId = "642914369bf865655b97ea58"
        userInfo.classId = '1234'
        userInfo.enabled = false
        await addStudent(userInfo);
        await navigate('/student/list')
    }
    return (
        <>
            <PageContainer>
                <div style={{
                    width: 500
                }}>
                    <Form
                        userInfo={userInfo}
                        updateUserinfo={setUserInfo}
                        type="add"
                        onsubmit={onsubmit}
                    />
                </div>
            </PageContainer>
        </>
    )
}
