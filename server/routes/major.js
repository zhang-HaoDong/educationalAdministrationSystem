const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');
const {
    addMajorService,
    deleteMajorService,
    getAllMajorService,
    getMajorByIdService
} = require('../service/Major')

// 获取所有的专业信息
router.get('/', async (req, res, next) => {
    const data = await getAllMajorService();
    res.send(getResult(data))
})

//根据id查找专业
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const data = await getMajorByIdService(id);
    res.send(getResult(data))
})

// 添加一个专业
router.post('/', async (req, res, next) => {
    const majorInfo = req.body
    const data = await addMajorService(majorInfo)
    res.send(getResult(data))
})

// 删除一个专业
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await deleteMajorService(id);
    res.send(getResult(data))
})

module.exports = router;