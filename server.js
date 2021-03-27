const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const data = require("./db/db.json");

const PORT = process.env.PORT || 8080;

// Middleware Functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to get styles
// tells the server that we allow access to our public file, that way it
// will have access to our css pages
app.use(express.static("public"));


// HTML ROUTES
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  // Retrieve all notes and the res.json them back to the front end
});

// API ROUTES
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    try {
      let db = JSON.parse(data);
      res.send(db);
    } catch {
      let array = [];
      let obj = JSON.parse(`{${data}}`);
      array.push(obj);
      res.send(array);
    }
  });

  // Retrieve all notes and the res.json them back to the front end
});

app.post("/api/notes", function (req, res) {
  // creates a note from req.body
  const { body } = req;
  if (body === undefined) {
    res.send("NO NOTE");
    return;
  }

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let db = JSON.parse(data);
    body.id = db.length;
    db.push(body);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      if (!err) {
        res.send("ok");
      } else {
        console.log("Error at writeFile: ", err);
        throw err;
      }
    });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  // Delete a note based off id
  const { id } = req.params;
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    let db = JSON.parse(data);
    db.splice(id, 1);
    let reIndexdb = db.map((currentElement, index) => {
      currentElement = { ...currentElement, id: index };
      return currentElement;
    });
    fs.writeFile("./db/db.json", JSON.stringify(reIndexdb), (err) => {
      if (!err) {
        res.send("ok");
      } else {
        throw err("ERROR ON SERVER DELETE");
      }
    });
  });
});


app.get("*", function (req, res) {
  req.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
