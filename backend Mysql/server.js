const userroute=require("./routes/userRoutes.js")
const express = require('express')
const app = express()
app.use(express.json())
app.use("/api/v1",userroute)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})