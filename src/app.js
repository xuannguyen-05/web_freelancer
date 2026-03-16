const express = require("express")

const routes = require("./routes")

const app = express()

//config req.body
app.use(express.json());        // đọc JSON
app.use(express.urlencoded({ extended: true })); // đọc form

app.use("/uploads", express.static("public/uploads"))

app.use("/api", routes)

module.exports = app