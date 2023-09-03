import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publishYear: { type: Number, required: true },
}, { timestamps: true })


export const Book = mongoose.model('Book', bookSchema)
