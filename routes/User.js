const router = require("express").Router();
const User = require("../models/User");
const Posts = require("../models/Posts");
const bcrypt = require("bcrypt");

// GET ALL USERS
router.get("/get-user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SPECIFIC USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE USER
router.put("/update-user/:id", async (req, res) => {
  if (req.params.id === req.body.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },{new:true});
      res.status(200).json({ msg: "User Update Success", updatedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Unauthorized");
  }
});


// DELETE USER
router.delete("/delete-user/:id", async (req, res) => {
  if (req.params.id === req.body.id) {
    const user = await User.findById(req.params.id)
    try {
        const posts = await Posts.deleteMany({'username': user.username})
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User Delete Success');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Unauthorized");
  }
});



module.exports = router;
