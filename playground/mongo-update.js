const {MongoClient, ObjectId} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db) => {
                 //  mongodb: //localhost:27017/TodoApi
    if (err) {
        console.log('Unable to connect to the database', err)
    }

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId('5b484d8f52b691556718c406')
    }, {$inc :{
        age: 2
    }},{
        returnOriginal: false
    }).then(result => console.log(result))
})