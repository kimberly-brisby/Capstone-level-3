import { useState } from 'react'
import StarRating from './StarRating'

function BookList({ books, onDelete, onStatusChange, onUpdateReview }) {
    const [editingId, setEditingId] = useState(null)
    const [draftRating, setDraftRating] = useState(5)
    const [draftSummary, setDraftSummary] = useState('')

    function startEditing(book) {
        setEditingId(book.id)
        setDraftRating(book.rating || 5)
        setDraftSummary(book.summary || '')
    }

    async function handleSaveReview(bookId) {
        if (onUpdateReview) {
            await onUpdateReview(bookId, draftRating, draftSummary)
        }
        setEditingId(null)
    }

    if (books.length === 0) {
        return (
            <article className="book-card" style={{ textAlign: 'center' }}>
                <p>No books found on this shelf. Click <strong>+ Add Book</strong> to start your journey!</p>
            </article>
        )
    }

    return (
        <section>
            {books.map((book, index) => {
                const currentStatus = book.status || 'Reading'
                const statusClass = currentStatus.toLowerCase().replaceAll(" ", "-")
                const isFinished = currentStatus === 'Finished'
                const isEditing = editingId === book.id

                return (
                    <article key={book.id || index} className={`book-card ${statusClass}`}>
                        <header>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <strong>{book.title}</strong>

                                {/* Color-coded status switcher */}
                                <select
                                    className={`card-status-select ${statusClass}`}
                                    value={currentStatus}
                                    onChange={(event) => {
                                        const newStatus = event.target.value
                                        onStatusChange(book.id, newStatus)
                                        if (newStatus === 'Finished' && !book.rating && !book.summary) {
                                            startEditing(book)
                                        }
                                    }}
                                >
                                    <option value="Want to Read">Want to Read</option>
                                    <option value="Reading">Reading</option>
                                    <option value="Finished">Finished</option>
                                </select>
                            </div>
                            <small>by {book.author}</small>
                        </header>

                        {isFinished && (
                            <div>
                                {isEditing ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div>
                                            <label>Rating</label>
                                            <StarRating rating={draftRating} onChange={setDraftRating} />
                                        </div>
                                        <label>
                                            Summary Notes
                                            <textarea
                                                rows={3}
                                                value={draftSummary}
                                                placeholder="Write your thoughts about this book..."
                                                onChange={(e) => setDraftSummary(e.target.value)}
                                            />
                                        </label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button type="button" onClick={() => handleSaveReview(book.id)}>
                                                Save Review
                                            </button>
                                            <button type="button" className="secondary" onClick={() => setEditingId(null)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {book.rating && <StarRating rating={book.rating} readOnly />}
                                        {book.summary && <p style={{ marginTop: '6px' }}>{book.summary}</p>}
                                        <button
                                            type="button"
                                            className="outline secondary"
                                            style={{ padding: '4px 10px', fontSize: '0.85rem' }}
                                            onClick={() => startEditing(book)}
                                        >
                                            {book.rating || book.summary ? 'Edit Rating & Summary' : '+ Add Rating & Summary'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <footer>
                            <button onClick={() => onDelete(book.id)}>
                                Remove
                            </button>
                        </footer>
                    </article>
                )
            })}
        </section>
    )
}

export default BookList
