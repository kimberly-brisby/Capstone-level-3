import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'

import '@picocss/pico/css/pico.min.css'
import './App.css'

function App() {
  const [books, setBooks] = useState([])

  async function handleListBook(){
    const  {data, error } = await supabase.from("books").select()
    console.log(data)
    console.log(error)
    if(data){
    setBooks(data)
    }
  }  
  return (
    <>
      <h1>My Magical Reading Journal</h1>
      <p>You have {books.length} books to choose from.</p>
      <button onClick={handleListBook}>Click Here</button>
    </>
  )
}

export default App
