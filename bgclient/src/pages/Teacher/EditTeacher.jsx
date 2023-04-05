import { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import Form from './component/Form'
import { useNavigate, useParams } from '@umijs/max'
import { updateTeacher, getTeacherById } from '../../services/teacher'
import { message } from 'antd'
export default function AddStudent() {
    const [userInfo, setUserInfo] = useState({})

    const navigate = useNavigate()
    const { id } = useParams();

    //根据id获取用户的数据
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getTeacherById(id);
                setUserInfo(data);
            } catch {
                message.error('该教师不存在')
            }
        })()
    }, [id])

    async function onsubmit() {
        try {
            await updateTeacher(userInfo);
            navigate('/teacher/list')
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
                        type="edit"
                        onsubmit={onsubmit}
                    />
                </div>
            </PageContainer>
        </>
    )
}
