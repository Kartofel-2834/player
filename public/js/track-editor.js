const EditField = {
  data(){ return { opened: false } },

  props: {
    track: { type: Object, default: null },
    counter: { type: Number, default: 0 },
  },

  methods: {
    open(){ this.opened = true },

    close(){ this.opened = false; console.log(e.path) },

    innerClick( e ){
      for( let element of e.path ){
        if( element.id == 'editField' ){ return }
      }

      this.close()
    },
  },

  computed: {
    posterSrc(){
      if( !this.track ){ return '' }

      if( this.track.poster ){
        return `/file?path=posters/${ this.track._id }.jpg`
      }
      else{
        return '/file?path=posters/0.png'
      }
    },

    openMenuOnLinkClick(){
      if( this.counter > 0 ){ this.open() }

      return 'edit_field'
    },
  },

  template: `
    <div :class="[
      'menu_dark_back',
      {
        'hide_dark_menu_part': !opened,
        'show_dark_menu_part': opened
      }
    ]"></div>

    <div
      :class="[ 'whole_page', 'align', 'center', 'edit_field_inner', { 'edit_show': opened } ]"
      @click="innerClick"
    >
      <div :class="openMenuOnLinkClick" id="editField">
        <img :src="posterSrc">
      </div>
    </div>
  `
}

export default EditField
