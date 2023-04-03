// 引入班级模型
const { Class } = require('../models');

// 新增班级
module.exports.addClass = async function (classInfo) {
    return await Class.create({
        ...classInfo
    })
}

// 删除班级
module.exports.deleteClass = async function (id) {
    return await Class.deleteOne({
        _id: id
    })
}

// 查询所有班级
module.exports.getAllClass = async function () {
    return await Class.find().sort();
}

// 修改班级名称
module.exports.updateClass = async function (id, classInfo) {
    return await Class.updateOne({
        _id: id
    }, {
        ...classInfo
    })
}

// 根据id查询班级
module.exports.getClassById = async function (id) {
    return await Class.findById(id)
}

// 根据专业id查找班级
module.exports.getClassByMajorId = async function (marjorId) {
    return await Class.find({
        majorId: marjorId
    })
}