import AskForLeave from '../page/AskForLeave'
import Evaluation from '../page/Evaluation'
import Home from '../page/Home'
import Notice from '../page/Notice'
import NoticeDetail from '../page/Notice/NoticeDetail'
import Scores from '../page/Search/ScoresSearch'
import ClassSchedule from '../page/Search/ClassScheduleSearch'
import Personal from '../page/Personal'
import EvaluationDetail from '../page/Evaluation/EvaluationDetail'
import { Navigate, Route, Routes } from 'react-router-dom'

function RouteConfig() {
    return <Routes>
        <Route path='/' element={<Navigate to='/notice' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/notice' element={<Notice />} />
        <Route path='/notice/:id' element={<NoticeDetail />} />
        <Route path='/score' element={<Scores />} />
        <Route path='/classschedule' element={<ClassSchedule />} />
        <Route path='/askforleave' element={<AskForLeave />} />
        <Route path='/evaluation' element={<Evaluation />} />
        <Route path='/evaluationdetail' element={<EvaluationDetail />} />
        <Route path='/personal' element={<Personal />} />
    </Routes>
}
export default RouteConfig;