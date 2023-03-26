const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');
const {
    addEvaluationService,
    deleteEvaluationByIdService,
    getAllEvaluationByPageService,
    getAllEvaluationService,
    getEvaluationByStudentIdService,
    getEvaluationByTeacherIdService,
    getEvaluationByIdService
} = require('../service/evaluation')

// 获取所有的评教信息
router.get('/',async (req,res,next) => {
    const data = await getAllEvaluationService();
    res.send(getResult(data))
})

// 新增评教信息
router.post('/', async (req,res,next) => {
    const data = await addEvaluationService(req.body);
    res.send(getResult(data))
})

// 删除评教
router.delete('/:id',async (req,res,next) => {
    const data = await deleteEvaluationByIdService(req.params.id)
    res.send(getResult(data))
})

// 根据id获取评教
router.get('/:id',async (req,res) => {
    res.send(getResult(await getEvaluationByIdService(id)))
})
// 根据学生id获取信息
router.get('/:id',async (req,res) => {
    const data = await getEvaluationByStudentIdService(req.params.id);
    res.send(getResult(data))
})

// 根据教师id获取评教信息
router.get('/teacher/:id',async (req,res) => {
    res.send(getResult(await getEvaluationByTeacherIdService(req.params.id)))
})

// 分页获取所有评教
router.get('/',async (req,res) => {
    res.send(getResult(await getAllEvaluationByPageService(req.query)))
})
module.exports = router;