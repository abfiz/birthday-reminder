const express = require ("express")
require('dotenv').config();
const cron = require ("node-cron")
const moment = require ("moment")
const connect_DB = require("./config/mongoose")
const path = require('path')
const sendBirthdayEmails = require("./service/sendEmail")


const app = express()
PORT = process.env.PORT || 5000


app.set("view engine", "ejs")
app.set('views', 'views')

app.use('/', require('./route/main'));


// Schedule to send birthday email
cron.schedule("0 7 * * *", sendBirthdayEmails, {
    scheduled: true,
    timezone: "Africa/Lagos"
})

connect_DB()
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
    sendBirthdayEmails()
})

module.exports = { sendBirthdayEmails };