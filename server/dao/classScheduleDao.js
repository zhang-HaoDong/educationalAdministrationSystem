const { ClassSchedule } = require('../models/');


// 新增一个课表
module.exports.addClassSchedule = async function (info) {
    return await ClassSchedule.create({
        ...info
    })
}

// 删除一个课表
module.exports.deleteClassSchedule = async function (id) {
    return await ClassSchedule.deleteOne({
        _id: id
    })
}

// 修改一个课表
module.exports.updateClassSchedule = async function (id, info) {
    return await ClassSchedule.updateOne({
        _id: id
    }, {
        ...info
    })
}

// 查询所有课表
module.exports.getClassSchedule = async function () {
    return await ClassSchedule.find()
}

// 根据id查询课表
module.exports.getClassScheduleById = async function(id){
    return await ClassSchedule.findById(id)
}