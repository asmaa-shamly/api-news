const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

// const author = mongoose.model('author',{

//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },

//     age:{
//         type:Number,
//         default:20
//     },
//     email:{
//         type:String,
//         lowercase:true,
//         required:true,
//         unique:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },

//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         // lowercase:true,
//         minLength:6,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password can\'t contain password word')
//             }
//         }
//     }

// })

// module.exports = author

/////////////////////////////////////////////////////////////////////////////////////////////////

// Sce

const authorScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    age: {
        type: Number,
        default: 20,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },

    password: {
        type: String,
        required: true,
        trim: true,
        // lowercase:true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password can't contain password word");
            }
        },
    },

    // Token
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

/////////////////////////////////////////////////////////////////////////////////////////

// Relation

authorScehma.virtual('authornewss', {
    ref: 'News',
    localField: '_id',
    foreignField: 'owner'
})

///////////////////////////////////////////////////////////////////////////////////////////

// fucntion(){

// }
// async () =>{

// }

// Middleware
authorScehma.pre("save", async function(next) {
    const author = this;
    // console.log(author)

    if (author.isModified("password")) {
        author.password = await bcrypt.hash(author.password, 8);
    }
    next();
});
////////////////////////////////////////////////////////////////////////////////////////////////

// login

authorScehma.statics.findByCredentials = async(email, password) => {
    // find by email
    const author = await Author.findOne({ email });

    if (!author) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, author.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return author;
};

/////////////////////////////////////////////////////////////////////////////////////////
// token

authorScehma.methods.generateToken = async function() {
    const author = this
    const token = jwt.sign({ _id: author._id.toString() }, 'node-course')

    // Step 2 --> Save token D.B

    author.tokens = author.tokens.concat({ token: token })
    await author.save()

    return token
}

const Author = mongoose.model("Author", authorScehma);
module.exports = Author;