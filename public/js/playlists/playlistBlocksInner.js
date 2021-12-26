const PlaylistBlocksInner = {
  props:{
    pagehided: { type: Boolean, default: true },
    playlistslink: { type: Array, default: [] },
  },

  data(){ return { hided: this.pagehided, disp: this.pagehided } },

  created(){
    console.log( this.hided )
  },

  computed:{
    onHidePageConditionChange(){
      if( this.pagehided ){
        this.hided = this.pagehided
        setTimeout( ()=>{ this.disp = this.pagehided }, 250 )
      }
      else {
        this.disp = this.pagehided
        setTimeout( ()=>{ this.hided = this.pagehided }, 100 )
      }
    }
  },

  template: `
    <div class="hide" :id="onHidePageConditionChange"></div>
    <div :class="[ 'playlist_block_inner', { 'hide': disp, 'hide_opacity': hided } ]">

      <div v-if="playlistslink" class="playlist_block" v-for="i in playlistslink">
        <img class="playlist_poster" src="/file?path=posters/6149e1f47811df42d4760e6a.jpg">

        <div class="playlist_info_inner">
          <div class="playlist_info playlist_name">Name</div>
          <div class="playlist_info playlist_author">Author</div>
        </div>
      </div>

      <div v-else>
        <h1 style="text-align:center; margin-top: 1rem;">No playlists</h1>

        <div class="add_playplist_button_inner row align">Add playlist</div>
      </div>

    </div>
  `
}

export default PlaylistBlocksInner
