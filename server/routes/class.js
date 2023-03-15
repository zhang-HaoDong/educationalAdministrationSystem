const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');

const {
    addClassService,
    deleteClassService,
    getClassService,
    updateClassService
} = require('../service/class')

// 新增一个班级
router.post('/', async (req, res, next) => {
    const data = await addClassService(req.body.className);
    res.send(getResult(data))
})

// 删除一个班级
router.delete('/:id', async (req, res, next) => {
    const data = await deleteClassService(req.params.id);
    res.send(getResult(data))
})

// 查询所有的班级
router.get('/', async (req, res, next) => {
    const data = await getClassService();
    res.send(getResult(data))
})

// 修改班级信息
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const classInfo = req.body;
    const data = await updateClassService(id, classInfo.className);
    res.send(getResult(data));
})


module.exports = router;