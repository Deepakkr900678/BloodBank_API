const express = require("express")

const loginRoutes = require("./routes/login")
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/posts")

const app = express();

app.use("/api/v1",loginRoutes)
app.use("/api/v1",userRoutes)
app.use("/api/v1",postRoutes)

app.get("/", (req, res) => {
    res.send("Everthing Is Perfect")
})

app.listen(3500, () => console.log("Server is up at 3500 port"))