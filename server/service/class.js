const {
    addClass,
    deleteClass,
    getAllClass,
    updateClass,
    getClassById,
    getClassByMajorId,
    getClassByCounselorIdId
} = require('../dao/classDao');

//新增班级
module.exports.addClassService = async function (classInfo) {
    return await addClass(classInfo);
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
module.exports.updateClassService = async function (id, classInfo) {
    return await updateClass(id, classInfo)
}

// 根据id查询班级
module.exports.getClassByIdService = async function (id) {
    return await getClassById(id)
}

// 根据专业id查询班级
module.exports.getClassByMajorIdService = async function (majorId) {
    return await getClassByMajorId(majorId)
}

// 根据辅导员id查询班级
module.exports.getClassByCounselorIdService = async function (counselorId) {
    return await getClassByCounselorIdId(counselorId)
}