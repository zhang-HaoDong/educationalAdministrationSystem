import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react'
import { getAskForLeave, deleteAskForLeave } from '../../services/askForLeave'
import { Button, Popconfirm, Descriptions, Modal, Image, message, Radio } from 'antd'
const HomePage = () => {
    const formRef = useRef()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [curAskDetail, setCurAskDetail] = useState({})
    const [isPass, setIsPass] = useState('pending')
    console.log(isPass);

    function handleDetail(row) {
        setIsModalOpen(true)
        setCurAskDetail(row)
    }
    async function handleDeleteAsk(id) {
        await deleteAskForLeave(id)
        formRef.current.reload()
        message.error('删除成功')
    }
    function onChange(e){
        setIsPass(e.target.value)
        formRef.current.reload()
    }   
    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, row, index) => index + 1
        },
        {
            title: '姓名',
            align: 'center',
            dataIndex: 'stuId'
        },
        {
            title: '请假类型',
            align: 'center',
            dataIndex: 'typeOfLeave',
            render: (text) => text === 'shijia' ? '事假' : '病假'
        },
        {
            title: '原因',
            align: 'center',
            dataIndex: 'reason'
        },
        {
            title: '目的地',
            align: 'center',
            dataIndex: 'destination'
        },
        {
            title: '起始时间',
            align: 'center',
            dataIndex: 'begin'
        },
        {
            title: '结束时间',
            align: 'center',
            dataIndex: 'end'
        },
        {
            title: '是否批准',
            align: 'center',
            dataIndex: 'isPass',
            render: (text) => {
                switch (text) {
                    case 'pending':
                        return '审批中'
                    case 'success':
                        return '审批通过'
                    case 'refuse':
                        return '审批未通过'
                    default:
                        return '-'
                }
            }
        },
        {
            title: '负责老师',
            align: "center",
            dataIndex: 'tecId'
        },
        {
            title: '联系电话',
            align: "center",
            dataIndex: 'tel'
        },
        {
            title: '紧急联系人',
            align: 'center',
            dataIndex: 'emergencyContact'
        },
        {
            title: '紧急联系人电话',
            align: 'center',
            dataIndex: 'emergencyTel'
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
                    <Button type="link" size='small' onClick={() => handleDetail(row)}>详情</Button>
                    <Popconfirm
                        title="是否确定删除此用户"
                        onConfirm={() => { handleDeleteAsk(row._id) }}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button type="link" size='small'>删除</Button>
                    </Popconfirm>
                </>)
            }
        }
    ]
    const options = [
        {
            label: '未审批',
            value: 'pending'
        }, 
        { 
            label:'已通过',
            value:'success'
        },
        {
            label:'已拒绝',
            value:'refuse'
        }
    ]
    return (
        <PageContainer>
            <Radio.Group
                options={options}
                onChange={onChange}
                value={isPass}
                optionType="button"
                buttonStyle="solid"
                style={{
                    marginBottom:'32px'
                }}
            />
            <ProTable
                scroll={{ x: 2000 }}
                actionRef={formRef}
                headerTitle='请销假'
                columns={columns}
                rowKey={(row) => row._id}
                request={async (params) => {
                    const res = await getAskForLeave(isPass, params);
                    return {
                        success: !res.code,
                        data: res.data,
                        total: res.data.length,
                    }
                }}
                search={false}
            />
            <Modal
                title="请假信息"
                open={isModalOpen}
                onCancel={
                    () => setIsModalOpen(false)
                }
                footer={null}
                width={800}>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: '32px'
                    }}
                >
                    <Button
                        type='primary'
                        style={{ marginRight: '16px' }}
                    >
                        同意
                    </Button>
                    <Button
                        type='default'
                        style={{ backgroundColor: 'rgb(205, 32, 31)', color: '#fff' }}
                    >
                        拒绝
                    </Button>
                </div>
                <Descriptions >
                    <Descriptions.Item
                        label="姓名"
                    >
                        {curAskDetail.stuId}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="请假类型"
                    >
                        {
                            curAskDetail.typeOfLeave === 'shijia'
                                ? '事假'
                                : '病假'
                        }
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="联系电话"
                    >
                        {curAskDetail.tel}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="请假原因"
                    >
                        {curAskDetail.reason}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="目的地"
                    >
                        {curAskDetail.destination}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="开始时间"
                    >
                        {curAskDetail.begin}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="截止时间"
                    >
                        {curAskDetail.end}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="是否批准"
                    >
                        {
                            curAskDetail.isPass !== 'pending'
                                ? (curAskDetail.isPass === 'success' ? '审批通过' : '审批未通过')
                                : '审批中'
                        }
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="负责老师"
                    >
                        {curAskDetail.tecId}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="附件"
                    >
                        {
                            curAskDetail.attachment
                                ? <Image src={curAskDetail.attachment} />
                                : null
                        }
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </PageContainer>
    );
};

export default HomePage;
