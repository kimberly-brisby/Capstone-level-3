function StarRating({ rating = 0, onChange, readOnly = false }) {
    return (
        <div className="star-rating" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star-item ${star <= rating ? 'filled' : ''} ${!readOnly ? 'editable' : ''}`}
                    onClick={() => !readOnly && onChange && onChange(star)}
                    style={{
                        cursor: readOnly ? 'default' : 'pointer',
                        fontSize: '1.4rem',
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    )
}

export default StarRating
