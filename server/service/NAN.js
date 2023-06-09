const { addNAN, deleteNANById, getAllNAN, getAllNANByPage, updateNAN,getNANById } = require('../dao/NANDao');

// 新增新闻
module.exports.addNANService = async function (data) {
    return await addNAN(data)
}

// 删除新闻
module.exports.deleteNANByIdService = async function (id) {
    return await deleteNANById(id)
}

// 修改新闻
module.exports.updateNANService = async function(id, data){
    return await updateNAN(id, data)
}

// 获取全部新闻
module.exports.getAllNANService = async function(){
    return await getAllNAN();
}

// 分页获取新闻
module.exports.getAllNANByPageByPageService = async function(pageInfo){
    return await getAllNANByPage(pageInfo)
}

// 根据id获取新闻
module.exports.getNANByIdService = async function(id){
    return await getNANById(id)
}