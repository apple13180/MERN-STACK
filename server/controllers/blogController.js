const slugify = require('slugify')
const Blogs = require('../models/blogs')
const { v4: uuidv4 } = require('uuid')

exports.create = async (req,res) => {
    const {title,content,author} = req.body;
    let slug = slugify(title);

    if(!slug)slug = uuidv4();

    switch(true){
        case !title: 
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"}) 
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนบทความ"})
            break;
    }
    try{
        const blog = await Blogs.create({title,content,author,slug})
        res.json(blog)
    }catch(err){
        res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})

    }    
}

//ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs = async (req,res)=>{
    try{
        const blogs = await Blogs.find({}).exec()
        res.json(blogs)
    }catch(err){
        res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
    }
}

// สร้างบทความที่เราสนใจโดยอิงตาม slug
exports.singleBlog = async (req,res) =>{
    try{
        const {slug} = req.params
        const blog = await Blogs.findOne({slug}).exec()
        res.json(blog)
    } catch(err) {
        res.status(400).json({error:" "})
    }
}

exports.remove = async (req,res) =>{
    try{
        const {slug} = req.params
        const blog = await Blogs.findOneAndRemove({slug}).exec()
        res.json("ลบบทความเรียบร้อย")
    }catch(err){
        console.log(err);
    }

}

exports.update = async (req,res) =>{
    try{
        const {slug} = req.params
        const {title,content,author} = req.body
        const blog = await Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec()
        res.json(blog)
    } catch(err){
        console.log(err);
    }
}


