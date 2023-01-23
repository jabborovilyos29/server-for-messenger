const express = require("express");
const cors = require("cors");
const app = express();
const port = 9999;


const { Pool } = require("pg");

const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 5000,
  host: "localhost",
  port: 7777,
  user: "postgres",
  password: "1122",
  database: "postgres",
});


// const contacts = [
//   {
//     gender: "male",
//     name: {
//       title: "Mr",
//       first: "Isabel",
//       last: "Rendón",
//     },
//     email: "isabel.rendon@example.com",
//     picture: {
//       large: "https://randomuser.me/api/portraits/men/70.jpg",
//       medium: "https://randomuser.me/api/portraits/med/men/70.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/men/70.jpg",
//     },
//     nat: "MX",
//   },
//   {
//     gender: "female",
//     name: {
//       title: "Mrs",
//       first: "Sara",
//       last: "Paavola",
//     },
//     email: "sara.paavola@example.com",
//     picture: {
//       large: "https://randomuser.me/api/portraits/women/59.jpg",
//       medium: "https://randomuser.me/api/portraits/med/women/59.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/women/59.jpg",
//     },
//     nat: "FI",
//   },
//   {
//     gender: "male",
//     name: {
//       title: "Mr",
//       first: "Helmer",
//       last: "Høyvik",
//     },
//     email: "helmer.hoyvik@example.com",
//     picture: {
//       large: "https://randomuser.me/api/portraits/men/51.jpg",
//       medium: "https://randomuser.me/api/portraits/med/men/51.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/men/51.jpg",
//     },
//     nat: "NO",
//   },
//   {
//     gender: "male",
//     name: {
//       title: "Mr",
//       first: "Storm",
//       last: "Petersen",
//     },
//     email: "storm.petersen@example.com",
//     picture: {
//       large: "https://randomuser.me/api/portraits/men/25.jpg",
//       medium: "https://randomuser.me/api/portraits/med/men/25.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/men/25.jpg",
//     },
//     nat: "DK",
//   },
// ];


app.use(cors());
app.use(express.json());

app.get("/contacts", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM contacts")
    res.status(200).json(
      results.rows
    )

  } catch (error) {
    console.log(error) 
  }
});

app.post("/message-create", async (req, res) => {
  try {
    const results = await pool.query("INSERT INTO messages (id, email, text) values ($1, $2, $3) returning *", 
    [req.body.id, req.body.email, req.body.text]
    )
    res.status(201).json(
      results.rows[0]
    )
  } catch (error) {
    console.log(error)
  }
})

app.put("/update-message", async (req, res) => {
  try {
    const results = await pool.query("UPDATE messages SET text=$1 where id=$2;", 
    [req.body.text, req.body.id]
    );
    res.status(200).json(
      results.rows
    )
  } catch (error) {
    console.log(error)
  }
});


app.delete("/delete-message", async (req, res)=>{
    try {
      const results = await pool.query("DELETE from messages where id=$1;", 
    [req.body.id]
    );
    res.status(204).json(
     {status: 'sucess'}
    ) 
    } catch (error) {
      console.log(error)
    }
})


app.get("/send-message", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM messages")
    console.log(results) 
    res.status(200).json(
      results.rows
    )

  } catch (error) {
    console.log(error) 
  }
});

app.listen(port, () => {
  console.log(`listening...`);
});
