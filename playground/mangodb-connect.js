// const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require("mongodb");

// mongodb: //localhost:27017
MongoClient.connect('mongodb://localhost:27017/Users', (err , db) => {
    if(err){
        return  console.log('Unable to connect to the Database');        
    }

    console.log('Sucessfully connected to databse');
    
    // db.collection('todos').insertOne({
    //     todo : 'learn MangoDb',
    //     any : true
    // }, (err, result)=> {
    //     if(err){
    //         return console.log('unable to insert the data');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    db.collection('profiles').insertOne({
        name : 'Suresh N',
        age : 18,
        location : 'Mysore'
    },(err, result) => {
        if(err) {
           return console.log('Unable to insert documents', err);  
        }
        console.log(JSON.stringify(result.ops, undefined, 4))
    })

    db.close()
})