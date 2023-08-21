const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true,
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true})

module.exports = mongoose.model('Blogs',blogSchema)