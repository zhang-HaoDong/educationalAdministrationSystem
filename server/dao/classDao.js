// 引入班级模型
const { Class } = require('../models');

// 新增班级
module.exports.addClass = async function (className) {
    return await Class.create({
        className,
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
module.exports.updateClass = async function (id, className) {
    return await Class.updateOne({
        _id: id
    }, {
        className
    })
}

