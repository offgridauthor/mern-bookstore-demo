import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            try {
                const res = await axios.get('http://localhost:5555')
                setBooks(res.data.data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchBooks()
    }, [])

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Books</h1>
                <Link to="/books/create" className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md">
                    <MdOutlineAddBox className="mr-2" />
                    Add Book
                </Link>
            </div>
            {loading ? (<Spinner />) : (<table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-gray-600'>Number</th>
                        <th className='border border-gray-600'>Title</th>
                        <th className='border border-gray-600 max-md:hidden'>Author</th>
                        <th className='border border-gray-600 max-md:hidden'>Year</th>
                        <th className='border border-gray-600'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id}>
                            <td className='border border-gray-600'>{index + 1}</td>
                            <td className='border border-gray-600'>{book.title}</td>
                            <td className='border border-gray-600 max-md:hidden'>{book.author}</td>
                            <td className='border border-gray-600 max-md:hidden'>{book.year}</td>
                            <td className='border border-gray-600'>
                                <Link to={`/books/${book._id}`} className="text-blue-500 mr-2">
                                    <BsInfoCircle />
                                </Link>
                                <Link to={`/books/${book._id}/edit`} className="text-yellow-500 mr-2">
                                    <AiOutlineEdit />
                                </Link>
                                <Link to={`/books/${book._id}/delete`} className="text-red-500">
                                    <MdOutlineDelete />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            )}
        </div>
    )
}

export default Home;
