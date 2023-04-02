const router = require('express').Router();
const { getResult, getError } = require('../utils/getSendResult');
const {
    addStudentService,
    deleteStudentByIdService,
    getAllStudentService,
    getStudentByIdService,
    getStudentByPageService,
    getStudentByTeacherIdService,
    updateStudentService,
    stuLoginService,
    isExistService
} = require('../service/student');
const { publishJWT, vertifyJWT } = require('../utils/jwt')

// 注册
router.post('/register', async (req, res) => {
    const resInfo = req.body;
    res.send(getResult(await addStudentService(resInfo)))
})

// 登陆
router.post('/login', async (req, res) => {
    const data = await stuLoginService(req.body);
    if (data) {
        publishJWT(res, data)
    }
    res.send(getResult(data))
})

// 验证登陆
router.get('/whoami', async (req, res) => {
    const loginInfo = vertifyJWT(req)
    if (!loginInfo) {
        res.send(getError('token已失,请重新登陆', 500))
    } else {
        const userInfo = await getStudentByIdService(loginInfo._id)
        res.send(getResult(userInfo))
    }
})

// 获取所有的学生信息
router.get('/', async (req, res, next) => {
    const data = await getAllStudentService();
    res.send(getResult(data))
})


// 删除学生
router.delete('/:id', async (req, res, next) => {
    const data = await deleteStudentByIdService(req.params.id)
    res.send(getResult(data))
})

// 根据学生id获取信息
router.get('/:id', async (req, res) => {
    const data = await getStudentByIdService(req.params.id);
    res.send(getResult(data))
})

//根据教师id获取学生信息
router.get('/teacher/:id', async (req, res) => {
    res.send(getResult(await getStudentByTeacherIdService(req.params.id)))
})

// 更新学生信息
router.patch('/:id', async (req, res) => {
    const data = await updateStudentService(req.params.id, req.body)
    res.send(getResult(data))
})

// 分页获取信息
router.get('/', async (req, res) => {
    const data = await getStudentByPageService(req.query)
    res.send(getResult(data))
})

// 根据字段判断学生是否存在
router.post('/isexist', async (req, res) => {
    const stuInfo = req.body;
    const result = await isExistService(stuInfo);
    res.send(getResult(result))
})


module.exports = router;