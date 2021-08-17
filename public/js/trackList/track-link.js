import PlayerInners from '/file?path=js/player/player-inners.js'

const TrackLink = {
  props: {
    currenttrack: { type: Object, default: null },
    track: { type: Object, default: null },
    click: { type: Function, default: null },
    activelinkclick: { type: Function, default: null },
  },

  methods: {
    clickAppended( event ){
      if( event.target.id == 'trackMenuOpen' ){ return }

      if( this.currenttrack._id == this.track._id ){
        this.activelinkclick()
      }
      else{
        this.currenttrack.paused = false
        this.click(this.track)
      }
    }
  },

  computed:{
    cssClasses(){
      let classes = ['track_link', 'space_between', 'align']
      if( this.currenttrack._id == this.track._id ){ classes.push('track_link_active') }
      return classes
    },

    posterCssClasses(){
      return [ 'poster', this.currenttrack._id == this.track._id ? 'poster_shadow' : '' ]
    },

    ballCssClasses(){
      return [
        this.currenttrack._id == this.track._id ? "ball" : "hide",
        this.currenttrack.paused ? "pause_ball" : "play_ball"
      ]
    },
  },

  components: {
    "track-info": PlayerInners.trackInfo
  },

  template: `
    <li :class="cssClasses" @click="clickAppended">
      <track-info
        :track="track"
        :posterclasses="posterCssClasses"
        :marquee_active="false"
        :titleclasses="['link_title_text']"
        :authorclasses="[]"
        :innerClasses="[ 'track_info', 'row', 'align' ]"
      ></track-info>

      <div style="margin-right: 1em">
        <div
          id="trackMenuOpen"
          :class="currenttrack._id == track._id ? 'hide' : ['track_menu_open_button', 'button']"
        >
            <div class="menu_button_ball"></div>
            <div class="menu_button_ball"></div>
            <div class="menu_button_ball"></div>
        </div>

        <div :class="ballCssClasses"></div>
      </div>
    </li>
  `
}

export default TrackLink
