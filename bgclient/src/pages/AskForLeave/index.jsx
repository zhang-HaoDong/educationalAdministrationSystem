import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef} from 'react'
import {} from '../../services/askForLeave'
const HomePage = () => {
    const formRef = useRef()
    const columns = [
        {
            title: '序号',
            align: 'center',
            redner: (text, row, index) => index + 1
        }
    ]
    return (
        <PageContainer>
            <ProTable
                scroll={{ x: 2000 }}
                actionRef={formRef}
                headerTitle='请销假'
                columns={columns}
                rowKey={(row) => row._id}
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

export default HomePage;
