const express = require("express");
const jwt = require('jsonwebtoken');

const JWT_SECRET = "randonayushscret"
const app = express();

app.use(express.json());

const users = [];



app.post("/signup",function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password
    })

    res.json({
        message : "you are singned in"
    })

    console.log(users);

})
app.post("/signin",function(req,res) {
     const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for(let i = 0; i<users.length; i++) {
        if(users[i].username == username && users[i].password == password) {
            foundUser = users[i];
        }
    }
    if(foundUser) {
        const token = jwt.sign({
            username : username
        },JWT_SECRET)
        // foundUser.token = token;

        res.json({
            token : token
        })
    }else {
        res.status(403).send({
            message : "invalid username and password"
        })
    }
    console.log(users);
    
})

app.get("/me" , function(req,res){
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token,JWT_SECRET);
    const username = decodedInformation.username;

    let found = null;

    for(let i = 0; i<users.length;i++) {
        if(users[i].username = username){
            found = users[i];
        }
    }
    if(found) {
        res.json({
            username : found.username,
            password : found.password
        })
    }
    else {
        res.json({
            message : "invalid token"
        })
    }
})

app.listen(3000);