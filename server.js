const express = require("express");
const path = require("path")
const app = express();

const PORT = process.env.PORT || 8080;

// Middleware Functions
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// to get styles
// tells the server that we allow access to our public file, that way it
// will have access to our css pages
app.use(express.static("public"));


// app.get("/", function(req, res){
//     req.sendFile(path.join(__dirname, "public", "index.html"));
// });


// HTML ROUTES
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
    // Retrieve all notes and the res.json them back to the front end
});

// API ROUTES
app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
    // Retrieve all notes and the res.json them back to the front end
    res.json(notesArr)
});

app.post("/api/notes", function(req, res){
    // creates a note from req.body
    const newNote = req.body;
    console.log(newNote + " FROM POST IN SERVER");
    notesArr.push(newNote);
    res.json(newNote)
    
});

app.delete("api/notes/:id", function(req, res){
    // Delete a note based off id
    const { id } = req.params;

});


const notesArr = [];

app.get("*", function(req, res){
    req.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
