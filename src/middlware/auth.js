const jwt = require('jsonwebtoken')
const Author = require('../models/author')

const auth = async(req, res, next) => {

    try {
        // 1 Bearer token
        // const t = req.header('Authorization')
        // console.log(t)

        const token = req.header('Authorization').replace('Bearer ', '')
            //  console.log(token)

        const decode = jwt.verify(token, 'node-course')
            //  console.log(decode)

        const author = await Author.findOne({ _id: decode._id, 'tokens.token': token })

        if (!author) {
            throw new Error('Invalid author')
        }

        req.author = author
        req.token = token

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate' })
    }
}

module.exports = auth