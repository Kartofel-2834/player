const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const path = require("path")
const mongoose = require('mongoose');
const staticShit = require('../staticShit')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

let usersData = null
let tracksData = null

mongoose.connect( staticShit.mongoCluster0, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then( ()=>{
  console.log("Mongo connected - tracks")

  usersData = staticShit.users
  tracksData = staticShit.tracks
}).catch( err => console.log(err) )

router.get("/myTracks", async (req, res)=>{
  let myTracks = null

  try {
    let user = await usersData.findOne( { name: "Kartofel_2834" } )
    myTracks = await tracksData.find( { _id: { $in: user.tracks }  } )
  } catch (e) { throw e }

  res.json( myTracks )
})

module.exports = router
