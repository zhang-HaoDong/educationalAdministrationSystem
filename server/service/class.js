const { addClass, deleteClass, getAllClass, updateClass } = require('../dao/classDao');

//新增班级
module.exports.addClassService = async function (className) {
    return await addClass(className);
}

// 删除班级
module.exports.deleteClassService = async function (id) {
    return await deleteClass(id);
}

// 查询所有班级
module, exports.getClassService = async function () {
    return await getAllClass();
}

// 修改班级信息
module.exports.updateClassService = async function (id, className) {
    return await updateClass(id, className)
}