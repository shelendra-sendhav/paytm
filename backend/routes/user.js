const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {User, Account} = require("../db");
const router = express.Router();
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async(req, res) => {
  try{
    const { success } = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / incorrect imput"
        });
    }

    const existingUser = await User.findOne({
        username : req.body.username
    })
    if(existingUser){
        return res.status(411).json({
          message: "Email already taken / incorrect imput",
        });
    }

    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });
     
    const userId = user._id;

    // Create new Account ------------------
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000
    });
    //---------------------------------------

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

  res.json({
    message: "You are signed up",
    token: token
  });
  }catch(err){
    console.log(err);
  }
    
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
  try{
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
          message: "Error while logging in",
        });
    }

    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if(user){
        const token = jwt.sign(
          {
            userId: user._id,
          },
          JWT_SECRET
        );

        res.send({
            token: token
        });

        return;
    }

    res.status(411).json({
        message: "Error while loging in "
    })
  }catch(err){
    console.log(err);
  }
    
  
});

const updateBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
});

router.put("/", authMiddleware, async( req, res) =>{
  try{
    const {success} = updateBody.safeParse(req.body);

  if(!success){
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({_id: req.userId}, req.body);

  res.json({
    message: "Updated Successfully."
  })
  }catch(err){
    console.log(err);
  }
  
});

router.get("/bulk", authMiddleware, async (req, res) => {
  try{
      const filter = req.query.filter ||"";

  const users = await User.find({
    $or: [
      {
        firstName: {
          "$regex": filter,
        },
      },
      {
        lastName: {
          "$regex": filter,
        },
      },
    ],
  });

  res.json({
    user : users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id : user._id
    }))
  });
  }catch(err){
    console.log(err);
  }

});


module.exports = router;