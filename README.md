# Magical Reading Journal

## The problem
A reader and/or their parent guide to an engaging, simple place to log books, rate books summarize stories, and find age-appropriate reading material. It turns the traditional reading logs that feel like chores and kids often forget what they liked about past books. My app will let visitors view their magical bookshelf, log new books with ratings and summaries, take a reading level quiz, and receive tailored book suggestions.

## Persona
- Name and situation: Kannon(age 10) and his parents. Kannon does not like to read and his are having a difficult time finding  ways to track and access his reading level. 
- Frustration: Paper reading are always getting lost, and Kannon does not like writing the book reports as he states,"They are to long and boring to do".
- Goal: Build a fun reading habit where Kannon gets excited to rate his books, write short summaries, and unlock higher "magical" reading ranks.
- When they'd open the app: Anytime they need a new book suggestion or finishing a chapter or book.

## Scope

### In this version
1. A visitor sees a list of logged books filtered by `All Books`, `Want to Read`, `Finished`.  
<!-- {try to update that filter to reading level} -->
2. A visitor adds a row by a new book entry with title, author, reading status, reading level, star rating, and summary notes.
3. A visitor takes an interactive, "Reading Quiz", to discover their reader rank and uses the, "oracle", which suggest book based on interest and level.

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

## The plan
- The plan is create an app that improves the love of reading by having children be able to rate, summarize, and have books suggested for them based of a quiz in order to rank up to Grand Archmage.

### Sections
- What a visitor sees, top to bottom.

![Wireframe](wireframe.png)

## System
- The visitor:
- The app:
- The visitor sees:
- While loading:
- If nothing matches:
- If it fails:

## Reflection: the plan

## What changed

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