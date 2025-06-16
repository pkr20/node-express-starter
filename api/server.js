const express = require('express')
const cors = require('cors')
const Pet = require('./pet-model')

const server = express()
server.use(express.json())
server.use(cors())

// [GET] /api/pets
server.get('/api/pets', async (req, res, next) => {
  const search = req.query
  try {
    // The details about how the pets are pulled from the DB are abstracted away
    const pets = await Pet.find(search)
    if (pets.length) {
      res.json(pets)
    } else {
      next({ status: 404, message: 'No pets found match the search criteria' })
    }
  } catch (err) {
    next(err)
  }
})

// [CATCH-ALL]
server.use('/*', (req, res, next) => {
  next({ status: 404, message: 'Not Found' })
})

// Error handling middleware
server.use((err, req, res, next) => {
  const { message, status = 500 } = err
  console.log(message)
  res.status(status).json({ message }) // Unsafe in prod
})

module.exports = server
