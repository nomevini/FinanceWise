const express = require('express')

const routes = express()

routes.get('/', (req, res) => {
    res.json({message: 'Ola, mundo!'})
})

module.exports = routes