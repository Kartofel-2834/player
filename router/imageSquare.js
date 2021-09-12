const sharp = require("sharp")
const sizeOf = require("image-size")
const fs = require("fs")
const path = require("path")

async function squareImage( imagePath, outputPath ){
  let fileExist = true
  let extPremissible = true

  await fs.access(imagePath, fs.F_OK, (err)=>{ if (err) { fileExist = false } })
  extPremissible = /jpg|jpeg|png/.test( path.extname(imagePath) )

  if( !fileExist || !extPremissible ){ return false }

  let dimensions = sizeOf( imagePath )
  let newDimensions = {}

  if( dimensions.width > 2500 && dimensions.height > 2500 ){
    newDimensions = { width: 1000, height: 1000 }
  }
  else{
    newDimensions.width = dimensions.width < dimensions.height ? dimensions.width : dimensions.height
    newDimensions.height = newDimensions.width
  }

  await sharp( imagePath ).resize( newDimensions ).toFile( outputPath )
    .catch( (err)=>{ console.log(err) })

  return true
}

module.exports = squareImage
