import PlayerComponent from '/file?path=js/player/player-main.js'
import TrackList from '/file?path=js/trackList/track-list.js'
import Menus from '/file?path=js/side-menu.js'

const App = {
  data(){
    return {
      song: new Audio,

      myTracks: null,

      playList: null,

      track: {
        _id: null,
        title: null,
        author: null,
        progress: 0,
        poster: false,
        paused: true,
        repeat: false,
        randomModeActive: false,
        muted: false,
        duration: 0,
        currentTime: 0,
        volume: 100,
      },

      userChangesCurrentTime: false,

    }
  },

  components: {
    "side-main-menu": Menus.main,
    "player": PlayerComponent,
    "track-list": TrackList,
  },

  methods:{
    previousTrack(){
      if( this.song.currentTime > 5 ){
        this.song.currentTime = 0
        return
      }

      let index = this.playList.map( t => t._id ).indexOf( this.track._id )
      if( index == 0 ){ return }
      this.changeTrack( this.playList[ index - 1 ] )
    },

    playPause(){
      if( this.song.paused ){ this.song.play() }
      else{ this.song.pause() }

      this.track.paused = this.song.paused
    },

    nextTrack(){
      let index = this.playList.map( t => t._id ).indexOf( this.track._id )
      index = index < this.playList.length-1 ? index+1 : 0
      this.changeTrack( this.playList[ index ] )
    },

    timeLineControlOn(){
      this.song.pause()
      this.userChangesCurrentTime = true
    },

    timeLineControlOff(){
      if( !this.track.paused ){ this.song.play() }
      this.userChangesCurrentTime = false
    },

    changeCurrentTime( event ){
      this.track.progress = event.target.value / 1000
      this.song.currentTime = this.track.progress * ( this.song.duration / 100 )
      this.track.currentTime = this.song.currentTime
    },

    repeatButtonEvent(){ this.track.repeat = !this.track.repeat },

    changeRandomMode(){
      this.track.randomModeActive = !this.track.randomModeActive

      if( this.track.randomModeActive ){
        this.notMixedPlayList = Array.from( this.playList )
        this.playList = mixArray( this.playList )
      }
      else{
        this.playList = this.notMixedPlayList
      }

    },

    changeVolume( event ){
      this.track.volume = Number( event.target.value )
      this.song.volume = event.target.value / 100
    },

    changeMuteMode(){
      this.song.muted = !this.song.muted
      this.track.muted = this.song.muted
    },

    async getMyTracks(){
      let gettedTrackList = await fetch("/myTracks")
      gettedTrackList = await gettedTrackList.json()

      this.myTracks = gettedTrackList
      this.playList = gettedTrackList

      if( !this.playList ){ return }

      this.changeTrack( this.playList[0] )
    },

    changeTrack( newTrack ){
      this.song.src = `/file?path=/tracks/${newTrack._id}.mp3`

      this.track._id = newTrack._id
      this.track.title = newTrack.title
      this.track.author = newTrack.author
      this.track.poster = newTrack.poster
      this.track.progress = 0

      if( !this.track.paused ){ this.song.play() }

      this.track.paused = this.song.paused
    },

    async addNewTracks( e ){
      let files = Array.from(e.target.files)

      files = files.filter( f => /.mp3/.test( f.name ) && f.type == 'audio/mpeg')

      if( files.length == 0 ){ console.log("pipka");return }

      let formData = new FormData()

      for( let f of files ){ formData.append( 'newTracks', f ) }

      let answer = await postRequest('/addTracks', formData)

      
      alert(answer)
    },
  },


  async created(){
    await this.getMyTracks()

    this.song.ondurationchange = ()=>{
      this.track.duration = this.song.duration
    }

    this.song.ontimeupdate = ()=>{
      if( this.userChangesCurrentTime ){ return }

      if( this.song.currentTime == this.song.duration ){
        if( this.track.repeat ){
          this.song.currentTime = 0
          this.song.play()
        }
        else{
          this.nextTrack()
        }
      }

      this.track.currentTime = this.song.currentTime
      this.track.progress = this.song.currentTime / ( this.song.duration / 100 )
    }
  }

}

function getRandom( limit ){
	return Math.floor(Math.random() * limit)
}

function mixArray( arr ){
  let copy = Array.from( arr )
  let ans = []

  for( let i of arr ){
    let randomInd = getRandom( copy.length )
    ans.push( copy[randomInd] )
    copy.splice( randomInd, 1 )
  }

  return ans
}

async function postRequest (url, reqBody){
  let fetchResponse = await fetch(url, {
    method: 'POST',
    body: reqBody,
  });

  return await fetchResponse.text();
}



let app = Vue.createApp(App)
let vm = app.mount("#app")
