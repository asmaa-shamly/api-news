const mongodb = require("mongodb");

// Inatlize connection
// MongoClient --> Give us nescessary functions to connect to DB--> CRUD

const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";

const dbName = "task-manger";

mongoClient.connect(
    connectionURL, { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log("Error has occurred");
        }
        console.log("Success");
        const db = client.db(dbName);

        // insert

        // db.collection('authors').insertOne({
        //     name:'Omar',
        //     age:27
        // },(error,result)=>{
        //     if(error){
        //         return console.log('Unable to insert author')
        //     }
        //     console.log(result.ops)
        // })

        // db.collection('authors').insertOne({
        //     name:'Mohamed',
        //     age:30
        // })

        // db.collection('newss').insertMany([
        //     {description:'news1',completed:true},
        //     {description:'news2',completed:false},

        // ])

        //////////////////////////////////////////////////////////////////////////////////////////////

        const ObjectID = mongodb.ObjectID;
        // const _id = new ObjectID()
        // console.log(_id)

        // db.collection('authors').insertOne({
        //     _id:_id,
        //     name:'Omar',
        //     age:30
        // })

        //////////////////////////////////////////////////////////////////////////////////////////

        // db.collection("authors").findOne(
        //   { _id: new ObjectID("60ebfc4f1e798016c441a2bc") },
        //   (error, author) => {
        //     if (error) {
        //       return console.log("Error");
        //     }
        //     console.log(author);
        //   }
        // );

        //////////////////////////////////////////////////////////////////////////////////////////////

        // db.collection('authors').find({age:30}).toArray((error,authors)=>{
        //     if(error){
        //         return console.log('Error')
        //     }
        //     console.log(authors)
        // })

        // db.collection('authors').find({age:30}).count((error,authors)=>{
        //     if(error){
        //         return console.log('Error')
        //     }
        //     console.log(authors)
        // })

        // db.collection('authors').find({age:30}).limit(1).toArray((error,authors)=>{
        //     if(error){
        //         return console.log('Error')
        //     }
        //     console.log(authors)
        // })

        /////////////////////////////////////////////////////////////////////////////////////////////

        // Update

        // db.collection('authors').updateOne({_id:new ObjectID('60ebfc4f1e798016c441a2b9')},{
        //     $set:{name:'Amr'},
        //     $inc:{age:5}
        // }).then((result)=>{
        //     console.log(result.modifiedCount)
        // }).catch((error)=>{
        //     console.log(error)
        // })

        // db.collection('newss').updateMany({},{
        //     $set:{completed:true}
        // }).then((result)=>{
        //     console.log(result.modifiedCount)
        // }).catch((error)=>{
        //     console.log(error)
        // })

        db.collection("newss")
            .updateMany({}, {
                $set: { completed: true },
            })
            .then((result) => {
                console.log(result.modifiedCount);
            })
            .catch((error) => {
                console.log(error);
            });
        ////////////////////////////////////////////////////////////////////////////////////////////

        // DeleteOne

        db.collection("authors")
            .deleteOne({ age: 20 })
            .then((result) => {
                console.log(result.deletedCount);
            })
            .catch((error) => {
                console.log(error);
            });

        db.collection('authors').deleteMany({}).then((result) => {
            console.log(result.deletedCount)
        }).catch((error) => {
            console.log(error)
        })
    }
);