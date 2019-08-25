const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})
const taskSechema = new mongoose.Schema({
    describtion: {type: String},
    completed: {type: Boolean},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    }},{
        timestamps:true
    })
const Task = mongoose.model('Task',taskSechema)

module.exports = Task