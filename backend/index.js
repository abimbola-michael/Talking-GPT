const express = require('express')
const session = require('express-session')
const auth = require('./auth')
const passport = require('passport')

const app = express()
function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401)
}


app.use(session({secret: 'cat'}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) =>{
res.send('<a href="/auth/google">Authentication with Google </a>')
})
app.get('/auth/google',
passport.authenticate('google', {scope: ['email', 'profile']}))

app.get('/google/callback', 
passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: 'auth/failure',
}))
app.get('/auth/failure', (req, res) =>{
    res.send('Wrong authentication')
})
app.get('/protected',isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`)
})

app.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.send('Goodbye!')
})


app.listen(5000, () => console.log('listening on: 5000'))