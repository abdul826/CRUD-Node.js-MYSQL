import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
// To handle the cors error
app.use(cors());

// To read the json data 
app.use(express.json());

// Database Connection 
const db = mysql.createConnection({
    host: "localhost",
  user: "root",
  password: "",
  database: "book",
});

// Check connection is stablished or not
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// fetch form db
app.get("/info",(req,res)=>{
    const sql = db.query("Select * from student");
    db.query(sql, (err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json(data);
    })
});

// Insert Into DB
app.post('/info', (req,res)=>{
    const sql = db.query("Insert into stu_info(Name, email, phone) Values(?)");

    const Values = [
        req.body.Name,
        req.body.email,
        req.body.phone,
    ];

    db.query(sql, [Values], (err,data)=>{
        if(err) return res.json(err);

        res.status(201).json(data);
    })
});

// Delete from DB
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const sql = "DELETE FROM books WHERE id = ? ";
  
    db.query(sql,[bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8000, ()=>{
    console.log('Connect to database');
})