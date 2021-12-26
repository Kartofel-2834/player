import TrackLink from '/file?path=js/trackList/track-link.js'

const TrackList = {
  props: {
    hidepage: { type: Boolean, default: null },
    currenttrack: { type: Object, default: null },
    tracks: { type: Array, default: null },
    linkclick: { type: Function, default: null },
    activelinkclick: { type: Function, default: null },
    deletemodeactive: { type: Boolean, default: null },
    checkclicklink: { type: Function, default: null },
    menubuttonclick: { type: Function, default: null },
  },

  components:{
    "track-link": TrackLink
  },

  data(){
    return { hided: this.hidepage, disp: this.hidepage }
  },

  computed:{
    onHidePageConditionChange(){
      if( this.hidepage ){
        this.hided = this.hidepage
        setTimeout( ()=>{ this.disp = this.hidepage }, 250 )
      }
      else {
        this.disp = this.hidepage
        setTimeout( ()=>{ this.hided = this.hidepage }, 100 )
      }
    }
  },

  template: `
    <div class="hide" :id="onHidePageConditionChange"></div>
    <ol v-if="tracks" :class="[ 'page_style', 'column align', { 'hide_opacity': hided, 'hide': disp } ]">
      <track-link v-for="i in tracks" :key="i._id"
        :currenttrack="currenttrack"
        :track="i"
        :click="linkclick"
        :activelinkclick="activelinkclick"
        :deletemodeactive="deletemodeactive"
        :checkclick="checkclicklink"
        :menubuttonclick="menubuttonclick"
      ></track-link>
    </ol>

    <ol v-else class="track_list column align">
      <h1>No tracks</h1>
    </ol>
  `
}

export default TrackList
