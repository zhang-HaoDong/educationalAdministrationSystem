const { Student } = require('../models')

// 添加一个学生
export async function addStudent(data) {
    return await Student.create({
        ...data,
    })
}

// 删除一个学生
export async function deleteStudentById(id) {
    return await Student.deleteOne({
        _id: id
    })
}

// 修改一个学生的信息
export async function updateStudent(id, data) {
    return await Student.updateOne({
        _id: id
    }, {
        ...data
    })
}

// 获取所有学生信息
export async function getAllStudent() {
    return await Student.find()
}

// 分页获取所有学生
export async function getStudentByPage({ current, pageSize }) {
    return await Student.find().limit(pageSize).skip((current - 1) * pageSize)
}

// 根据教师ID分页获取所有学生
export async function getStudentByTeacherId({ current, pageSize }) {
    return await Student.find().limit(pageSize).skip((current - 1) * pageSize)
}

// 根据id查询学生
