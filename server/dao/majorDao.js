const { Major } = require('../models')

exports.addMajor = async function (majorInfo) {
    return await Major.create(majorInfo)
}

exports.deleteMajor = async function (id) {
    return await Major.deleteOne({
        _id: id
    })
}

exports.getAllMajors = async function () {
    return await Major.find()
}

exports.getMajorById = async function (id) {
    return await Major.findById(id)
}