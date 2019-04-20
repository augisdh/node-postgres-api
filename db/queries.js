const { Client } = require('pg')

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

client.connect()

// Creating
const createTable = async (req, res) => {
  const sql = `
    CREATE TABLE accounts(
      id SERIAL PRIMARY KEY, 
      username VARCHAR(50) UNIQUE NOT NULL, 
      password VARCHAR(50) NOT NULL, 
      email VARCHAR(355) UNIQUE NOT NULL, 
      created_on TIMESTAMP NOT NULL
    )
  `

  try {
    const res = await client.query(sql)
    console.log(`Table created successfully...`)
  } catch (err) {
    console.log(err)
  }
}

const createAcount = async (req, res) => {
  const sql = {
    text: 'INSERT INTO accounts(username, password, email, created_on) VALUES($1, $2, $3, $4)',
    values: ['testNames', 'testPassword', 'testEmails', new Date()]
  }

  try {
    const res = await client.query(sql)
    console.log(`Account successfully added...`)
  } catch (err) {
    console.log(err)
  }
}

// Getting
const getAllAcounts = async (req, res) => {
  const sql = 'SELECT * FROM accounts ORDER BY id ASC'

  try {
    const res = await client.query(sql)
    console.log('Successfully got all users...')
    for (user in res.rows) {
      console.log(res.rows[user])
    }
  } catch (err) {
    console.log(err)
  }
}

const getAccountById = async (req, res) => {
  const id = parseInt(req.params.id)
  const sql = {
    text: 'SELECT * FROM accounts WHERE id = $1',
    values: [id]
  }

  try {
    const res = await client.query(sql)
    await (res.rows.length !== 0) ? console.log(res.rows) : console.log(`No user with id: ${id}`)
  } catch (err) {
    console.log(err)
  }
}

// Updating
const updateAccount = async (req, res) => {
  const id = parseInt(req.params.id)
  const sql = {
    text: 'UPDATE accounts SET username = $1, password = $2 WHERE id = $3',
    values: ['updatedName', 'updatedPassword', id]
  }

  try {
    const res = await client.query(sql)
    console.log(`User with id: ${id}, successfully updated...`)
  } catch (err) {
    console.log(err)
  }
}

// Deleting
const deleteAccount = async (req, res) => {
  const id = parseInt(req.params.id)
  const sql = {
    text: 'DELETE FROM accounts WHERE id = $1',
    values: [id]
  }

  try {
    const res = await client.query(sql)
    console.log('User deleted successfully...')
  } catch (err) {
    console.log(err)
  }
}

const deleteTable = async (req, res) => {
  const sql = 'DROP TABLE accounts'

  try {
    const res = await client.query(sql)
    console.log('Table successfully deleted...')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createTable,
  createAcount,
  getAllAcounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  deleteTable
}
