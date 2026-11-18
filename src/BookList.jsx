import StarRating from './StarRating'

function BookList({ books, onDelete, onStatusChange }) {
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
                const currentStatus = book.status || 'Reading';
                const statusClass = currentStatus.toLowerCase().replaceAll(" ", "-");

                return (
                    <article key={book.id || index} className={`book-card ${statusClass}`}>
                        <header>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <strong>{book.title}</strong>

                                {/* Color-coded status switcher*/}
                                <select
                                    className={`card-status-select ${statusClass}`}
                                    value={currentStatus}
                                    onChange={(event) => onStatusChange(book.id, event.target.value)}
                                >
                                    <option value="Want to Read">Want to Read</option>
                                    <option value="Reading">Reading</option>
                                    <option value="Finished">Finished</option>
                                </select>
                            </div>
                            <small>by {book.author}</small>
                        </header>

                        <div>
                            <StarRating rating={book.rating} readOnly />
                            <p>{book.summary}</p>
                        </div>

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
