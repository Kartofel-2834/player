import PlayerInners from '/file?path=js/player/player-inners.js'

const TrackLink = {
  props: {
    currenttrack: { type: Object, default: null },
    deletemodeactive: { type: Boolean, default: false },
    track: { type: Object, default: null },
    click: { type: Function, default: null },
    activelinkclick: { type: Function, default: null },
    checkclick: { type: Function, default: null }
  },

  data(){ return { checked: false } },

  methods: {
    clickAppended( event ){
      if( this.deletemodeactive ){
        this.checked = !this.checked
        this.checkclick(this.checked, this.track._id)
        return
      }

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

      if( this.deletemodeactive ){
        if( this.checked ){ classes.push('checked_link') }
      }
      else{
        if( this.currenttrack._id == this.track._id ){ classes.push('track_link_active') }
        this.checked = false
        this.checkclick()
      }

      return classes
    },

    posterCssClasses(){
      return [ 'poster', this.currenttrack._id == this.track._id ? 'poster_shadow' : '' ]
    },

    ballCssClasses(){
      return [
        !this.deletemodeactive && this.currenttrack._id == this.track._id ? "ball" : "hide",
        this.currenttrack.paused ? "pause_ball" : "play_ball"
      ]
    },

    trackMenuButtonCssClasses(){
      if ( this.deletemodeactive || this.currenttrack._id == this.track._id ){
        return 'hide'
      }
      else{
        return ['track_menu_open_button', 'button']
      }
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
          :class="trackMenuButtonCssClasses"
        >
          <div class="menu_button_ball"></div>
          <div class="menu_button_ball"></div>
          <div class="menu_button_ball"></div>
        </div>

        <div
          :class="[
            'checkbox',
            {
              'hide': !deletemodeactive,
              'checkbox_active': checked
            }
          ]">
        </div>

        <div :class="ballCssClasses"></div>
      </div>
    </li>
  `
}

export default TrackLink
