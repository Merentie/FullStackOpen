require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Persons = require('./models/persons')

const app = express()
morgan.token('post', (request) => { if (request.method === 'POST') { return JSON.stringify(request.body) } })
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/info', (request, response, next) => {
  const date = Date()
  Persons.find({})
    .then(person => {
      const count = person.length
      response.send(`Phonebook has info for ${count} people! <br> ${date}`)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons', (request, response, next) => {
  Persons.find({}).then(person => {
    response.json(person)
  })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Persons.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Persons.findByIdAndDelete(request.params.id)
    .then(response.status(204))
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Persons.findById(request.params.id)
    .then(person => {
      person.name = name
      person.number = number
      return person.save()
        .then((updatedPersons) => {
          response.json(updatedPersons)
        })
    })
    .catch(error => next(error))


})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Persons({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.use(errorHandler)
