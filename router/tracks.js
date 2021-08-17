const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const path = require("path")
const fs = require("fs")
const mongoose = require('mongoose');
const multer = require('multer')
const ffmetadata = require("ffmetadata")
const staticShit = require('../staticShit')
const trackBufferPath = path.join( staticShit.publicPath, 'trackBuffer' )

ffmetadata.setFfmpegPath( path.join( __dirname, 'FFmpeg', 'bin', 'ffmpeg.exe' ) )

const storage = multer.diskStorage({
  destination: trackBufferPath,
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + '.mp3');
  },
})

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    let condition = file.mimetype == 'audio/mpeg' && /.mp3/.test( file.originalname )
    return cb(null, condition)
  },
}).array('newTracks')


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

router.post("/addTracks", upload, async (req, res)=>{
  if ( !req.files || req.files.length == 0){
    res.sendStatus(404); return
  }

  for( let file of req.files ){

    await ffmetadata.read( file.path, async function(err, data) {
      if ( err ){ return }

      let newTrack = { poster: false }
      newTrack.title = data.title ? data.title :"Untitled"
      newTrack.author = data.artist ? data.artist : "None"

      try {
        newTrack = await tracksData.create( newTrack )

        await usersData.findOneAndUpdate( { name: "Kartofel_2834" }, {
          $push: { tracks: String( newTrack._id ) }
        })
      } catch (e) { throw e }

      let trackPath = path.join(staticShit.publicPath, 'tracks', `${newTrack._id}.mp3`)

      await overwriteFile( file.path, trackPath )
    })

  }

  res.sendStatus(200)
})

async function overwriteFile(filePath, newPath){
  let file = fs.readFileSync( filePath )

  if( !file ){ return }

  await fs.writeFile( newPath, file, (err)=>{ if( err ){ throw err } })
  await fs.unlink( filePath, (err)=>{ if(err){ throw err } } )
}


module.exports = router
