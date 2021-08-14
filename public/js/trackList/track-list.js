import TrackLink from '/file?path=js/trackList/track-link.js'

const TrackList = {
  props: {
    currenttrack: { type: Object, default: null },
    tracks: { type: Array, default: null },
    linkclick: { type: Function, default: null },
    activelinkclick: { type: Function, default: null }
  },

  components:{
    "track-link": TrackLink
  },

  template: `
    <ol v-if="tracks" class="track_list column align">
      <track-link v-for="i in tracks"
        :currenttrack="currenttrack"
        :track="i"
        :click="linkclick"
        :activelinkclick="activelinkclick"
      ></track-link>
    </ol>

    <ol v-else class="track_list column align">
      <h1>No tracks</h1>
    </ol>
  `
}

export default TrackList
