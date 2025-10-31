// Import required modules
const express = require("express");
const axios = require("axios");
const path = require("path");

// Create an express app
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware to serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Home route to fetch a joke and show it on the homepage
app.get("/", async (req, res) => {
  try {
    // Fetch joke using Axios from JokeAPI
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");

    const joke = response.data.joke; // extract joke text

    // Render home.ejs and pass the joke
    res.render("home", { joke: joke });

  } catch (error) {
    console.error("Error fetching joke:", error.message);

    // Instead of rendering error.ejs, just send text
    res.send("Sorry, we couldn't load a joke 😞");
  }
});

// Start the server on port 3000
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
