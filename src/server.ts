import express from "express";

const app = express()

app.get("/",(request, response) => {
    const posts = [
        {
            id: 1,
            name: "post 1"
        },
        {
            id: 2,
            name: "post 2"
        },
        {
            id: 3,
            name: "post 3"
        }
    ]
    
    response.json(posts)
})

app.listen("3000")
console.log("[online] http://localhost:3000")