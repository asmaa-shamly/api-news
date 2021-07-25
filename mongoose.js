const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

const author = mongoose.model('author', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const author = new author({
    name: 'Omar',
    age: 30,
})
author.save().then(() => {
    console.log(author)
}).catch((error) => {
    console.log(error)
})