const express = require("express");
const Author = require("../models/author");
const auth = require('../middlware/auth')

const router = new express.Router();

// Create --> post
// Read --> get
// Update --> patch
// delete --> delete

// router.post("/authors", (req, res) => {
//     // console.log(req.body)
//     const author = new author(req.body);
//     author.save().then(() => {
//             res.status(200).send(author);
//         })
//         .catch((e) => {
//             res.status(400).send(e);
//         });
// });


router.post("/authors", async(req, res) => {
    // console.log(req.body)
    const author = new Author(req.body);
    try {
        await author.save()
        const token = await author.generateToken()
        res.status(200).send({ author, token })
    } catch (e) {
        res.status(400).send(e)
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////

// Get

router.get("/authors", auth, (req, res) => {
    Author.find({})
        .then((authors) => {
            res.status(200).send(authors);
        })
        .catch((e) => {
            res.status(500).send(e);
        });
});

/////////////////////////////////////////////////////////////////////////////////////////////

// Get By ID

router.get("/authors/:id", auth, (req, res) => {
    // console.log(req.params)
    const _id = req.params.id;
    // console.log(_id)

    Author.findById(_id)
        .then((author) => {
            if (!author) {
                return res.status(400).send("Unable to find author");
            }
            res.status(200).send(author);
        })
        .catch((e) => {
            res.status(500).send("Unable to connect to database");
        });
});

//////////////////////////////////////////////////////////////////////////////////////////

// Update

// router.patch('/authors/:id',async(req,res)=>{
//     const _id = req.params.id
//     try{
//         const author = await author.findByIdAndUpdate(_id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!author){
//             return res.status(400).send('No author is found')
//         }
//         res.status(200).send(author)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })

/////////////////////////////////////////////////////////////////////////////////////

// router.patch("/authors/:id", async (req, res) => {
//   const updates = Object.keys(req.body); //['name','password','age','email'] || 
//   console.log(updates);

//   const allowedUpdates = ["name", "password"];
//   var isValid = updates.every((el) => allowedUpdates.includes(el));
//   console.log(isValid);

//   if (!isValid) {
//     return res.status(400).send("Sorry cannot update");
//   }
//   const _id = req.params.id;
//   try {
//     const author = await author.findByIdAndUpdate(_id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!author) {
//       return res.status(400).send("No author is found");
//     }
//     res.status(200).send(author);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////////

router.patch("/authors/:id", auth, async(req, res) => {
    const updates = Object.keys(req.body); //['name','password','age','email'] || 
    console.log(updates);

    const allowedUpdates = ["name", "password"];
    var isValid = updates.every((el) => allowedUpdates.includes(el));
    console.log(isValid);

    if (!isValid) {
        return res.status(400).send("Sorry cannot update");
    }
    const _id = req.params.id;
    try {
        const author = await Author.findById(_id)
        updates.forEach((el) => (author[el] = req.body[el]))
        await author.save()
        console.log(author)
        if (!author) {
            return res.send('No author is found')
        }
        res.status(200).send(author)
    } catch (e) {
        res.status(400).send(e)
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////

//Delete

router.delete('/authors/:id', auth, async(req, res) => {
    const _id = req.params.id
    try {
        const author = await Author.findByIdAndDelete(_id)
        if (!author) {
            return res.status(400).send('No author is found')
        }
        res.status(200).send(author)
    } catch (e) {
        res.status(400).send(e)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////

// Login

router.post('/authors/login', async(req, res) => {
    try {
        const author = await Author.findByCredentials(req.body.email, req.body.password)
        const token = await author.generateToken()
        res.send({ author, token })
    } catch (e) {
        res.status(400).send('Try again ' + e)
    }
})

//////////////////////////////////////////////////////////////////////////////////////

router.get('/profile', auth, async(req, res) => {
    res.send(req.author)
})

////////////////////////////////////////////////////////////////////////////////////////

// logout

router.post('/logout', auth, async(req, res) => {
    // 123 --> req.token
    // 12     12 !== 123 T
    // 1      1 !== 123 T
    // 2   2 !== 123 T
    // 123   123 !== 123 F\


    try {
        req.author.tokens = req.author.tokens.filter((el) => {
            return el.token !== req.token
        })

        await req.author.save()
        res.send('Logout successfully')
    } catch (e) {
        res.status(500).send('Error please try again')
    }

})

/////////////////////////////////////////////////////////////////////////////////////////////

// logout all 

router.post('/logoutAll', auth, async(req, res) => {
    try {
        req.author.tokens = []
        await req.author.save()
        res.send('Logout all was done successsfully')
    } catch (e) {
        res.send('Please login')
    }
})

module.exports = router;