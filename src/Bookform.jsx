import { useState } from "react"

function Bookform ( { onAddBook }){
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setStatus] = useState('Want to Read')
    const [rating, setRating] = useState(5)
    const [summary, setSummary] = useState('')
    const [saving, setSaving] = useState('false')
    

    const handleSubmit (event) {
        event.preventDefault()
        
    }
}

export default  Bookform