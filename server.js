require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = []

// app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) =>{
    res.send("Welcome!")
})

// app.get('/login', (req, res) =>{
//     res.render('login.ejs')
// })

app.post('/login', async (req, res) =>{
    const user = users.find(user=>user.name == req.body.name)

    if (user==null){
        return res.status(400).send('User not found')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){ // if pw the same, send a token
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken: accessToken})
            // res.send('Success')
        }else{  // Wrong PW
            res.send('Not allowed')
        }

    } catch {
        res.status(500).send()  // Internal Error
    }
    console.log(users)
})

// app.get('/register', (req, res) =>{
//     // res.render('register.ejs')
//     res.send("register get")
// })

app.post('/register', async (req, res) =>{
    try {
        const hashedpw = await bcrypt.hash(req.body.password, 10)   // Store only the hased password
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            password: hashedpw  // only store the hased one to compare later
        })
        res.send("Your hased PW: " + hashedpw)
        // res.redirect('/login')
    } catch {
        res.send("Try again")
        res.redirect('/register')
    }
    console.log(users)
})

app.get('/userlist', authenticateToken, (req, res) =>{
    res.send(users) // can only access with the token
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'] // get the Bearer+token
    const token = authHeader && authHeader.split(' ')[1] // retrieve the token
    console.log(token)
    if(token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user // finished verification
        next() // returb to app.get /userlist
    })
}
app.listen(3000)