import {useSelector} from 'react-redux'
import {Table} from 'antd'
export default function ScoresSearch() {
    const userInfo = useSelector(state => state.user.userInfo)
    const columns = [
        {
            title:'科目名称',
            dataIndex:'subName',
            align:'center',
        },
        {
            title:'成绩',
            dataIndex:'score',
            align:'center',
            sorter: (a, b) => Number(a.score) - Number(b.score),
        },
        {
            title:'绩点',
            dataIndex:'gPoint',
            align:'center',
            sorter: (a, b) => Number(a.gPoint) - Number(b.gPoint),
        }
    ]
    function getDataSource(){
        const dataSource = []
        let i = 0
        for (const key in userInfo.scores) {
            dataSource.push({
                key:i ++,
                subName:key,
                score:userInfo.scores[key],
                gPoint:userInfo.scores[key] >= 60?((userInfo.scores[key] - 60) / 10 + 1):0
            })
        }
        return dataSource
    }
    const data = getDataSource()
    
    return (
        <div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
}
