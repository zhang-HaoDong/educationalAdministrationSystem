const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');
const {
    addStudentService,
    deleteStudentByIdService,
    getAllStudentService,
    getStudentByIdService,
    getStudentByPageService,
    getStudentByTeacherIdService,
    updateStudentService,
    isExistStudentService
} = require('../service/student');
const md5 = require('md5');

// 注册
router.post('/register', async (req,res) => {
    const resInfo = req.body;
    res.send(getResult(await addStudentService(resInfo)))
})

// 登陆
router.post('/login',async (req,res) => {
    res.send(getResult(await isExistStudentService(req.body)))
})

// 获取所有的学生信息
router.get('/',async (req,res,next) => {
    const data = await getAllStudentService();
    res.send(getResult(data))
})


// 删除学生
router.delete('/:id',async (req,res,next) => {
    const data = await deleteStudentByIdService(req.params.id)
    res.send(getResult(data))
})

// 根据学生id获取信息
router.get('/:id',async (req,res) => {
    const data = await getStudentByIdService(req.params.id);
    res.send(getResult(data))
})

//根据教师id获取学生信息
router.get('/teacher/:id',async (req,res) => {
    res.send(getResult(await getStudentByTeacherIdService(req.params.id)))
})

// 更新学生信息
router.patch('/:id',async (req,res) => {
    const data = await updateStudentService(req.params.id,req.body)
    res.send(getResult(data))
})

// 分页获取信息
router.get('/',async (req,res) => {
    const data = await getStudentByPageService(req.query)
    res.send(getResult(data))
})

module.exports = router;