import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import cors from 'cors'
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    // res.send('Hello World!')
    console.log(req)
    return res.status(234).send('Hello World!')
})

app.use('/books', booksRoute)
app.use(cors()); // Enable All CORS Requests

// app.use(cors({ origin: 'http://localhost:3000',
//                methods: ['GET', 'POST', 'PUT', 'DELETE'],
//                allowedHeaders: ['Content-Type'],
//              }))

mongoose.connect(mongoDBURL).then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

}).catch((err) => {
    console.error(err)
})
