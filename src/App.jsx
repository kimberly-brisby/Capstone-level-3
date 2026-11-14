import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'

import '@picocss/pico/css/pico.min.css'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")

  async function handleListBook(){
    const  {data, error } = await supabase.from("books").select()
    console.log(data)
    console.log(error)
    if(data){
    setBooks(data)
    }
  } 
  
  const filteredBooks = books.filter((book) => {
    if(filterStatus === "All") return true
    return book.status === filterStatus
  })
  return (
    <>
      <h1>My Magical Reading Journal</h1>
      <div>
        {filteredBooks.map((book) => (
          <article key={book.id}>
            <header>
              {book.title} by {book.author}
            </header>
          
          </article>
        )
        )}
      </div>
      <div>
        <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)}>
          <option value={"All"}>All Books</option>  
          <option value={"Want to Read"}>Want to Read</option>
          <option value={"Reading"}>Reading</option>
          <option value={"Finished"}>Finished</option>
        </select>        
        <p>You have {books.length} books to choose from.</p>
        <button onClick={handleListBook}>Click Here</button>
      </div>
    </>
  )
}

export default App
