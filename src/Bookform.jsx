import { useState } from "react"
import StarRating from "./StarRating"

function Bookform({ onAddBook, onCancel }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setStatus] = useState('Want to Read')
    const [rating, setRating] = useState(5)
    const [summary, setSummary] = useState('')
    const [saving, setSaving] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        if (title === "")
            return
        setSaving(true)
        const success = await onAddBook({
            title,
            author: author || 'Unknown Author',
            status,
            rating,
            summary
        })

        if (success) {
            setTitle('')
            setAuthor('')
            setStatus('Want to Read')
            setRating(5)
            setSummary('')
        }
        setSaving(false)
    }

    return (
        <article className="book-form-card">
            <h3>✨ Add a New Book ✨</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Book Title
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </label>

                <label>
                    Author
                    <input
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </label>

                <div className="grid">
                    <label>
                        Status
                        <select value={status} onChange={(event) => setStatus(event.target.value)}>
                            <option value="Want to Read">Want to Read</option>
                            <option value="Reading">Reading</option>
                            <option value="Finished">Finished</option>
                        </select>
                    </label>

                    <div>
                        <label>Rating</label>
                        <StarRating rating={rating} onChange={setRating} />
                    </div>
                </div>

                <label>
                    Summary Notes
                    <textarea
                        rows={3}
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                    />
                </label>

                <footer>
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" aria-busy={saving}>
                        {saving ? 'Saving...' : 'Save Book'}
                    </button>
                </footer>
            </form>
        </article>
    )
}

export default Bookform
