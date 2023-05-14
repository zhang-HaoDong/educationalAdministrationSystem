import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getStudentByClassId } from '../../api/student'
import { List, Avatar } from 'antd'
import { getAskByStuId } from '../../api/askforleave'
const CHART_COLOR_LIST = [
    '#00CAD7',
    '#FFAB4B',
    '#CB7BFC',
    '#229FFC',
    '#FC7B7B',
    '#6A00A0',
    '#208A89',
    '#B7C7E6',
    '#FFCB32',
    '#FF7656',
    '#83D0EF',
    '#E0CEFF',
    '#73DEB3',
    '#FFA8CC',
    '#00CAD7',
]

export default function Home() {
    const { userInfo } = useSelector(state => state.user)
    const [studentsList, setStudentsList] = useState([])
    const [askList, setAskList] = useState([])
    useEffect(() => {
        (async () => {
            const { data } = await getStudentByClassId(userInfo.classId)
            setStudentsList(data)
        })()
    }, [userInfo.classId])
    useEffect(() => {
        (async () => {
            const { data } = await getAskByStuId(userInfo._id)
            setAskList(data)
        })()
    }, [userInfo._id])
    const scoresNameList = []
    const scoresValueList = []
    if (userInfo.scores) {
        for (const key in userInfo.scores) {
            scoresNameList.push(key)
            scoresValueList.push(userInfo.scores[key])
        }
    }
    const options = {
        series: [{
            data: scoresValueList
        }],
        labels: scoresNameList,
        legend: {
            show: false,
        },
        chart: {
            toolbar: {
                show: false
            }
        },
        tooltip: {
            intersect: false,
            y: {
                title: {
                    formatter() {
                        return ''
                    },
                },
            },
        },
        colors: CHART_COLOR_LIST,
        plotOptions: {
            bar: {
                columnWidth: '25%',
                distributed: true,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
        }
    }
    let passNumber = 0
    let noPassNumber = 0
    askList.forEach(item => {
        if (item.isPass) {
            passNumber++
        } else {
            noPassNumber++
        }
    })
    return (
        userInfo._id ?
            (<div style={{
                width: '100%',
                height: '100%',
                minWidth: '1024px',
                overflowY: 'scroll'
            }} >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <div
                        style={
                            {
                                width: '40%',
                                height: '240px',
                                border: '1px solid #ccc',
                                backgroundColor: '#fff'
                            }
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #ccc',
                                height: '40px',
                                padding: '0 16px'
                            }}
                        >
                            <p>
                                成绩
                            </p>
                            <div
                                style={{
                                    height: '40px',
                                    lineHeight: '40px'
                                }}
                            >
                                <NavLink to={'/score'} >
                                    详情
                                </NavLink>
                            </div>
                        </div>
                        <div
                            style={{
                                height: '200px'
                            }}
                        >
                            <Chart
                                type="bar"
                                options={options}
                                series={options.series}
                                height="100%"
                            />
                        </div>
                    </div>
                    <div
                        style={
                            {
                                width: '40%',
                                height: '240px',
                                border: '1px solid #ccc',
                                backgroundColor: '#fff'
                            }
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #ccc',
                                height: '40px',
                                padding: '0 16px'
                            }}
                        >
                            <p>
                                请销假
                            </p>
                            <div
                                style={{
                                    height: '40px',
                                    lineHeight: '40px'
                                }}
                            >
                                <NavLink to={'/askforleave'} >
                                    详情
                                </NavLink>
                            </div>
                        </div>
                        <div
                            style={{
                                height: '200px',
                            }}
                        >
                            <div
                                style={{
                                    height: '200px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        borderRight: '1px solid #eee',
                                        height: '100%',
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <p
                                        style={
                                            {
                                                fontSize: '32px',
                                                color: '#333',
                                                height: '48px',
                                                padding: 0,
                                                margin: 0
                                            }
                                        }
                                    >未审批</p>
                                    <p
                                        style={{
                                            fontSize: '32px',
                                            color: '#dc3545',
                                            height: '48px',
                                            padding: 0,
                                            margin: '16px 0 0 0 '
                                        }}
                                    >{noPassNumber}</p>
                                </div>
                                <div
                                    style={{
                                        borderRight: '1px solid #eee',
                                        height: '100%',
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <p
                                        style={
                                            {
                                                fontSize: '32px',
                                                color: '#333',
                                                height: '48px',
                                                padding: 0,
                                                margin: 0
                                            }
                                        }
                                    >已审批</p>
                                    <p
                                        style={{
                                            fontSize: '32px',
                                            color: '#1a8754',
                                            height: '48px',
                                            padding: 0,
                                            margin: '16px 0 0 0 '
                                        }}
                                    >{passNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: '90%',
                        padding: '0 32px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        margin: '100px auto'
                    }}
                >
                    <p
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '24px'
                        }}
                    >我的同学</p>
                    <List
                        itemLayout="horizontal"
                        dataSource={[...studentsList]}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={item.name}
                                    description={item.description ?? '这个人很懒 什么都没留下'}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>) : null
    )
}
