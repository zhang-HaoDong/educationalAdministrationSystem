const {
    addStudent,
    deleteStudentById,
    getAllStudent,
    getStudentById,
    getStudentByPage,
    getStudentByTeacherId,
    updateStudent,
    isExistStudent,
    isExist,
    getStudentByClassId
} = require('../dao/studentDao')
const {
    getClassById
} = require('../dao/classDao')
const {
    getMajorById
} = require('../dao/majorDao')
const { getTeacherById } = require('../dao/teacherDao')
const md5 = require('md5')
// 新增(注册)一个学生
module.exports.addStudentService = async function (data) {
    if (data.loginPwd) {
        data.loginPwd = md5(data.loginPwd)
    }
    return await addStudent(data)
}

// 登陆
module.exports.stuLoginService = async function (loginInfo) {
    // 首先对密码进行加密
    if (loginInfo.loginPwd) {
        loginInfo.loginPwd = md5(loginInfo.loginPwd);
    }
    // 判断学生是否存在
    return await isExistStudent(loginInfo)
}

// 删除一个学生
module.exports.deleteStudentByIdService = async function (id) {
    return await deleteStudentById(id)
}

// 修改一个学生
module.exports.updateStudentService = async function (id, data) {
    if (data.loginPwd) {
        data.loginPwd = md5(data.loginPwd)
    }
    return await updateStudent(id, data)
}

// 获取所有的学生
module.exports.getAllStudentService = async function () {
    return await getAllStudent()
}

// 分页获取所有学生
module.exports.getStudentByPageService = async function (pageInfo) {
    const res = await getStudentByPage(pageInfo);
    const data = res.map(async (item) => {
        const { className } = await getClassById(item.classId);
        const { majorName } = await getMajorById(item.majorId)
        return {
            ...item._doc,
            className: className,
            majorName: majorName
        }
    })
    return await Promise.all(data)
}

// 根据教师id获取学生
module.exports.getStudentByTeacherIdService = async function (teacherId) {
    return await getStudentByTeacherId(teacherId)
}

// 根据学生id获取学生信息
module.exports.getStudentByIdService = async function (id) {
    const res = await getStudentById(id)
    const { className } = await getClassById(res.classId);
    const { majorName } = await getMajorById(res.majorId);
    const { name } = await getTeacherById(res.counselorId);
    const newRes = {
        ...res._doc,
        className,
        majorName,
        teacherName: name
    }
    return newRes
}

// 根据字段判断学生是否存在
module.exports.isExistService = async function (stuInfo) {
    return await isExist(stuInfo);
}

// 班级id获取学生
module.exports.getStudentByClassId = async function (classId) {
    const res = await getStudentByClassId(classId)
    const data = res.map(async (item) => {
        const { className } = await getClassById(item.classId);
        const { majorName } = await getMajorById(item.majorId)
        return {
            ...item._doc,
            className: className,
            majorName: majorName
        }
    })
    return await Promise.all(data)
}