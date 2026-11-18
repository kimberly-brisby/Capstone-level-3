import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import BookList from './BookList'
import BookSuggestions from './BookSuggestions'
import Bookform from './Bookform'

import '@picocss/pico/css/pico.min.css'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")
  const [showForm, setShowForm] = useState(false)

  // Automatically loads your Supabase books when the page opens
  useEffect(() => {
    handleListBook()
  }, [])

  async function handleListBook() {
    const { data, error } = await supabase.from("books").select()
    if (error) {
      console.error("Error loading books:", error)
    }
    if (data) {
      setBooks(data)
    }
  }

  // Saves a new book (from Bookform OR the Oracle) to Supabase and adds it to your shelf
  async function handleAddBook(newBook) {
    const { data, error } = await supabase
      .from("books")
      .insert([newBook])
      .select()

    if (error) {
      console.error("Error saving book:", error)
      return false
    }

      if (data && data.length > 0) {
      setBooks([...books, data[0]])
      setShowForm(false)
      return true
    }


    return false
  }

  // Removes a book from Supabase and updates your shelf
  async function handleDeleteBook(id) {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting book:", error)
      return
    }

    setBooks(books.filter((book) => book.id !== id))
  }

   
  const filteredBooks = books.filter((book) => {
    if (filterStatus === "All") return true
    return (book.status || "Reading") === filterStatus
  })

  return (
    <main className="container">
      <h1>My Magical Reading Journal</h1>

       {/* Add Button Color-Changing Dropdown   */}
      <div className="grid">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : '+ Add Book'}
        </button>

        <select
          className={`status-select ${filterStatus.toLowerCase().replaceAll(" ", "-")}`}
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
        >
          <option value="All">All Books</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
      </div>

      {/*Add Book Form when "+ Add Book" is clicked */}
      {showForm && (
        <Bookform
          onAddBook={handleAddBook}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Magical Book Oracle Component (handleAddBook!) */}
      <BookSuggestions
        books={books}
        readingLevel="Young Wizard"
        onAddBook={handleAddBook}
      />

      {/* Renders BookList with StarRating and Remove buttons */}
      <BookList books={filteredBooks} onDelete={handleDeleteBook} />

      {/* Footer / Refresh Section */}
      <div style={{ marginTop: '20px' }}>
        <p>You have {books.length} books on your magical shelf.</p>
        <button onClick={handleListBook}>Refresh Shelf</button>
      </div>
    </main>
  )
}

export default App
