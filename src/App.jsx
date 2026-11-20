import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import BookList from './BookList'
import BookSuggestions from './BookSuggestions'
import Bookform from './Bookform'
import ReadingQuiz from './ReadingQuiz'

import '@picocss/pico/css/pico.min.css'
import './App.css'

function App() {
  const [shelf, setShelf] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")
  const [showForm, setShowForm] = useState(false)
  const [activePage, setActivePage] = useState("shelf") // "shelf" or "quiz"

  useEffect(() => {
    handleListShelf()
  }, [])

  // Loads all books from your "shelf" table
  async function handleListShelf() {
    const { data, error } = await supabase.from("shelf").select()
    if (error) {
      console.error("Error loading shelf:", error)
    }
    if (data) {
      setShelf(data)
    }
  }

  // Saves a new book (from Bookform, Oracle, or ReadingQuiz) to the "shelf" table
  async function handleAddBook(newBook) {
    const { data, error } = await supabase
      .from("shelf")
      .insert([newBook])
      .select()

    if (error) {
      console.error("Error saving book:", error)
      return false
    }

    if (data && data.length > 0) {
      setShelf([...shelf, data[0]])
      setShowForm(false)
      return true
    }

    return false
  }

  // Removes a book from the "shelf" table
  async function handleDeleteBook(id) {
    const { error } = await supabase.from("shelf").delete().eq("id", id)
    if (error) {
      console.error("Error deleting book:", error)
      return
    }
    setShelf(shelf.filter((book) => book.id !== id))
  }

  // Updates a book's status in the "shelf" table
  async function handleStatusChange(id, newStatus) {
    const { error } = await supabase
      .from("shelf")
      .update({ status: newStatus })
      .eq("id", id)

    if (error) {
      console.error("Error updating status:", error)
      return
    }

    setShelf(
      shelf.map((book) =>
        book.id === id ? { ...book, status: newStatus } : book
      )
    )
  }

  async function handleUpdateReview(id, rating, summary) {
  const { error } = await supabase
    .from("books")
    .update({ rating, summary })
    .eq("id", id)

  if (error) {
    console.error("Error updating review:", error)
    return
  }

  setBooks(
    books.map((book) =>
      book.id === id ? { ...book, rating, summary } : book
    )
  )
}


  // Clears the "shelf" table while keeping your "books" quiz library intact
  async function handleResetShelf() {
    if (!window.confirm("Reset your demo shelf? This clears your shelf but keeps your quiz library.")) return
    
    // Deletes all rows in the "shelf" table (neq id 0 matches all valid IDs)
    const { error } = await supabase.from("shelf").delete().neq("id", 0)
    if (error) {
      console.error("Error resetting shelf:", error)
      return
    }
    setShelf([])
  }

  const readingBooks = shelf.filter((b) => (b.status || "Reading") === "Reading")
  const wantToReadBooks = shelf.filter((b) => b.status === "Want to Read")
  const finishedBooks = shelf.filter((b) => b.status === "Finished")

  return (
    <main className="container">
      <header className="nav-bar">
        <h1 style={{ margin: 0 }}>My Magical Reading Journal</h1>
        <button
          type="button"
          className="quiz-toggle-btn"
          onClick={() => setActivePage(activePage === "shelf" ? "quiz" : "shelf")}
        >
          {activePage === "shelf" ? "Reading Placement Quiz" : "← Back to My Shelf"}
        </button>
      </header>

      {activePage === "quiz" ? (
        <ReadingQuiz onAddBook={handleAddBook} onViewShelf={() => setActivePage("shelf")} />
      ) : (
        <>
          <div className="grid">
            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Hide Form' : '+ Add Book'}
            </button>
            <select
              className={`status-select ${filterStatus.toLowerCase().replaceAll(" ", "-")}`}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Shelves</option>
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          {showForm && <Bookform onAddBook={handleAddBook} onCancel={() => setShowForm(false)} />}

          <BookSuggestions books={shelf} readingLevel="Young Wizard" onAddBook={handleAddBook} />

          <div className="grid">
            {(filterStatus === "All" || filterStatus === "Reading") && (
              <section>
                <h2>Currently Reading ({readingBooks.length})</h2>
                <BookList books={readingBooks} onDelete={handleDeleteBook} onStatusChange={handleStatusChange} />
              </section>
            )}
            {(filterStatus === "All" || filterStatus === "Want to Read") && (
              <section>
                <h2>Want to Read ({wantToReadBooks.length})</h2>
                <BookList books={wantToReadBooks} onDelete={handleDeleteBook} onStatusChange={handleStatusChange} />
              </section>
            )}
            {(filterStatus === "All" || filterStatus === "Finished") && (
              <section>
                <h2>Finished ({finishedBooks.length})</h2>
                <BookList books={finishedBooks} onDelete={handleDeleteBook} onStatusChange={handleStatusChange} />
              </section>
            )}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <p style={{ margin: 0 }}>You have {shelf.length} books on your magical shelf.</p>
            <button onClick={handleListShelf}>Refresh Shelf</button>
            <button type="button" className="secondary outline" onClick={handleResetShelf}>
              Reset Demo Shelf
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default App
