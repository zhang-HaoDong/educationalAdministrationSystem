const router = require('express').Router();
const { getResult } = require('../utils/getSendResult')
const {
    addClassScheduleService,
    deleteClassScheduleService,
    getClassScheduleService,
    updateClassScheduleService
} = require('../service/classSchedule')

// 新增一条课表信息
router.post('/', async (req, res, next) => {
    const info = req.body.courses;
    const data = await addClassScheduleService(info);
    res.send(getResult(data))
})

// 删除一条课表信息
router.delete('/:id', async (req, res, next) => {
    const data = await deleteClassScheduleService(req.params.id);
    res.send(getResult(data))
})

// 查询所有课表信息
router.get('/', async (req, res, next) => {
    const data = await getClassScheduleService();
    res.send(getResult(data))
})

// 修改一条课表信息
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const info = req.body.courses;
    const data = await updateClassScheduleService(id,info);
    res.send(getResult(data))
})
module.exports = router;