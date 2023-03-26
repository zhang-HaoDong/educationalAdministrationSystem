// 引入课程模型
const { Course } = require('../models');

// 新增课程
module.exports.addCourse = async function (courseName) {
    return await Course.create({
        courseName,
    })
}

// 删除课程
module.exports.deleteCourse = async function (id) {
    return await Course.deleteOne({
        _id: id
    })
}

// 查询所有课程
module.exports.getAllCourse = async function () {
    return await Course.find().sort();
}

// 修改课程名称
module.exports.updateCourse = async function (id, courseName) {
    return await Course.updateOne({
        _id: id
    }, {
        courseName
    })
}

// 根据id查询课程
module.exports.getCourseById = async function (id) {
    return Course.findById(id)
}