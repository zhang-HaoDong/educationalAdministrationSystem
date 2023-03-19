const { addClass, deleteClass, getAllClass, updateClass, getClassById } = require('../dao/classDao');

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

// 根据id查询班级
module.exports.getClassByIdService = async function (id){
    return await getClassById(id)
}