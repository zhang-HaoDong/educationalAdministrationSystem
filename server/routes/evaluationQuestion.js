const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');
const {
    addEvaluationQuestionService,
    deleteEvaluationByIdService,
    getAllEvaluationService,
    getEvaluationQuestionByIdService,
    updateEvaluationQuestionService
} = require('../service/evaluationQuestion')

// 获取所有的评教问题信息
router.get('/',async (req,res,next) => {
    const data = await getAllEvaluationService();
    res.send(getResult(data))
})

// 新增评教问题信息
router.post('/', async (req,res,next) => {
    const data = await addEvaluationQuestionService(req.body);
    res.send(getResult(data))
})

// 删除评教问题
router.delete('/:id',async (req,res,next) => {
    const data = await deleteEvaluationByIdService(req.params.id)
    res.send(getResult(data))
})

// 根据评教问题id获取信息
router.get('/:id',async (req,res) => {
    const data = await getEvaluationQuestionByIdService(req.params.id);
    res.send(getResult(data))
})

// 更新评教问题信息
router.patch('/:id',async (req,res) => {
    const data = await updateEvaluationQuestionService(req.params.id,req.body)
    res.send(getResult(data))
})

module.exports = router;