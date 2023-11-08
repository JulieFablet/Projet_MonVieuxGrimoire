const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'No token provided' })
        }

        const token = req.headers.authorization.split(' ')[1]

        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')

        const userId = decodedToken.userId

        req.auth = {
            userId: userId,
        }

        next()
    } catch (error) {
        console.log('Middleware Error:', error)
        res.status(401).json({ error: error.message })
    }
}