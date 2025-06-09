// Controller for handling user authentication
const path = require('path');
const axios = require("axios");

// Serve login page
const login = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/login.html"));
  // Path.join resets when an absolute path segment is used. Using
  // '/public/login.html' would resolve to '/public/login.html' which is not
  // within the project. Join path segments without leading slashes so the
  // resulting path correctly points to the file inside our project.
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
};

// Logout user
const logout = (req, res) => {
  req.logout();
  res.sendFile(path.join(__dirname, "..", "/public/login.html"));
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
};


// Serve protected page
const protected = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/protected.html"));
  res.sendFile(path.join(__dirname, "..", "public", "protected.html"));
};

// GitHub authentication
const authGitHub = (req, res) => {};

// Callback after authentication
const authCallback = (req, res) => {
    res.redirect("/");
};

// Get user details
const me = (req, res) => {
    res.json(req.user);
};

// Get GitHub user details
const gitHubMe = (req, res) => {
    const token = req.user.token;
    axios
      .get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (err) {
        res.json(err);
      });
};

module.exports = {login, logout, protected, authGitHub, authCallback, me, gitHubMe};