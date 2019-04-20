const app = require('express')()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 8080
require('dotenv').config()
const db = require('./db/queries')

app.get('/', async (req, res) => { res.send('App is running!') })

// HTTP request endpoints PostgreSQL
app.get('/api/createtable', db.createTable)
app.get('/api/createuser', db.createAcount)
app.get('/api/allusers', db.getAllAcounts)
app.get('/api/user/:id', db.getAccountById)
app.get('/api/updateuser/:id', db.updateAccount)
app.get('/api/deleteuser/:id', db.deleteAccount)
app.get('/api/deletetable', db.deleteTable)

server.listen(port, () => console.log(`App is running on port ${port}`))