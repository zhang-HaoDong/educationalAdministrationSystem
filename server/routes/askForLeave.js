const express = require('express');
const router = express.Router();
const { getResult } = require('../utils/getSendResult')
const {
  addLeaveRequestService,
  getLeaveRequestByStuIdService,
  getLeaveRequestByTecIdService,
  getAllLeaveRequestService,
  updateLeaveRequestService,
  deleteLeaveRequestService
} = require('../service/askForLeave')

// 新增请假信息
router.post('/', async (req, res, next) => {
  // 获取请假信息数据
  const leaveRequestInfo = req.body;
  const data = await addLeaveRequestService(leaveRequestInfo);
  res.send(getResult(data))
});

// 根据学生Id获取所有的请假信息
router.get('/stu/:id', async (req, res, next) => {
  // 获取学生的Id
  const stuId = req.params.id;
  const data = await getLeaveRequestByStuIdService(stuId);
  res.send(getResult(data));
})

//根据教师Id获取所有的请假信息
router.get('/tec/:id', async (req, res, next) => {
  // 获取学生的Id
  const tec = req.params.id;
  const data = await getLeaveRequestByTecIdService(tec);
  res.send(getResult(data));
})

// 获取所有的请销假信息
router.get('/', async (req, res, next) => {
  const pageInfo = {};
  pageInfo.current = req.query.current;
  pageInfo.pageSize = req.query.pageSize;
  const data = await getAllLeaveRequestService(pageInfo);
  res.send(getResult(data))
})

// 修改假条信息
router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const requestInfo = req.body;
  const data = await updateLeaveRequestService(id, requestInfo);
  res.send(getResult(data))
})

// 删除请假条信息
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  const data = await deleteLeaveRequestService(id);
  res.send(getResult(data))
})
module.exports = router;
