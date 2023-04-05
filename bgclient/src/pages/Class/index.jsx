import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Select } from 'antd'
import { useEffect, useRef, useState } from 'react';
import { getAllMajor } from '../../services/major'
const Class = () => {
    const [majors, setMajors] = useState([])
    const [curmajorId, setCurmajorId] = useState('')
    const formRef = useRef()

    useEffect(() => {
        // 获取全部专业
        (async () => {
            const { data } = await getAllMajor();
            setMajors(data)
        })()
    }, [])

    function handleChange(e) {
        setCurmajorId(e)
    }
    // 获取专业下拉选项
    const majorsOptions = majors.map(item => ({
        label: item.majorName,
        value: item._id
    }))
    return (
        <PageContainer>
            <Select
                placeholder='请选择专业'
                value={curmajorId}
                style={{ width: 240 }}
                onChange={handleChange}
                options={majorsOptions}
            />
            <ProTable
                scroll={{ x: 2000 }}
                actionRef={formRef}
                headerTitle='班级列表'
                columns={columns}
                rowKey={(row) => row._id}
                pagination={{
                    showQuickJumper: true,
                    ...pagination,
                    onChange: handlePageChange
                }}
                request={async (params) => {
                    const res = await getStudentByPage(params);
                    return {
                        success: !res.code,
                        data: res.data,
                        total: res.data.length,
                    }
                }}
            />
        </PageContainer>
    );
};

export default Class;
