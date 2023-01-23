const express = require("express");
const cors = require("cors");
const app = express();
const port = 9990;

app.use(cors());
app.use(express.json());


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


app.get("/pgcontacts", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM contacts")
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

// const createTable = `
// CREATE TABLE contacts (gender text, firstName text, lastName text, email text, picture text, nation text);  
// INSERT INTO contacts (gender, firstName, lastName, email, picture, nation) VALUES ('male', 'Isabel', 'Rendón', 'isabel.rendon@example.com', 'https://randomuser.me/api/portraits/med/men/70.jpg', 'MX');
// INSERT INTO contacts (gender, firstName, lastName, email, picture, nation) VALUES ('female', 'Sara', 'Paavola', 'sara.paavola@example.com', 'https://randomuser.me/api/portraits/med/women/59.jpg', 'FI');
// INSERT INTO contacts (gender, firstName, lastName, email, picture, nation) VALUES ('male', 'Helmer', 'Høyvik', 'helmer.hoyvik@example.com', 'https://randomuser.me/api/portraits/med/men/51.jpg', 'NO');
// INSERT INTO contacts (gender, firstName, lastName, email, picture, nation) VALUES ('male', 'Storm', 'Peterson', 'storm.petersen@example.com', 'https://randomuser.me/api/portraits/med/men/25.jpg', 'DK');
// CREATE INDEX idx_contacts_id ON contacts(email);
// `;

// const viewTable = `
// SELECT * FROM contacts
// `

// pool.query(createTable);

// const res = pool.query(viewTable);

// console.log(res.rows);

// module.exports = {
//     pool,
// }
