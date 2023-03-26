const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');
const {
    addTeacherService,
    deleteTeacherService,
    getAllTeacherService,
    getTeacherByIdService,
    getTeacherByPageService,
    updateTeacherService,
    isExistTeacherService
} = require('../service/teacher');

// 注册
router.post('/register', async (req,res) => {
    const resInfo = req.body;
    res.send(getResult(await addTeacherService(resInfo)))
})

// 登陆
router.post('/login',async (req,res) => {
    res.send(getResult(await isExistTeacherService(req.body)))
})

// 获取所有的教师信息
router.get('/',async (req,res,next) => {
    const data = await getAllTeacherService();
    res.send(getResult(data))
})


// 删除教师
router.delete('/:id',async (req,res,next) => {
    const data = await deleteTeacherService(req.params.id)
    res.send(getResult(data))
})

// 根据教师id获取信息
router.get('/:id',async (req,res) => {
    const data = await getTeacherByIdService(req.params.id);
    res.send(getResult(data))
})

// 更新教师信息
router.patch('/:id',async (req,res) => {
    const data = await updateTeacherService(req.params.id,req.body)
    res.send(getResult(data))
})

// 分页获取信息
router.get('/',async (req,res) => {
    const data = await getTeacherByPageService(req.query)
    res.send(getResult(data))
})

module.exports = router;