const {
    addLeaveRequestDao,
    getLeaveRequestByStuIdDao,
    getLeaveRequestByTecIdDao,
    getAllLeaveRequestDao,
    updateLeaveRequestDao,
    deleteLeaveRequestDao,
} = require('../dao/askForLeaveDao');
const { getStudentById } = require('../dao/studentDao')
const { getTeacherById } = require('../dao/teacherDao')

// 添加一个请销假信息
module.exports.addLeaveRequestService = async function (leaveRequestInfo) {
    return await addLeaveRequestDao(leaveRequestInfo);
}

// 根据学生Id查找所有的请销假信息
module.exports.getLeaveRequestByStuIdService = async function (stuId) {
    return await getLeaveRequestByStuIdDao(stuId)
}

// 根据教师Id查找所有的请销假信息
module.exports.getLeaveRequestByTecIdService = async function (tecId) {
    return await getLeaveRequestByTecIdDao(tecId)
}

// 分页获取所有的请假信息
module.exports.getAllLeaveRequestService = async function (isPass, pageInfo = {
    current: 1,
    pageSize: 10
}) {
    const res = await getAllLeaveRequestDao(isPass, pageInfo)
    const data = res.map(async (item) => {
        const studentName = await getStudentById(item.stuId)
        const teacherName = await getTeacherById(item.tecId)
        if (teacherName && studentName) {
            return {
                ...item._doc,
                studentName: studentName.name,
                teacherName: teacherName.name
            }
        }
        return {
            ...item._doc,
            studentName: '-',
            teacherName: '-'
        }
    })
    return await Promise.all(data)
}

// 根据id修改假条信息
module.exports.updateLeaveRequestService = async function (id, requestInfo) {
    return await updateLeaveRequestDao(id, requestInfo)
}

// 根据id删除假条信息
module.exports.deleteLeaveRequestService = async function (id) {
    return await deleteLeaveRequestDao(id)
}