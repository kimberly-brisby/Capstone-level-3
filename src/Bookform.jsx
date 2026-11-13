import { useState } from "react"

function Bookform ( { onAddBook }){
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    

    const handleSubmit (event) {
        event.preventDefault()
        
    }
}

export default  Bookform