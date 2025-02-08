# My Bookstore

My Bookstore is a web application that allows users to add, view, sort, and delete books from a database. It integrates with the Open Library API to fetch book cover images automatically.

## Features

- Add new books with title, author, rating, and description.
- Automatically fetch book cover images using Open Library API.
- View books in a structured layout.
- Sort books by rating in ascending order.
- Delete books from the database.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS, JavaScript, EJS (Embedded JavaScript)
- **External API:** Open Library API for book cover images

## Installation & Setup

### Prerequisites

- Node.js installed on your system
- PostgreSQL installed and running

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/Mech-Kal/bookstore-app.git
   cd bookstore-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure PostgreSQL database:
   - Create a database named `bookestore`.
   - Ensure PostgreSQL is running on `localhost:5433`.
   - Update the `db` connection details in `server.js` if necessary.

4. Run the server:
   ```sh
   node server.js
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## API Endpoints

| Method | Endpoint       | Description                      |
|--------|---------------|----------------------------------|
| GET    | `/`           | Fetch all books                 |
| GET    | `/ascending`  | Fetch books sorted by rating    |
| POST   | `/add`        | Add a new book                  |
| POST   | `/delete/:id` | Delete a book by its ID         |

## File Structure
```
/bookstore-app
│-- public/
│   ├── style.css (Frontend styling)
│-- views/
│   ├── index.ejs (Homepage UI)
│   ├── add-book.ejs (Form UI)
│-- server.js (Main backend logic)
│-- package.json (Project dependencies)
│-- README.md (Documentation)
```

## Future Improvements

- Implement user authentication.
- Allow users to update book details.
- Add pagination for better performance.
- Implement additional sorting and filtering options.

## License
This project is licensed under the MIT License.

