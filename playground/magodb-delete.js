const {MongoClient} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApi',(err, db) => {
    if (err) {
        return console.log('Unable to connect : ', err)
    }

    // deleteMany
    // db.collection('todos').deleteMany({todo : 'finish nodejs course'})
    // .then(result => {
    //     console.log(result)
    // })

    // 2. deleteOne
    // db.collection('todos').deleteOne({todo : 'finish nodejs course'})
    // .then((result)=> console.log(result))

    // 3. findOneAndDelete

    db.collection('todos').findOneAndDelete({completed : true})
    .then(result => console.log(result))

    db.close()
})