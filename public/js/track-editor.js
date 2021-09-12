import customAlert from '/file?path=js/alerter.js'

const EditTextInput = {
  props:{
    label: { type: String, default: 'Text' },
    inputval: { type: String, default: '' },
  },

  template: `
    <div class="space_between track_text_edit_inner align">
      <div class="track_text_edit_tag">{{ label }}:</div>

      <input type="text"
        class="fill_available track_edit_text_input"
        :value="inputval"
        :id="label.toLowerCase()"
      >
    </div>
  `
}

const PosterWithHoverSquare = {
  props: { src: { type: String, default: '' } },

  data(){
    return {
       posterHover: false,
       posterSrc: '',
    }
  },

  methods: {
    posterHoverOn(){ this.posterHover = true },

    posterHoverOff(){ this.posterHover = false },

    changePosterOnFileFromInput( e ){
      if( !e.target.files || !e.target.files[0] ){ return }

      let reader = new FileReader();

      reader.onload = (e)=>{
        this.posterSrc = e.target.result
      }

      reader.readAsDataURL(e.target.files[0])
    }
  },

  computed: {
    posterChanger(){
      if( this.src && this.src.length > 0 ){
        this.posterSrc = this.src
      }

      return 'posterChanger'
    }
  },

  template: `
    <label
      class="menu_poster_inner grid_layout_inner"
      @mouseover="posterHoverOn"
      @mouseout="posterHoverOff"
    >
      <div :class="[ 'poster_add_hover', 'grid_layout_element', { 'hide_opacity': !posterHover }]"></div>
      <img :src="posterSrc" class="menu_poster grid_layout_element">
      <input type="file" class="hide" accept=".jpg, .png, .jpeg" :id="posterChanger" @input="changePosterOnFileFromInput">
    </label>
  `
}


const EditField = {
  data(){
    return {
      opened: false,
      posterHover: false,
      trackInDataInfo: {},
    }
  },

  props: {
    track: { type: Object, default: null },
    counter: { type: Number, default: 0 },
  },

  methods: {
    open(){
      this.opened = true
    },

    close(){
      this.opened = false
      setTimeout( ()=>{ this.trackInDataInfo = {} }, 300 )
    },

    innerClick( e ){
      for( let element of e.path ){
        if( element.id == 'editField' ){ return }
      }

      this.close()
    },

    async saveChanges(){
      let newTitle = document.getElementById('title').value
      let newAuthor = document.getElementById('author').value
      let newPoster = document.getElementById('posterChanger')
      let formData = new FormData()

      newPoster = newPoster ? newPoster.files[0] : null
      newTitle = newTitle.length && newTitle.length > 0 ? newTitle : this.track.title
      newAuthor = newAuthor.length && newAuthor.length > 0 ? newAuthor : this.track.author

      formData.append( '_id', this.track._id )

      if( newPoster && /image/.test( newPoster.type ) ){
        formData.append( 'image', newPoster )
        formData.append( 'poster', true )
      }

      if( newTitle != this.track.title ){
        formData.append( 'title', newTitle )
      }

      if( newAuthor != this.track.author ){
        formData.append( 'author', newAuthor )
      }

      if( !formData.has('title') && !formData.has('author') && !formData.has('image') ){ return }

      let answer_1 = await fetch('/editTrack', {
        method: 'POST',
        body: formData,
      })

      answer_1 = await answer_1.text()

      this.close()

      customAlert( answer_1 )
    }
  },

  computed: {
    trackCopy(){
      if( !this.track || !this.track._id ){ return 'editField' }

      this.trackInDataInfo = this.track
      return 'editField'
    },

    posterSrc(){
      if( this.trackInDataInfo.poster ){
        return `/file?path=posters/${ this.trackInDataInfo._id }.jpg`
      }
      else{
        return '/file?path=posters/0.png'
      }
    },

    innerCssClasses(){
      let answer = [ 'whole_page', 'align', 'center', 'edit_field_inner' ]

      if( this.opened ){ answer.push('edit_show') }

      return answer
    },

    openMenuOnLinkClick(){
      if( this.counter > 0 ){ this.open() }

      return 'edit_field'
    },
  },

  components:{
    'edit-text-input': EditTextInput,
    'poster-with-hover': PosterWithHoverSquare,
  },

  template: `
    <div :class="[
      'menu_dark_back',
      {
        'hide_dark_menu_part': !opened,
        'show_dark_menu_part': opened
      }
    ]"></div>

    <div :class="innerCssClasses" @click="innerClick">

      <div :class="openMenuOnLinkClick" :id="trackCopy">

        <div class="center">
          <poster-with-hover :src="posterSrc"></poster-with-hover>
        </div>

        <div class="center">
          <edit-text-input
            label="Title"
            :inputval=" trackInDataInfo ? trackInDataInfo.title : '' "
          ></edit-text-input>
        </div>

        <div class="center">
          <edit-text-input
            label="Author"
            :inputval=" trackInDataInfo ? trackInDataInfo.author : '' "
          ></edit-text-input>
        </div>

        <div class="center">
          <div class="save_changes_button" @click="saveChanges">Save</div>
        </div>

      </div>

    </div>
  `
}

export default EditField
