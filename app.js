// const express = require('express')
// const { connectToDb, getDb} = require('./db')

// //init app & middleware
// const app = express()

// //db connection

// app.listen(3000, () => {
//   console.log('listen port 3000')
// })

// //routes
// app.get('/admin_user', (req, res) => {
//   res.json({msg: "Welcome to api"})
// })

const express = require("express");
const { connectToDb, getDb } = require("./db");
const cors = (require("cors"))
//init app & middleware
const app = express();
app.use(express.json())
app.use(cors());
//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("listen port 3000");
    });
    db = getDb();
  }
});

//routes
app.get("/admin", (req, res) => {
  let user = [];
  db.collection('admin')
    .find()
    .sort({ username: 1 })
    .forEach((users) => user.push(users))
    .then(() => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the data" });
    });
});

app.post("/admin", (req, res) => {
  const admin = req.body

  db.collection("admin")
    .insertOne(admin)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({error: 'Could not add a data'})
    })
})

// app.get("/admin/:username/:isSuperAdmin",  (req, res) => {
//   const {username, isSuperAdmin} = req.params
//   const query =username
//   const querySuperAdmin =  isSuperAdmin

//   db.collection("admin")
//     .find({username: query, isSuperAdmin: querySuperAdmin})
//     .toArray()
//     .then(results => {
//       res.json(results);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

app.get("/admin/:username/:isSuperAdmin", (req, res) => {
  const { username, isSuperAdmin } = req.params;
  const query = { username, isSuperAdmin }; // Use query object

  db.collection("admin")
    .find(query) // Use the query object here
    .toArray()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});
