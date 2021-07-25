const express = require('express')
const Author = require('./models/author')

const app = express()

const port = 3000 || process.env.PORT

require('./db/mongoose')

//Parse incmoming json
app.use(express.json())

const authorRouter = require('./routers/author')
const newsRouter = require('./routers/news')
app.use(authorRouter)
app.use(newsRouter)

// app.get('/authors',(req,res)=>{
// res.send('Testing')
// })

const bcrypt = require('bcryptjs')

// const passwordFucntion = async () =>{
//     const password ='R123456'
//     const hashedPassword = await bcrypt.hash(password,8)

//     // console.log(password)
//     // console.log(hashedPassword)


//     const compare = await bcrypt.compare('R123456',hashedPassword)
//     // console.log(compare)
// }
// passwordFucntion()

///////////////////////////////////////////////////////////////////////////////////////////

// Jsonwebtoken

// const jwt = require('jsonwebtoken')

// const myToken = async() =>{

//     const token = jwt.sign({_id:'123'},'node course',{expiresIn: '7 days'})
//     console.log(token)

//     const tokenVerify = jwt.verify(token,'node course')
//     console.log(tokenVerify)
// }
// myToken()

/////////////////////////////////////////////////////////////////////////////////////////////

// middleware

// Without express middleware

// new request --> run route hanlder

// With express middleware
// new request --> do sth (check token validity) --> run route handler

//////////////////////////////////////////////////////////////////////////////////////////

// Populate

const main = async() => {
    const author = await Author.findById('60f012c73a068f437045bb57')
    await author.populate('authornewss').execPopulate()
    console.log(author.authornewss)
}
main()

app.listen(port, () => {
    console.log('Server is running')
})