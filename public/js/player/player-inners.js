import PlayerButtons from '/file?path=js/player/player-buttons.js'
import InputTypeRange from '/file?path=js/input-range.js'

const PlayerTrackInfoComponent = {
  props: {
    track: { type: Object, default: null },
    posterclasses: { type: Array, default: ["poster"] },
    titleclasses: { type: Array, default: ["player_text"] },
    innerClasses: { type: Array, default: [ 'track_info', 'row', 'align', 'third_of_player' ] },
    authorclasses: { type: Array, default: ["player_text"] },
    marquee_active: { type: Boolean, default: true },
  },

  methods: {
    textClasses( key ){
      var ans = Array.from( this[key + 'classes'] )
      if( this.marquee_active && this.track[key].length > 30 ){ ans.push('marquee') }
      return ans
    }
  },

  computed: {
    posterSrc(){
      if( this.track.poster ){
        return `/file?path=posters/${ this.track._id }.jpg`
      }
      else {
        return `/file?path=posters/0.png`
      }
    },

    posterCssClasses(){
      if( this.track.poster ){ return this.posterclasses }
      else{ return Array.from(this.posterclasses).concat(['null_poster']) }
    }
  },

  template: `
    <div v-if="track" :class="innerClasses">
      <img :class="posterCssClasses" :src="posterSrc">

      <div class="track_title_and_author">
        <h1 :class="textClasses('title')" >
          <span>{{ track.title }}</span>
        </h1>

        <h2 :class="textClasses('author')" >
          <span>{{ track.author }}</span>
        </h2>
      </div>
    </div>

    <div v-else class="hide_opacity track_info row align third_of_player"></div>
  `
}

const PlayerMainButtonInner = {
  props: {
    track: { type: Object, default: null },
    previousbuttonclick: { type: Function, default: null },
    playbuttonclick: { type: Function, default: null },
    nextbuttonclick: { type: Function, default: null },
    timelinecontrol_on: { type: Function, default: null },
    timelinecontrol_off: { type: Function, default: null },
    changecurrenttime: { type: Function, default: null },
  },

  components:{
    "previous-track-button": PlayerButtons.previousTrackButton,
    "play-button": PlayerButtons.playButton,
    "next-track-button": PlayerButtons.nextTrackButton,
    "input-type-range": InputTypeRange,
  },

  methods:{
    trackTimeParse( time ){
      if( !time ){ return '0:00' }

      let minutes = Math.floor( time / 60 )
      let seconds = Math.floor( time - ( minutes * 60 ) )
      seconds = seconds < 10 ? `0${ seconds }` : seconds

      return `${ minutes }:${ seconds }`
    }
  },

  template: `
    <div class="player_controllers space_between column third_of_player">

      <div class="main_player_buttons_inner row align">
        <previous-track-button :click="previousbuttonclick"></previous-track-button>
        <play-button :click="playbuttonclick" :paused="track.paused"></play-button>
        <next-track-button :click="nextbuttonclick"></next-track-button>
      </div>

      <div class="track_time space_between align">
        <div class="time">{{ trackTimeParse( track.currentTime ) }}</div>

        <input-type-range
          :mousedown="timelinecontrol_on"
          :mouseup="timelinecontrol_off"
          :input="changecurrenttime"
          :max="100000"
          :progress="track.progress"
          :value="track.progress * 1000 - 200"
          :classes="['current_time_changer']"
        ></input-type-range>

        <div class="time">{{ trackTimeParse( track.duration ) }}</div>
      </div>

    </div>
  `
}

const PlayerSecondaryButtonInner = {
  props: {
    track: { type: Object, default: null },
    repeatbuttonclick: { type: Function, default: null },
    randombuttonclick: { type: Function, default: null },
    volumerangeinput: { type: Function, default: null },
    mutebuttonclick: { type: Function, default: null },
  },

  components:{
    "repeat-button": PlayerButtons.repeatButton,
    "random-button": PlayerButtons.randomButton,
    "mute-button": PlayerButtons.muteButton,
    "input-type-range": InputTypeRange,
  },

  template: `
    <div class="secondary_player_buttons_inner reverse third_of_player">
      <div class="row align">
        <repeat-button :click="repeatbuttonclick" :track="track"></repeat-button>
        <random-button :click="randombuttonclick" :track="track"></random-button>

        <div class="row align">
          <mute-button
            :volume="track.volume"
            :muted="track.muted"
            :click="mutebuttonclick"
          ></mute-button>

          <input-type-range
            :progress="track.volume"
            :value="track.volume"
            :classes="['volume_changer']"
            :input="volumerangeinput"
          ></input-type-range>
        </div>
      </div>
    </div>
  `
}


const PlayerInners = {
  trackInfo: PlayerTrackInfoComponent,
  mainButtonInner: PlayerMainButtonInner,
  secondaryButtonInner: PlayerSecondaryButtonInner,
}

export default PlayerInners
