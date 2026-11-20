import { useState } from "react"
import { supabase } from "./utils/supabase"


// part 1 theme questions
const Quiz_Questions = [
    
    {
        id: "theme", 
        question: "1. What kind of reading adventure feels best to you right now?",
        options: [
            {label: "Short, fun chapter books with fast-moving stories", value: 3},
            {label: "Exciting quests with bigger worlds and fun mysteries", value: 5},
            {label: "Longer, detailed  stories with big twists and deeper themes", value: 7},
            {label: "Rich, complex novels and epic challenges", value: 10},
        ],
    },
    {
        id: "genre", 
        question: "2. What Kind of world or story sounds most exciting?",
        options: [
            {label: "Magic, Myth, and Fantasy", value: "Fantasy"},
            {label: "Real Life, School, Friendship", value: "Realistic Fiction"},
            {label: "History and Time Travel", value:"Historical Fiction"},
            {label: "Sci-Fi and Future worlds", value: "Sci-Fi"},
        ],
    },
    {
        id: "format", 
        question: "3. How do you like your stories told?",
        options: [
            {label: "Any format (surprise Me!)", value: "Any"},
            {label: "Graphic Novels and Comics", value: "Graphic Novel"},
            {label: "Classic Stories and Folklore", value: "Classic"},
            {label: "True Stories, Memoirs, and Nonfiction", value: "Nonfiction"},
        ],
    },
    {
        id: "mood", 
        question: "4. What mood are you in today?",
        options: [
            {label: "Any Mood", value: "Any"},
            {label: "Make me laugh (Humor)", value: "Humor"},
            {label: "Edge-of-my-seat Action and Adventure", value: "Adventure"},
            {label: "Heartwarming and Inspiring", value: "Drama"},
        ],
    },

    // part 2 National questions
    {
        id: "placement1", 
        question: '5. Vocabulary Check: "Maya was reluctant to jump into the cold lake, so she dipped just one toe in first." What does "reluctant" mean?',
        options: [
            {label: "Unwilling or hesitant", points: 2},
            {label: "Excited and rushing", points: 0},
            {label: "Angry and loud", points: 0},
            {label: "Completely sure", points: 0},
        ],
    },
    {
        id: "placement2", 
        question: '6. Inference Check: "Leo shoved his muddy books under the bed and wiped his hands on his jeans right before Mom opened the door." Why did Leo hide his boots?',
        options: [
            {label: "He was going outside", points: 0},
            {label: "He was going to sleep", points: 0},
            {label: "He washed the boots", points: 0},
            {label: "He did not want Mom to see been in mud", points: 2},
        ],
    },
    {
        id: "placement3", 
        question: '7. Context and Tone Check: "Although the ancient fortress appeared impenetrable, the scouts discovered a concealed aqueduct beneath the eastern all." What does "impenetrable" mean?',
        options: [
            {label: "Hard to touch", points: 0},
            {label: "Impossible to enter or break through", points: 3},
            {label: "Easy to get in", points: 0},
            {label: "Made of glass", points: 0},
        ],
    },
    {
        id: "placement4", 
        question: '8. Literacy Analysis: "In a society that prizes conformity above curiosity, asking `why` becomes an act of quiet rebellion." What is the main idea of this sentence?',
        options: [
            {label: "People should never ask questions", points: 0},
            {label: "Curiosity harmed the cat", points: 0},
            {label: "Questioning rules in a strict society takes courage", points: 3},
            {label: "Everyone loves to follow the rules", points: 0},
        ],
    },
]

function getRankDetails(totalScore) {
    if(totalScore <= 3) return { grade: 3, rank: "✨Spellbook Starter" }
    if(totalScore <= 5) return { grade: 5, rank: "🪄Junior Enchanter" }
    if(totalScore <= 7) return { grade: 7, rank: "🧪Arcane Seeker"}
    return { grade: 10, rank: "🧙🏽‍♂️Grand Archmage" }

}

