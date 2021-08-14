const PreviousTrackButton = {
  props: {
    click: { type: Function, default: null }
  },

  template: `<div class="button skip_song_button" @click="click" style="transform:scale(-0.8, 0.8)"></div>`
}

const PlayButton = {
    props:{
      paused: { type: Boolean, default: null },
      click: { type: Function, default: null },
    },

    computed: {
      cssClasses(){
        return [ 'button', this.paused ? 'play_button' : 'pause_button' ]
      }
    },

    template: `<div :class="cssClasses" @click="click"></div>`
}

const NextTrackButton = {
  props:{
    click: { type: Function, default: null }
  },

  template: `<div class="button skip_song_button" @click="click"></div>`
}

const RepeatButton = {
  props: {
    track: { type: Object, default: null },
    click: { type: Function, default: null }
  },

  computed:{
    cssClasses(){
      return [
        'button', 'secondary_player_button',
        this.track.repeat ? 'restart_button_active' : 'restart_button'
      ]
    }
  },

  template: `<div :class="cssClasses" @click="click"></div>`
}

const RandomButton = {
  props: {
    track: { type: Object, default: null },
    click: { type: Function, default: null }
  },

  computed: {
    cssClasses(){
      return [
        'button', 'secondary_player_button',
        this.track.randomModeActive ? 'random_button_active' : 'random_button'
      ]
    }
  },

  template: `<div :class="cssClasses" @click="click"></div>`
}


const MuteButton = {
  props: {
    volume: { type: Number, default: 100 },
    muted: { type: Boolean, default: false },
    click: { type: Function, default: null },
  },

  computed:{
    cssClasses(){
      return [ "button", !this.muted && this.volume > 0 ? "volume_button" : "mute_button" ]
    }
  },

  template: `<div :class="cssClasses" @click="click"></div>`
}


const PlayerButtons = {
  previousTrackButton: PreviousTrackButton,
  playButton: PlayButton,
  nextTrackButton: NextTrackButton,
  repeatButton: RepeatButton,
  randomButton: RandomButton,
  muteButton: MuteButton,
}

export default PlayerButtons
