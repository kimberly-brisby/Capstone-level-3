import { useState } from "react"

function BookSuggestions({ books, readingLevel, onAddBook }) {
    const [pickedBook, setPickedBook] = useState(null)
    const [addedMessage, setAddedMessage] = useState(false)

    function pickRandomBook() {
        const unread = books.filter((book) => book.status === 'Want to Read')
        const pool = unread.length > 0 ? unread : books
        if (pool.length === 0) return

        const random = pool[Math.floor(Math.random() * pool.length)]
        setPickedBook(random)
        setAddedMessage(false)
    }

    async function handleSavePick() {
        if (!pickedBook || !onAddBook) return

        const success = await onAddBook({
            title: pickedBook.title,
            author: pickedBook.author || 'Unknown Author',
            status: 'Want to Read',
            rating: pickedBook.rating || 5,
            summary: pickedBook.summary || 'Chosen by the Magical Book Oracle!'
        })

        if (success) {
            setAddedMessage(true)
        }
    }

    return (
        <article className="oracle-card">
            <header>
                <strong>🔮 Magical Book Oracle</strong>
            </header>

            {pickedBook ? (
                <div className="oracle-pick">
                    <p>
                        Next picked for {readingLevel}: <strong>{pickedBook.title}</strong> by {pickedBook.author}
                    </p>

                    {addedMessage ? (
                        <p><strong>✨ Added to your shelf! ✨</strong></p>
                    ) : (
                        <button type="button" onClick={handleSavePick} style={{ marginBottom: '8px' }}>
                            + Save to Shelf
                        </button>
                    )}
                </div>
            ) : (
                <p>If you cannot pick, let the oracle choose from the library.</p>
            )}

            <button onClick={pickRandomBook} disabled={books.length === 0}>
                {pickedBook ? 'Pick Another' : 'Suggest a Book'}
            </button>
        </article>
    )
}

export default BookSuggestions