function ReadingQuiz({ onAddBook, onBackToShelf }){
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [matches, setMatches] = useState([])
    const [earnedRank, setEarnedRank] = useState("")
    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [savedTitles, setSavedTitles] = useState([])

async function handleSelectOption(questionId, option) {
    const updateAnswers = { ...answers, [questionId]: option }

    setAnswers(updateAnswers)
    if (step + 1 < Quiz_Questions.length) {
        setStep(step + 1)

    } else {
        await findMatchingBooks(updateAnswers)
    }
}    

async function findMatchingBooks(finalAnswers) {
    setLoading(true)
    setFinished(true)

const placementPoints = 
    (finalAnswers.placement1?.points  || 0) + (finalAnswers.placement2?.points  || 0) +
    (finalAnswers.placement3?.points  || 0) + (finalAnswers.placement4?.points  || 0)
const themeBonus = 
    finalAnswers.theme?.value === 3 ? 1 : finalAnswers.theme?.value === 5 ? 2 :
    finalAnswers.theme?.value === 7 ? 3 : finalAnswers.theme?.value === 10 ? 4: 0  

const { grade, rank } = getRankDetails(placementPoints + themeBonus)
setEarnedRank(rank)

const { data, error } = await supabase
.from("books")
.select("*")
.lte("min_grade", grade)
.gte("max_grade", grade)

if(error) {console.error("Error fetching quiz recommendations:", error); setLoading(false); return }

const gradeBooks = data || []
const chosenGenre = finalAnswers.genre?.value || "Any"
const chosenFormat = finalAnswers.format?.value || "Any"
const chosenMood = finalAnswers.mood?.value || "Any"

let bestMatches = gradeBooks.filter((book) => {
    const genresText = (book.genres || "").toLowerCase()
    const formatText = (book.format_type || "").toLowerCase()
    const matchesGenre = chosenGenre === "Any" || genresText.includes(chosenGenre.toLowerCase()) || formatText.includes(chosenGenre.toLowerCase())
    const matchesFormat = chosenFormat === "Any" || formatText.includes(chosenFormat.toLowerCase()) || genresText.includes(chosenFormat.toLowerCase())
    return matchesGenre && matchesFormat
})

if (chosenMood !== "Any" && bestMatches.length >  0) {
    const moodMatches = bestMatches.filter((book) => (book.genres || "").toLowerCase().includes(chosenMood.toLowerCase()))
    if (moodMatches.length > 0) bestMatches = moodMatches
}

const pool = bestMatches.length > 0 ? bestMatches : gradeBooks
setMatches([...pool].sort(() => 0.5 - Math.random()).slice(0, 3)) 
setLoading(false)
}

async function handleSaveBook(book) {
const success = await onAddBook({
    title: book.title,
    author: book.author || "Unknown Author",
    status: "Want to Read",
    rating: null,
    summary: "",
})
    if (success) setSavedTitles([...savedTitles, book.title])
}


function resetQuiz() {
    setStep(0); setAnswers({}); setEarnedRank(""); setFinished(false); setSavedTitles([])
}

const currentQuestion = Quiz_Questions[step]
const progressPercent = finished ? 100 : Math.round(((step + 1) / Quiz_Questions.length) * 100)

return(
    <article className="quiz-card">
        <header>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <strong>🪄Magical Reading Placement & Book Finder</strong>
                <small>{finished ? "Complete!" : `Question ${step +1 } of ${Quiz_Questions.length}`}</small>
            </div>
            <progress value={progressPercent} max="100" style={{ marginTop: "8px", marginBottom: 0}} />
        </header>

        {!finished ? (
            <div>
                <p><strong>{currentQuestion.question}</strong></p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px"}}>
                    {currentQuestion.options.map((option) => (
                        <button key={option.label} type="button" className="outline quiz-option-btn" onClick={() => handleSelectOption(currentQuestion.id, option)}>{option.label}</button>
                    ))}
                </div>
                {step > 0 && (
                    <footer>
                        <button type="button" className="secondary" onClick={() => setStep(step - 1)}>Previous Question</button>
                    </footer>
                )}
            </div>    
        ) : (
        <div>
        {loading ? (
            <p aria-busy="true">Calculating your magical rank and finding books...</p>
        ) : (
            <div>
                <p>Your Magical Reading Rank:<strong>{earnedRank}</strong></p>
                <p><strong>Top Book Picks Matched to your Reading Level & Style:</strong></p>
                {matches.map((book, index) => {
                    const isSaved = savedTitles.includes(book.title)
                    return(
                        <div key={book.title || index} className="quiz-result-card">
                            <strong>{book.title}</strong> by {book.author}
                            {book.description && <p style={{margin: "6px 0"}}>{book.description}</p>}
                            <button type="button" disabled={isSaved} onClick={() => handleSaveBook(book)}>{isSaved ? "Added to Want to Read" : "+ Add to My Self"}</button>
                        </div>
                    )
                })}
            </div>
        )}
        <footer style={{ display: "flex", gap: "10px", flexWrap: "wrap"}}>
            <button type="button" className="secondary" onClick={resetQuiz}>Retake Quiz</button>
            {onBackToShelf && <button type="button" onClick={onBackToShelf}>View My Shelf</button>}

        </footer>
        </div>
    )}        
    </article>
    )
}

export default ReadingQuiz
