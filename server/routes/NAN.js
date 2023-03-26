const router = require('express').Router();
const { getResult } = require('../utils/getSendResult');
const {
    addNANService,
    deleteNANByIdService,
    getAllNANByPageByPageService,
    getAllNANService,
    updateNANService,
    getNANByIdService
} = require('../service/NAN')

// 获取所有的新闻信息
router.get('/',async (req,res,next) => {
    const data = await getAllNANService();
    res.send(getResult(data))
})

// 新增新闻信息
router.post('/', async (req,res,next) => {
    const data = await addNANService(req.body);
    res.send(getResult(data))
})

// 删除新闻
router.delete('/:id',async (req,res,next) => {
    const data = await deleteNANByIdService(req.params.id)
    res.send(getResult(data))
})

// 根据新闻id获取信息
router.get('/:id',async (req,res) => {
    const data = await getNANByIdService(req.params.id);
    res.send(getResult(data))
})

// 更新新闻信息
router.patch('/:id',async (req,res) => {
    const data = await updateNANService(req.params.id,req.body)
    res.send(getResult(data))
})

// 分页获取信息
router.get('/',async (req,res) => {
    const data = await getAllNANByPageByPageService(req.query)
    res.send(getResult(data))
})

module.exports = router;