const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'helloiamavhradipghosh', (err, user) => {
        if (err) {
            res.sendStatus(403)
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken