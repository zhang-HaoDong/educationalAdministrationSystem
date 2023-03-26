// 引入请销假模型
const { AskForLeave } = require("../models")


/**
 * 新增请假信息
 * @param {请假信息} leaveRequestInfo 
 * @returns 新增数据
 */
module.exports.addLeaveRequestDao = async function (leaveRequestInfo) {
    return await AskForLeave.create({
        ...leaveRequestInfo
    })
}

// 查询请销假信息 1：根据学生Id查 2：根据教师id查
/**
 * 根据学生Id获取所有的请假数据
 * @param {String} stuId 
 * @returns 学生的所有请假信息
 */
module.exports.getLeaveRequestByStuIdDao = async function (stuId) {
    return await AskForLeave.find({
        stuId,
    })
}

/**
 * 根据教师Id获取所有的请假数据
 * @param {String} tecId 
 * @returns 教师的所有请假信息
 */
module.exports.getLeaveRequestByTecIdDao = async function (tecId) {
    return await AskForLeave.find({
        tecId,
    })
}

/**
 * 分页获取请假信息
 * @param {Object} pageInfo 分页信息
 * @returns 分页返回数据
 */
module.exports.getAllLeaveRequestDao = async function (pageInfo) {
    const current = (pageInfo.current - 1) * pageInfo.pageSize
    return await AskForLeave.find().skip(current).limit(pageInfo.pageSize)
}

/**
 * 根据id修改假条信息
 * @param {String} id 假条id
 * @param {Object} requestInfo 假条信息
 * @returns 
 */
module.exports.updateLeaveRequestDao = async function (id, requestInfo) {
    return await AskForLeave.updateOne({
        _id: id
    }, {
        ...requestInfo
    })
}

/**
 * 根据id删除请假信息
 * @param {String} id 
 * @returns 
 */
module.exports.deleteLeaveRequestDao = async function (id) {
    return await AskForLeave.deleteOne({
        _id: id
    })
}
