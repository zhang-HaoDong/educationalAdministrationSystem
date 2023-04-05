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
        try {
            await addStudent(userInfo);
            navigate('/student/list')
        } catch (error) {
            message.error(error.response.data.msg)
        }
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
