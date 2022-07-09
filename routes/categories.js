const router = require('express').Router()
const Category = require('../models/Category')

// NEW CATEGORY
router.post("/new-cat", async(req,res)=>{
    try{
        const newCat = new Category({
            name : req.body.name
        })

        const cat = await newCat.save()
        res.status(201).json(cat)
    }catch (err){
        res.status(500).json(err)
    }
})

// ALL CATEGORIES
router.get("/", async(req,res)=>{
    try{
        const cats = await Category.find()
        res.status(200).json(cats)
    }catch (err){
        res.status(500).json(err)
    }
})

// DELETE CATEGORY
router.delete("/:id", async(req,res)=>{
    try{
        const cat = await Category.findById(req.params.id)
        cat.delete()
        res.status(200).json('Cat Delete Success')
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router