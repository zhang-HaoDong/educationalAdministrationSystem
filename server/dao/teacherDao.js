const { Teacher } = require('../models')

// 添加一个教师信息
export async function addTeacher(data) {
    return await Teacher.create({
        ...data
    })
}

// 删除一个教师信息
export async function deleteTeacher(id) {
    return await Teacher.deleteOne({
        _id: id
    })
}

// 修改一个教师信息
export async function updateTeacher(id, data) {
    return await Teacher.updateOne({
        _id: id
    }, {
        ...data
    })
}

// 查看所有教师信息
export async function getAllTeacher() {
    return await Teacher.find();
}

// 分页获取所有的教师
export async function getTeacherByPage({ current, pageSize }) {
    return await Teacher.find().skip((current - 1) * pageSize).limit(pageSize)
}

// 根据id查询教师
export async function getTeacherById(id){
    return await Teacher.findById(id)
}