import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js'

const app = express()

app.get('/', (req, res) => {
    // res.send('Hello World!')
    console.log(req)
    return res.status(234).send('Hello World!')
})

app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.price || !req.body.publishYear) {
            return res.status(400).send({ message: 'Missing required data' })

        }
        const book = {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            publishYear: req.body.publishYear,
        }
        const newBook = await Book.create(book)
        return res.status(201).send({ message: 'New book created', data: newBook })

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ message: err.message })
    }
})

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).send({ data: books, count: books.length })

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ message: err.message })
    }
})

app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.price || !req.body.publishYear) {
            return res.status(400).send({ message: 'Missing required data' })
        }
        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)
        if(!result) {
            return res.status(404).send({ message: 'Book not found' })
        }
        return res.status(200).send({ message: 'Book updated' })

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ message: err.message })
    }
})


app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).send({ data: book })

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ message: err.message })
    }
})



mongoose.connect(mongoDBURL).then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

}).catch((err) => {
    console.error(err)
})
