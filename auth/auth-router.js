const bcrypt = require("bcryptjs");
const router = require('express').Router();

const {add, findBy} = require("../users/user-model");

router.post("/register", (req, res) => {
    const userInfo = req.body;
    const ROUNDS = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

    userInfo.password = hash;
    add(userInfo)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "Failed to register"})
    })
    
})

router.post("/login", (req, res) => {
    const {username, password} = req.body;
    findBy({username})
    .then(([user]) => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.user = user;
            res.status(200).json({message: "User was successfully logged in"})
        } else {
            res.status(401).json({message: "User with that username was not found"})
        }
    })
    .catch(err => res.status(500).json({errorMessage: "You shall not pass!"}))
})

router.get("/logout", (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(500).json({errorMessage: "Failed to logout"})
            } else {
                res.status(200).json({message: "Successfully logged out"})
            }
        });
    }
})

module.exports = router;