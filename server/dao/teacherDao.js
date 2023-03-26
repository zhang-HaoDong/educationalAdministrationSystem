const { Teacher } = require('../models')

// 添加一个教师信息
module.exports.addTeacher = async function (data) {
    return await Teacher.create({
        ...data
    })
}

// 删除一个教师信息
module.exports.deleteTeacher = async function (id) {
    return await Teacher.deleteOne({
        _id: id
    })
}

// 修改一个教师信息
module.exports.updateTeacher = async function (id, data) {
    return await Teacher.updateOne({
        _id: id
    }, {
        ...data
    })
}

// 查看所有教师信息
module.exports.getAllTeacher = async function () {
    return await Teacher.find();
}

// 分页获取所有的教师
module.exports.getTeacherByPage = async function ({ current, pageSize }) {
    return await Teacher.find().skip((current - 1) * pageSize).limit(pageSize)
}

// 根据id查询教师
module.exports.getTeacherById = async function (id) {
    return await Teacher.findById(id)
}

// 查询教师是否存在
module.exports.isExistTeacher = async function(teacherInfo){
    return await Teacher.exists(teacherInfo)
}