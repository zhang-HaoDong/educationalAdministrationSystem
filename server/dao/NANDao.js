// notice and news
const {NAN} = require('../models')

// 新增一个新闻与通知
export function addNAN(NANInfo){
    return NAN.create({
        ...NANInfo
    })
}

// 删除一个新闻与通知
export function deleteNAN(id){
    return NAN.deleteOne({
        _id:id
    })
}

// 修改一个新闻与通知
export function updateNAN(id,NANInfo){
    return NAN.updateOne({
        _id:id
    },{
        ...NANInfo
    })
}

// 查询所有新闻与通知
export function getAllNAN(){
    return NAN.find();
}