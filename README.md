# Magical Reading Journal
My Magical Reading Journal is an interactive React and Supabase web application that helps young readers discover grade-leveled books through a magical placement quiz and track their personal reading progress, star ratings, and book summaries across organized shelves.

## The problem
A reader and/or their parent guide to an engaging, simple place to log books, rate books summarize stories, and find age-appropriate reading material. It turns the traditional reading logs that feel like chores and kids often forget what they liked about past books. My app will let visitors view their magical bookshelf, log new books with ratings and summaries, take a reading level quiz, and receive tailored book suggestions.

## Persona
- Name and situation: Any child between the grades 2nd - 12th who  wants a fun and encouraging way to find books that match her actual reading level, and likes tracking her progress from 'Want to Read' to 'Finished' 

- Frustration: Paper reading are always getting lost, and Kannon does not like writing the book reports as he states,"They are to long and boring to do".

- Goal: Build a fun reading habit the allows parents, librarians, and teachers who want a simple, distraction-free reading log where kids can reflect on finished books with star ratings and short written summaries without needing complex accounts.

- When they'd open the app: Anytime they need a new book suggestion or finishing a chapter or book.

## Scope

### In this version
1. A visitor sees a list of books that are loaded from Supabase, filters them into Currently Reading, Want to Read, and Finished shelves, lets users filter visible shelves via a status dropdown, and supports adding, updating status, and deleting books..  
<!-- {try to update that filter to reading level} -->

2. Reveals interactive StarRating and Summary Notes inputs only when a book's status is 'Finished', and lets users add or edit ratings and summaries directly on Finished book cards.

3. A visitor takes an interactive 8-Question Magical Reading Placement Quiz: Toggles to a dedicated quiz view combining 4 story-preference questions and 4 reading-comprehension questions to assign a magical rank (Spellbook Starter through Grand Archmage), query matching books by grade level, and add recommendations straight to the personal shelf.

### Left out, and why
- Personal user login is left so children and their parents and open and start reading and tracking immediately.
<!-- {Maybe for future use set up for multiply users with their own login credentials.} -->
- External book API was left out to keep the data set light and prevent broken links that would prevent the site from working.

## The table
Table: `books`

| Column | Type | Example value |
| --- | --- | --- |
| `title` | `text` | The Hobbit |
| `author` | `text` | J.R.R. Tolkien |
| `status` | `text` | Finished |
| `level` | `text` | Enchanted Explorer |
| `rating` | `int4` | 5 |
| `summary` | `text` | Bilbo goes on an unexpected adventure with dwarves and finds a magic ring. |


`id` and `created_at` are made for you.

##
Table 2: `shelf`

| Column | Type | Example value |
| --- | --- | --- |
| `title` | `text` | Percy Jackson & The Lightning Thief |
| `author` | `text` | Rick Riordan |
| `status` | `text` | Currently Reading |
| `rating` | `int4` | 5 |
| `summary` | `text` | Percy discovers he is a demigod and goes on a quest to find Zeus's stolen lightning bolt. |

`id` and `created_at` are made for you.


## The plan
- The plan is create an app that improves the love of reading by having children be able to rate, summarize, and have books suggested for them based of a quiz in order to rank up to Grand Archmage.


### Sections
- What a visitor sees, top to bottom.
•	ReadingQuiz.jsx (8-Question Placement & Matching)

•	Bookform.jsx (Controlled Form)

•	BookList.jsx (Shelf Display & Inline Review Editor)

•	BookSuggestions.jsx & StarRating.jsx (BookSuggestions & StarRating)

•	App.jsx (Parent State & Supabase CRUD)

![Wireframe](wireframe.png)

## System
•	Loading States: Bookform tracks a saving boolean that applies Pico CSS's aria-busy={saving} spinner and switches the button label to 'Saving...' during inserts. ReadingQuiz tracks a loading state while querying Supabase for grade-level matches.

•	Empty States: When any shelf array has books.length === 0, BookList renders a friendly fallback card prompting the user to click '+ Add Book' to start their reading journey.

•	Failure States: Every Supabase query checks the returned error object, logs descriptive diagnostics with console.error, exits safely without corrupting React state, and returns false from handleAddBook so form inputs are preserved if a save fails.

## Reflection: the plan
I was added books to the main book data and it was just was not showcasing them in a separate shelf. I had to add a second table in order to do so and also and to filter out the finished tab books in order to rate them. 

## What changed
The way books are saved to a separate shelf instead of the main data set.

## Reflection: feedback

## Reflection

## AI use
- Brainstorm of the fantasy reading level names.
- How to add the emoji for the star and magic globe since I did not know the commands for them(window key .).
- Advice on best colors that matched the pale turquoise background theme. 
- Best reading level questions based off my list of books in the Supabase and national based reading assessments to receive the most accurate book suggestions. 
- Debugging Supabase queries

## Links
- Live: https://capstone-level-3.netlify.app/
- Repo: https://github.com/kimberly-brisby/Capstone-level-3

## Team
Pod: 
Pod plan: https://1drv.ms/w/c/db29e00c5d8dfbee/IQBCztJ1uTDpTphgArbKrBM6AcbFp2xAHGbcBmONEmMFMLw?e=B6L3lS&nav=eyJoIjoiMTE4MjI2MzAyMiJ9