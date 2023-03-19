const { NAN } = require('../models')

// 添加一条新闻
module.exports.addNAN = async function (data) {
    return await NAN.create({
        ...data
    })
}

// 删除一条新闻
module.exports.deleteNANById = async function (id) {
    return await NAN.deleteOne({
        _id: id
    })
}

// 修改一条新闻
module.exports.updateNAN = async function (id, data) {
    return await NAN.updateOne({
        _id: id
    }, {
        ...data
    })
}

// 获取所有的新闻
module.exports.getAllNAN = async function () {
    return await NAN.find()
}

// 分页获取所有的新闻
module.exports.getAllNANByPage = async function ({ current, pageSize }) {
    return await NAN.find().limit(pageSize).skip((current - 1) * pageSize)
}