import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import mysql from "mysql";
import paginate from "express-paginate";

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cointab",
});

app.post("/post", (req, res) => {
  let get = getPost();
  res.send(get);
});

async function getPost() {
  const data = await fetch("https://randomuser.me/api?results=50");
  const res = await data.json();
  let result = res.results;

  let sql = "INSERT INTO cointab SET ?";
  for (let i = 0; i < result.length; i++) {
    let post = {
      first: result[i].name.first,
      last: result[i].name.last,
      gender: result[i].gender,
      email: result[i].email,
      location: result[i].location.street.name,
      pin: result[i].location.street.number,
      nat: result[i].nat,
      picture: result[i].picture.large,
    };

    connection.query(sql, post, (err, result) => {
      if (err) {
        throw err;
      }
    });
  }
}

app.get("/get", (req, res) => {
  let sql = "SELECT * FROM cointab";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).send({
      message: true,
      data: results,
    });
  });
});

app.get("/search/:key", (req, res) => {
  connection.query(
    `SELECT * FROM cointab WHERE gender = '${req.params.key}' `,
    function (err, results) {
      if (err) throw err;
      console.log(results);
      res.status(200).send({
        message: true,
        data: results,
      });
    }
  );
});

// app.use(paginate.middleware(10, 50));

// app.get("/get", (req, res) => {
//   const limit = req.query.limit || 10;
//   const offset = req.offset;
//   console.log(limit);
//   services
//     .findRecords({
//       offset: offset,
//       limit: limit,
//     })
//     .then((results) => {
//       const pageCount = Math.ceil(results.count / limit);
//       console.log(pageCount);

//       res.status(200).send({
//         message: true,
//         data: results,
//         pageCount,
//       });
//     });
// });

app.delete("/delete", (req, res) => {
  connection.query("DELETE FROM cointab", function (err, result, fields) {
    if (err) console.log(err);

    console.log(result);
  });
  res.send("data deleted Successfully");
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("my sql connected ...");
});

app.listen(8080, () => {
  console.log("server Started on port 8080");
});
