const express = require('express')
const News = require('../models/news')
const auth = require('../middlware/auth')
const router = new express.Router()

// router.post('/news',async(req,res)=>{
//     const news = new news(req.body)

//     try{
//         await news.save()
//         res.status(201).send(news)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })

// router.get('/news',async(req,res)=>{
//     try{
//         const newss = await news.find({})
//         res.send(newss)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

// router.get('/news/:id',async(req,res)=>{
//     const _id = req.params.id
//     try{
//         const news = await news.findById(_id)
//         if(!news){
//             return res.status(400).send('No news is found')
//         }
//         res.status(200).send(news)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

// router.patch('/news/:id',async(req,res)=>{
//     const updates = Object.keys(req.body) 
//     const allowedUpdates = ['completed','description']
//     var isValid = updates.every((el)=> allowedUpdates.includes(el))

//     if(!isValid){
//      return  res.status(400).send("Cannot update")
//     }

//     try{
//         const news = await news.findById(req.params.id)
//         updates.forEach((el)=> news[el] = req.body[el])
//        await news.save()
//         res.send(news)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })

// router.delete('/news/:id',async(req,res)=>{
//     const _id = req.params.id
//     try{
//         const news = await news.findByIdAndDelete(_id)
//         if(!news){
//             res.status(400).send('No news is found')
//         }
//         res.status(200).send(news)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

///////////////////////////////////////////////////////////////////////////////////////////

// Version 2

router.post('/news', auth, async(req, res) => {
    const news = new News({...req.body, owner: req.author._id })

    try {
        await news.save()
        res.status(201).send(news)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/news', auth, async(req, res) => {
    try {
        await req.author.populate('authornewss').execPopulate()
        res.send(req.author.authornewss)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/news/:id', auth, async(req, res) => {
    const _id = req.params.id
    try {
        // const news = await news.findById(_id)
        const news = await News.findOne({ _id, owner: req.author._id })
        if (!news) {
            return res.status(400).send('No news is found')
        }
        res.status(200).send(news)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/news/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    var isValid = updates.every((el) => allowedUpdates.includes(el))

    if (!isValid) {
        return res.status(400).send("Cannot update")
    }
    const _id = req.params.id
    try {
        // const news = await news.findById(req.params.id)

        const news = await News.findOne({ _id, owner: req.author._id })
        updates.forEach((el) => news[el] = req.body[el])
        await news.save()
        res.send(news)
    } catch (e) {
        res.status(400).send('No news is found ')
    }
})

router.delete('/news/:id', auth, async(req, res) => {
    const _id = req.params.id
    try {
        const news = await News.findOneAndDelete({ _id, owner: req.author._id })
        if (!news) {
            return res.status(400).send('No news is found')
        }
        res.status(200).send(news)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router