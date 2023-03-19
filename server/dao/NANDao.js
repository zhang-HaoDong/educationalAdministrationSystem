const { NAN } = require('../models')

// 添加一条新闻
export async function addNAN(data) {
    return await NAN.create({
        ...data
    })
}

// 删除一条新闻
export async function deleteNANById(id) {
    return await NAN.deleteOne({
        _id:id
    })
}

// 修改一条新闻
export async function updateNAN(id,data){
    return await NAN.updateOne({
        _id:id
    },{
        ...data
    })
}

// 获取所有的新闻
export async function getAllNAN(){
    return await NAN.find()
}

// 分页获取所有的新闻
export async function getAllNANByPage({current,pageSize}){
    return await NAN.find().limit(pageSize).skip((current - 1) * pageSize)
}