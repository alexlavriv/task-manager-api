
const {MongoClient, ObjectID} = require('mongodb')

const databaseName = 'task-manager'
MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser:true}, (error, client)=>{
    if (error){
        return console.log("Unable to connect to database!")
    }
    console.log("Connected corected")

    const db = client.db(databaseName)

    db.collection('users').findOne({name:'Jen'}, (error, user)=>{
        if (error){
            return console.log('unable to fetch')
        }
        console.log(user);
    })
})