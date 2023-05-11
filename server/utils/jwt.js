const jwt = require('jsonwebtoken');
const JWT_SERCRET = 'fk817z2c';

module.exports.publishJWT = function (res, info = {}, maxage = 3600) {
    const token = jwt.sign({ ...info }, JWT_SERCRET, {
        expiresIn: maxage
    })
    res.header('authorization', token)
}

module.exports.vertifyJWT = function (req) {
    const token = req.headers.authorization;
    if (!token) {
        return null;
    }
    try {
        const info = jwt.verify(token.split(' ')[1], JWT_SERCRET)
        return info._doc;
    } catch {
        // token已过期
        return null;
    }
}