const router = require("express").Router();
const Posts = require("../models/Posts");
const User = require("../models/User");

// NEW POST
router.post("/new-post", async (req, res) => {
  try {
    const newPost = new Posts(req.body);
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user
  const cat = req.query.cat
  try {
    let posts;
    if(username){
        posts = await Posts.find({username});
    }else if(cat){
        posts = await Posts.find({category:
        {$in:[cat]}
    });
    }else{
        posts = await Posts.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SPECIFIC POSTS
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/update-post/:id", async (req, res) => {
    const user = req.body.username;
    const post = await Posts.findById(req.params.id);
  if (user === post.username) {
    try {
      const post = await Posts.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Unauthorized!");
  }
});

// DELETE POST
router.delete("/delete-post/:id", async (req, res) => {
  const user = req.body.username;
  const post = await Posts.findById(req.params.id);
  if (user === post.username) {
    try {
      await post.delete();
      res.status(200).json("Post Deleted Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Unauthorized!");
  }
});

module.exports = router;
