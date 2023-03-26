const {
    addClassSchedule,
    deleteClassSchedule,
    getClassSchedule,
    updateClassSchedule,
    getClassScheduleById
} = require('../dao/classScheduleDao')

// 新增一条课表信息
module.exports.addClassScheduleService = async function (info) {
    return await addClassSchedule(info);
}

// 删除一条课表信息
module.exports.deleteClassScheduleService = async function (id) {
    return await deleteClassSchedule({
        _id: id
    })
}

// 查询所有的课表
module.exports.getClassScheduleService = async function(){
    return await getClassSchedule();
}

// 修改课表信息
module.exports.updateClassScheduleService = async function(id,info){
    return await updateClassSchedule(id,info)
}

// 根据id查询课表
module.exports.getClassScheduleByIdService = async function(id){
    return await getClassScheduleById(id)
}