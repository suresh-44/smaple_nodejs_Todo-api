// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require("mongodb");

// mongodb: //localhost:27017
MongoClient.connect('mongodb://localhost:27017/TodoApi', (err , db) => {
    if(err){
        return  console.log('Unable to connect to the Database');        
    }

    console.log('Sucessfully connected to databse');
    
    // db.collection('todos').find({
    //     _id: new ObjectID('5b45bf36bc2cfde0a9557f3a')
    // }).toArray().then(docs => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 4))
    // }, err => {
    //     console.log('Unable to print Observation')
    // })
  
    //  db.collection('todos').find().count().then(count => {
    //      console.log('Todos count: ', count)
         
    //  }, err => {
    //      console.log('Unable to print Observation')
    //  })

    db.collection('todos').find().explain().then(count => {
        console.log('Todos count: ', count)

    }, err => {
        console.log('Unable to print Observation')
    })

     db.close()
})
