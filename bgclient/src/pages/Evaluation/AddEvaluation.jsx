import { PageContainer,ProTable } from '@ant-design/pro-components';
import {useRef} from 'react'
import {getAllEvaluationQuestion,deleteEvaluationQuestionById,addEvaluationQuestion} from '../../services/evaluationQuestion'
import {Button,message,Popconfirm,Input} from 'antd'
import { useState } from 'react';
const HomePage = () => {
    const formRef = useRef()

    const [evaluationQuestion, setEvaluationQuestion] = useState('')

    async function handleDeleteQuestion(id){
        await deleteEvaluationQuestionById(id)
        formRef.current.reload()
        message.error('删除成功')
    }
    async function handleAddQuestion(){
        await addEvaluationQuestion(evaluationQuestion);
        formRef.current.reload()
        message.success('添加成功')
    }

    const columns = [
        {
            title:'序号',
            align:'center',
            render:(text,row,index) => index + 1
        },
        {
            title:'问题',
            align:'center',
            dataIndex:'evaluationQuestion'
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
                        title="是否确定删除此问题"
                        onConfirm={() => { handleDeleteQuestion(row._id) }}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button type="link" size='small'>删除</Button>
                    </Popconfirm>
                </>)
            }
        }
    ]
    return (
        <PageContainer>
            <span>评教问题：</span>
                <Input
                    style={{
                        width: 480,
                        marginBottom:32,
                        marginRight:16
                    }}
                    value={evaluationQuestion}
                    onChange={(e) => setEvaluationQuestion(e.target.value)}
                />
                <Button
                    onClick={
                        () => handleAddQuestion()
                    }
                    type='primary'
                >添加问题</Button>
            <ProTable
                search={false}
                actionRef={formRef}
                headerTitle='评教列表列表'
                columns={columns}
                rowKey={(row) => row._id}
                request={async () => {
                    const res = await getAllEvaluationQuestion();
                    return {
                        success: !res.code,
                        data:res.data.slice(0,10),
                        total: res.data.slice(0,10).length,
                    }
                }}
            />
        </PageContainer>
    );
};

export default HomePage;
