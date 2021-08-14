const express = require("express")
const path = require("path")

const router = express.Router()
const staticShit = require('../staticShit')

router.get("/file", (req, res)=>{
  res.sendFile( path.join(staticShit.publicPath, req.query.path) )
})

module.exports = router
