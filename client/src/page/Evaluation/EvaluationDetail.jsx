import { useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { getAllAskQuestion, addEvaluation } from '../../api/evaluation'
import { useSelector } from 'react-redux'

export default function EvaluationDetail() {
    const [evaluationQuestion, setEvaluationQuestion] = useState([])
    const { userInfo } = useSelector(state => state.user)
    useEffect(() => {
        (async () => {
            const evaluationQuestion = await getAllAskQuestion()
            setEvaluationQuestion(evaluationQuestion.data)
        })()
    }, [])
    async function onFinish(e) {
        const evaluation = []
        for (const key in e) {
            evaluation.push({
                questionId: key,
                score: Number(e[key])
            })
        }
        const evaluationInfo = {
            stuId: userInfo._id,
            tecId: userInfo.counselorId,
            evaluation
        }
        const { data } = await addEvaluation(evaluationInfo)
        if (data._id) {
            message.success('评教成功')
        }
    }
    const evaluationList = evaluationQuestion.map(item => (
        <Form.Item
            label={item.evaluationQuestion}
            name={item.evaluationQuestion}
            rules={[
                {
                    required: true,
                    message: '请填写分数'
                },
            ]}
            key={item._id}
            wrapperCol={{
                span: 6
            }}
        >
            <Input type='number' max={10} min={0} />
        </Form.Item>
    ))
    return (
        <Form
            name="evaluation"
            onFinish={onFinish}
            layout='vertical'
        >
            {evaluationList}
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
