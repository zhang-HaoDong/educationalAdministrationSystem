const { addStudent, deleteStudentById, getAllStudent, getStudentById, getStudentByPage, getStudentByTeacherId, updateStudent } = require('../dao/studentDao')
const md5 = require('md5')
// 新增一个学生
module.exports.addStudentService = async function (data) {
    data.loginPwd = md5(data.loginPwd)
    return await addStudent(data)
}

// 删除一个学生
module.exports.deleteStudentByIdService = async function (id) {
    return await deleteStudentById(id)
}

// 修改一个学生
module.exports.updateStudentService = async function (id, data) {
    data.loginPwd = md5(data.loginPwd)
    return await updateStudent(id, data)
}

// 获取所有的学生
module.exports.getAllStudentService = async function () {
    return await getAllStudent()
}

// 分页获取所有学生
module.exports.getStudentByPageService = async function(pageInfo){
    return await getStudentByPage(pageInfo)
}

// 根据教师id获取学生
module.exports.getStudentByTeacherIdService = async function(teacherId){
    return await getStudentByTeacherId(teacherId)
}

// 根据学生id获取学生信息
module.exports.getStudentByIdService = async function(id){
    return await getStudentById(id)
}