// 返回发生的错误结果
exports.getError = function (err = 'server error', errCode = 500) {
    return {
        code: errCode,
        msg: err instanceof Error ? err.message : err,
        data: null
    }
}

// 返回服务器的数据结果
exports.getResult = function (result) {
    return {
        code: 0,
        msg: '',
        data: result
    }
}