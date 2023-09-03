import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'

const app = express()

app.get('/', (req, res) => {
    // res.send('Hello World!')
    console.log(req)
    return res.status(234).send('Hello World!')
})





mongoose.connect(mongoDBURL).then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

}).catch((err) => {
    console.error(err)
})
