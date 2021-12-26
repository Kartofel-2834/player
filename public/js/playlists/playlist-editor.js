import EditFieldComponents from '/file?path=js/track-editor.js'

const PlaylistEditor = {
  data(){
    return { opened: false }
  },

  components: {
    "poster-with-hover": EditFieldComponents.posterWithHover,
    "edit-text-input": EditFieldComponents.editTextInput,
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
      :class="[ 'center', 'whole_page', 'edit_field_inner', { 'edit_show': opened } ]"
    >
      <div class="playlist_edit_inner">
        <div class="playlist_info_edit_inner row align">

          <poster-with-hover
            src="/file?path=posters/add.png"
            style="background-color: #26384f; border: 4px solid white; margin: 40px;"
          >
          </poster-with-hover>

          <div class="column fill_available" style="margin-right: 60px">
            <edit-text-input label="Title" style="margin-top: 0; width: 100%"></edit-text-input>
            <edit-text-input label="Author" style="width: 100%"></edit-text-input>
          </div>
        </div>

        <div class="align column fill_available">
          <div class="track_select_link column">

          </div>
        </div>



      </div>

    </div>
  `
}

export default PlaylistEditor
