const { Student } = require('../models')

// 添加一个学生
module.exports.addStudent = async function (data) {
    return await Student.create({
        ...data,
    })
}

// 删除一个学生
module.exports.deleteStudentById = async function (id) {
    return await Student.deleteOne({
        _id: id
    })
}

// 修改一个学生的信息
module.exports.updateStudent = async function (id, data) {
    return await Student.updateOne({
        _id: id
    }, {
        ...data
    })
}

// 获取所有学生信息
module.exports.getAllStudent = async function () {
    return await Student.find()
}

// 分页获取所有学生
module.exports.getStudentByPage = async function ({ current, pageSize }) {
    return await Student.find().limit(pageSize).skip((current - 1) * pageSize)
}

// 根据教师ID分页获取所有学生
module.exports.getStudentByTeacherId = async function ({ current, pageSize }) {
    return await Student.find().limit(pageSize).skip((current - 1) * pageSize)
}

// 根据id查询学生
module.exports.getStudentById = async function (id) {
    return await Student.findById(id)
}

// 登陆判断学生是否存在
module.exports.isExistStudent = async function (stuInfo) {
    return await Student.findOne(stuInfo);
}

//  根据字段判断学生是否存在
module.exports.isExist = async function (stuInfo) {
    return await Student.exists(stuInfo)
}