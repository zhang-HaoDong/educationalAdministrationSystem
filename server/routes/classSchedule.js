const router = require('express').Router();
const { getResult } = require('../utils/getSendResult')
const {
    addClassScheduleService,
    deleteClassScheduleService,
    getClassScheduleService,
    updateClassScheduleService,
    getClassScheduleByIdService
} = require('../service/classSchedule')

// 新增一条课表信息
router.post('/', async (req, res, next) => {
    const info = req.body;
    const data = await addClassScheduleService(info);
    res.send(getResult(data))
})

// 删除一条课表信息
router.delete('/:id', async (req, res, next) => {
    const data = await deleteClassScheduleService(req.params.id);
    res.send(getResult(data))
})

// 根据classid查找
router.get('/class/:id', async (req, res, next) => {
    const data = await getClassScheduleService(req.params.id);
    res.send(getResult(data))
})

// 修改一条课表信息
router.patch('/class/:id', async (req, res, next) => {
    const id = req.params.id;
    const info = req.body;
    const data = await updateClassScheduleService(id,info);
    res.send(getResult(data))
})

// 根据课表id获取课表
router.get('/:id', async (req,res,next) => {
    const data = await getClassScheduleByIdService(req.params.id);
    res.send(getResult(data))
})
module.exports = router;