require('./db/init')

const express = require('express')
const homeRouter = require('./routes/home')
const usersRouter = require('./routes/users')
const meetingsRouter = require('./routes/meetings')
const calendarRouter = require('./routes/calendar')
const authRouter = require('./routes/auth')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/',homeRouter)
app.use('/login', authRouter)
app.use('/meetings', meetingsRouter)
app.use('/users', usersRouter)
app.use('/calendar', calendarRouter)


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})