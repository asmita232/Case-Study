require('./db/init')

const express = require('express')
const homeRouter = require('./routes/home')
const usersRouter = require('./routes/users')
const meetingsRouter = require('./routes/meetings')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(homeRouter)
app.use('/meetings', meetingsRouter)
app.use('/users', usersRouter)


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})