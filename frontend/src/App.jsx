import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import DeleteBook from './pages/DeleteBook'

function App() {

  return (
      <>
          <h1>React App</h1>
          <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
    </>
  )
}

export default App
/* 
*     < Route path = "/books/create" element = {< CreateBook />}/>
*         < Route path = "/books/details/:id" element = {< ShowBook />}/>
*             < Route path = "/books/edit/:id" element = {< EditBook />}/>
*                 < Route path = "/books/delete/:id" element = {< DeleteBook />}/> */
