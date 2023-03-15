const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');

const {
    addCourseService,
    deleteCourseService,
    getCourseService,
    updateCourseService
} = require('../service/course')

// 新增一个班级
router.post('/', async (req, res, next) => {
    const data = await addCourseService(req.body.courseName);
    res.send(getResult(data))
})

// 删除一个班级
router.delete('/:id', async (req, res, next) => {
    const data = await deleteCourseService(req.params.id);
    res.send(getResult(data))
})

// 查询所有的班级
router.get('/', async (req, res, next) => {
    const data = await getCourseService();
    res.send(getResult(data))
})

// 修改班级信息
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const courseInfo = req.body;
    const data = await updateCourseService(id, courseInfo.courseName);
    res.send(getResult(data));
})


module.exports = router;