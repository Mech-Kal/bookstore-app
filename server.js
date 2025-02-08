import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookestore",
  password: process.env.PG_PASSWORD,
  port: 5433,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function getImage(title, author) {
    try {
        // Fetching data from OpenLibrary API (or other sources)
        const response = await axios.get(`https://openlibrary.org/search.json?title=${title}&author=${author}`);
        
        if (response.data.docs && response.data.docs.length > 0) {
          const bookCoverUrl = `https://covers.openlibrary.org/b/id/${response.data.docs[0].cover_i}-M.jpg`;
          return bookCoverUrl;
        } else {
          return 'https://via.placeholder.com/150' ; // Default image if no result found
        }
      } catch (error) {
        console.error(error);
        return coverUrl= 'https://via.placeholder.com/150' ; // Default image on error
      }
    }
    


app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    items = result.rows;

    res.render("index.ejs", {
      books: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/ascending", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM books ORDER BY rating ASC");
      items = result.rows;
  
      res.render("index.ejs", {
        books: items,
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/add", async (req, res) => {
    const title = req.body["title"];
    const author = req.body["author"];
    const rating = req.body["rating"];
    const description = req.body["title"];
  
    const result = await db.query(
      "SELECT country_code FROM books WHERE title = $1 AND author = $2 AND rating = $3 AND description = $4",
      [title, author, rating, description]
    );
  
    if (result.rows.length !== 0) {
     const imageUrl = await getImage(title, author); 
  
      await db.query("INSERT INTO books (title, author, rating, description) VALUES ($1, $2, $3, $4)", [
        title, author, rating, description
      ]);
      res.redirect("/");
    }
  });

app.post("/delete/:id", async (req, res) => {
    const id = req.body.Id;
    try {
      await db.query("DELETE FROM books WHERE id = $1", [id]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });