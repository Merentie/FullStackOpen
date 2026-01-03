const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body
    if (!password) {
        response.status(400).json({error: 'password is required'})
    } else if (password.length < 3) {
        response.status(400).json({error: 'invalid password length'})
    } else {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }

})

module.exports = usersRouter


