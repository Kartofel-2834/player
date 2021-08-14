const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const path = require("path")
const ejs = require("ejs")

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 3000
const routerPath = path.join(__dirname, "router")

let sendFile = require( `${routerPath}/sendFile.js` )
let trackManager = require( `${routerPath}/tracks.js` )

app.use( urlencodedParser )

app.use( sendFile )
app.use( trackManager )


app.get("/", (req, res)=>{ res.sendFile(`${__dirname}/public/html/index.html`) })

app.listen(port, ()=>{ console.log(`Server working on port ${port}`) })
