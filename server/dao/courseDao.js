// 引入课程模型
const { Course } = require('../models');

// 新增课程
module.exports.addCourse = async function (courseInfo) {
    return await Course.create({
        ...courseInfo,
    })
}

// 删除课程
module.exports.deleteCourse = async function (id) {
    return await Course.deleteOne({
        _id: id
    })
}

// 根据majorID查询课程
module.exports.getAllCourse = async function (majorId) {
    return await Course.find(
        {
            majorId
        }
    ).sort();
}

// 修改课程名称
module.exports.updateCourse = async function (id, courseInfo) {
    return await Course.updateOne({
        _id: id
    }, {
        ...courseInfo
    })
}

// 根据id查询课程
module.exports.getCourseById = async function (id) {
    return Course.findById(id)
}