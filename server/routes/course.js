const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');

const {
    addCourseService,
    deleteCourseService,
    getCourseService,
    updateCourseService,
    getCourseByIdService
} = require('../service/course')

// 新增一个课程
router.post('/', async (req, res, next) => {
    const data = await addCourseService(req.body);
    res.send(getResult(data))
})

// 删除一个课程
router.delete('/:id', async (req, res, next) => {
    const data = await deleteCourseService(req.params.id);
    res.send(getResult(data))
})

// 查询所有的课程
router.get('/:id', async (req, res, next) => {
    const majorId = req.params.id;
    const data = await getCourseService(majorId);
    res.send(getResult(data))
})

// 修改课程信息
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const courseInfo = req.body;
    const data = await updateCourseService(id, courseInfo);
    res.send(getResult(data));
})

// 根据id获取课程信息
router.get(':/id',async (req, res, next) => {
    const data = await getCourseByIdService(req.params.id);
    res.send(getResult(data))
})

module.exports = router;