const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT
const Course = require('./models/course')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log(`Esto es un log del tipo de entorno: ${process.env.NODE_ENV}`)
    res.send(`Server listening on PORT: ${PORT}`)
});

app.post('/courses', (req, res) => {
    const { name } = req.body

    try {
        const result = Course.create({ name })
        res.status(201).json({ ok: true })
    } catch (error) {
        console.log({ error })
        res.status(400).json({ ok: false, error})
    }
})

app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find()
        res.status(200).json({ ok: true, data: courses })
    } catch (error) {
        console.log({ error })
        res.status(400).json({ ok: false, error})
    }
})

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
})
