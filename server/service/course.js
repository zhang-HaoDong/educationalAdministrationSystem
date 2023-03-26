const { addCourse,
    deleteCourse,
    getAllCourse,
    updateCourse,
    getCourseById } = require('../dao/courseDao');

//新增课程
module.exports.addCourseService = async function (courseInfo) {
    return await addCourse(courseInfo);
}

// 删除课程
module.exports.deleteCourseService = async function (id) {
    return await deleteCourse(id);
}

// 查询所有课程
module, exports.getCourseService = async function () {
    return await getAllCourse();
}

// 修改课程信息
module.exports.updateCourseService = async function (id, courseInfo) {
    return await updateCourse(id, courseInfo)
}

// 根据id获取课程
module.exports.getCourseByIdService = async function (id) {
    return await getCourseById(id)
}