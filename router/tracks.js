const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const path = require("path")
const fs = require("fs")
const mongoose = require('mongoose');
const multer = require('multer')
const ffmetadata = require("ffmetadata")
const staticShit = require('../staticShit')
const imageSquare = require("./imageSquare")
const fileBufferPath = path.join( staticShit.publicPath, 'fileBuffer' )

ffmetadata.setFfmpegPath( path.join( __dirname, 'FFmpeg', 'bin', 'ffmpeg.exe' ) )

const trackStorage = multer.diskStorage({
  destination: fileBufferPath,
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + '.mp3');
  },
})

const uploadTracks = multer({
  storage: trackStorage,
  fileFilter: function(req, file, cb){
    let condition = file.mimetype == 'audio/mpeg' && /.mp3/.test( file.originalname )
    return cb(null, condition)
  },
}).array('newTracks')

const imageStorage = multer.diskStorage({
  destination: fileBufferPath,
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  },
})

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: function(req, file, cb){
    let ext = path.extname( file.originalname )
    return cb(null, /jpg|png|jpeg/.test( ext ) )
  }
}).single("image")


const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use( urlencodedParser )
router.use( bodyParser.json() )

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

  res.json( myTracks.reverse() )
})

router.post("/addTracks", uploadTracks, async (req, res)=>{
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
      } catch(e){ throw e }

      let trackPath = path.join(staticShit.publicPath, 'tracks', `${newTrack._id}.mp3`)

      await overwriteFile( file.path, trackPath )
    })

  }

  res.sendStatus(200)
})

router.post("/deleteTracks", async (req, res)=>{
  let trash = req.body.trash

  console.log( trash )

  if( !trash || trash.length == 0 ){ res.sendStatus(200); return }

  try {
    await tracksData.deleteMany({ _id: { $in: trash } })
    await usersData.findOneAndUpdate( { name: "Kartofel_2834" }, {
      $pull: { tracks: { $in: trash } }
    })
  }
  catch(e){ throw e }

  let posterPath = null
  let trackPath = null

  for( let id of trash ){
    posterPath = path.join( staticShit.publicPath, 'posters', `${id}.jpg`)
    trackPath = path.join( staticShit.publicPath, 'tracks', `${id}.mp3`)

    fs.access(posterPath, fs.F_OK, (err)=>{
      if (err) { return }
      fs.unlink( posterPath, (err)=>{ if(err){ throw err } } )
    })

    fs.access(trackPath, fs.F_OK, (err)=>{
      if (err) { return }
      fs.unlink( trackPath, (err)=>{ if(err){ throw err } } )
    })

  }

  res.sendStatus(200)
})

router.post('/editTrack', uploadImage, async (req, res)=>{
  let status = 200

  let changes = {}

  if( req.body.title && req.body.title.length > 0 ){
    changes.title = req.body.title
  }

  if( req.body.author && req.body.author.length > 0 ){
    changes.author = req.body.author
  }

  if( req.body.poster && req.file ){
    let posterPath = path.join(staticShit.publicPath, 'posters', `${req.body._id}.jpg`)
    let imageChanged = await imageSquare(req.file.path, posterPath)

    if( imageChanged ){
      fs.unlink( req.file.path, (err)=>{ if(err){ console.log(err) } } )
      changes.poster = req.body.poster == 'true' ? true : false
    }
  }

  if( Object.keys( changes ).length == 0 ){ res.sendStatus(200); return }

  let updatedTrack = null

  try {
    updatedTrack = await tracksData.findOneAndUpdate( { _id: req.body._id }, { $set: changes })
  } catch (e) { console.log(e); status = 404 }

  for( let key of Object.keys( changes ) ){ updatedTrack[key] = changes[key] }

  writeTrackMetadata(updatedTrack)

  res.sendStatus( status )
})


async function overwriteFile(filePath, newPath){
  let file = fs.readFileSync( filePath )

  if( !file ){ return }

  await fs.writeFile( newPath, file, (err)=>{ if( err ){ throw err } })
  await fs.unlink( filePath, (err)=>{ if(err){ throw err } console.log(222) } )
}

async function writeTrackMetadata( track ){
  let trackPath = path.join( staticShit.publicPath, 'tracks', `${ track._id }.mp3` )
  let posterPath = path.join( staticShit.publicPath, 'posters', `${track._id}.jpg`)

  let data = {
    title: track.title,
    artist: track.author,
  }

  let options = !track.poster ? {} : {
    attachments: [ posterPath ],
  }

  ffmetadata.write( trackPath, data, options, (err)=>{
	   if( err ){
       console.log("Error in writing metadata - " + track.title)
     }
     else{ console.log("Data was written") }
  })

}

module.exports = router
