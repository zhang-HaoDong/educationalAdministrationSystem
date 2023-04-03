const {
    addMajor,
    deleteMajor,
    getAllMajors,
    getMajorById
} = require('../dao/majorDao')

exports.addMajorService = async function (majorInfo) {
    return await addMajor(majorInfo)
}

exports.deleteMajorService = async function (id) {
    return await deleteMajor(id)
}

exports.getAllMajorService = async function () {
    return await getAllMajors()
}

exports.getMajorByIdService = async function (id) {
    return await getMajorById(id)
}