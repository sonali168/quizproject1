const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const jwtScrete = process.env.jwtScrete

// signup page router
router.post("/createuser", [
    body('email', 'Invalid Email').isEmail(),
    body('name', 'Invalid Name').isLength({ min: 5 }),
    body('password', 'weak Password').isLength({ min: 5 }),
    body('confirmPassword').custom((password, { req }) => {
        return password === req.body.password;
      }),
   ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10)

        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                confirmPassword: secPassword
            })
                .then(res.json({ success: true, status: 400 }))
        } catch (err) {
            console.log(err)
            res.json({
                success: false,
                status: 200
            })
        }
    })

// login page router
router.post("/loginuser", 
[body('email').isEmail(),
body('password',"Incorrect password").isLength({min:5})],
async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    let email = req.body.email

    try{
        let userData = await User.findOne({email})

        if(!userData){
            return res.status(400).json({error:"Inavalid data"})
        }

        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
            return res.status(400).json({error:"Inavalid data"})
        }

        const data ={
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data, jwtScrete)
        return res.json({success:true, authToken:authToken})

    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})

module.exports = router