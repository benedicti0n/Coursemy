import express from "express" //ES6 syntax - import statement
const app = express()

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen("8000", () => {
    console.log("Server running on 8000")
})