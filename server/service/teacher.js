const {
    addTeacher,
    deleteTeacher,
    getAllTeacher,
    getTeacherById,
    getTeacherByPage,
    updateTeacher,
    isExistTeacher
} = require('../dao/teacherDao')
const md5 = require('md5')
// 新增一个教师
module.exports.addTeacherService = async function (data) {
    data.loginPwd = md5(data.loginPwd)
    return await addTeacher(data)
}

// 删除一个教师
module.exports.deleteTeacherService = async function (id) {
    return await deleteTeacher(id)
}

// 修改一个教师
module.exports.updateTeacherService = async function (id, data) {
    data.loginPwd = md5(data.loginPwd)
    return await updateTeacher(id, data)
}

// 查询所有教师
module.exports.getAllTeacherService = async function () {
    return await getAllTeacher();
}

// 分页获取教师信息
module.exports.getTeacherByPageService = async function (pageInfo) {
    return await getTeacherByPage(pageInfo)
}

//根据id获取教师
module.exports.getTeacherByIdService = async function (id) {
    return await getTeacherById(id)
}

// 判断教师是否存在
module.exports.isExistTeacherService =  async function (teacherInfo){
    return await isExistTeacher(teacherInfo)
}