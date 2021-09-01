const MenuLink = {
  props: {
    click: { type: Function, default: null },
    text: { type: String, default: 'Text' },
    iconid: { type: String, default: null },
  },

  data(){
    return { hover: false }
  },

  methods: {
    changeHoverMode(){ this.hover = !this.hover }
  },

  template: `
    <div class="menu_link space_between align" @mouseover="changeHoverMode" @mouseout="changeHoverMode">
      <div>{{ text }}</div>
      <img :class="[ 'menu_icon', 'button', { 'hide_opacity': !hover }]" :id="iconid" src="">
    </div>
  `
}


class Menu {
  constructor( customOpt ) {
    this.data = function(){
      return {
        opened: false,
        darkBackClasses: [ 'menu_dark_back' ],
      }
    }

    this.methods = {
      openOrClose(){ this.opened = !this.opened },

      close(){ this.opened = false },

      open(){ this.opened = true },

      menuLinkClickEvent( method, e ){ this[ method ](e); this.close() }
    }

    this.components = {
      "menu-link": MenuLink,
    }

    for( let key of Object.keys(customOpt) ){
      this[key] = customOpt[key]
    }

  }
}

const MainMenu = new Menu({
  props: {
    addtracklinkclick: { type: Function, default: null },
    deletetracklinkclick: { type: Function, default: null },
  },

  created(){
    window.onkeyup = (e)=>{
      switch (e.keyCode) {
        case 27: // Escape
          this.openOrClose()
        break
      }
    }
  },

  template: `
    <div @click="close" :class="[
      'menu_dark_back',
      {
        'hide_dark_menu_part': !opened,
        'show_dark_menu_part': opened
      }
    ]"></div>

    <div :class="[ 'menu', { 'hide_side_menu': !opened } ]">

      <label>
        <menu-link text="Add Tracks" iconid="plusIcon"></menu-link>
        <input type="file"
          class="hide" accept=".mp3" multiple="true"
          @change="menuLinkClickEvent( 'addtracklinkclick', $event )"
        >
      </label>

      <menu-link
        text="Delete tracks"
        iconid="trashIcon"
        @click="menuLinkClickEvent( 'deletetracklinkclick', $event )"
      ></menu-link>

    </div>
  `
})


const TrackMenu = new Menu({
  props: {
    counter: { type: Number, default: 0 },
    editcounter: { type: Number, default: 0 },
    track: { type: Object, default: null },
    deletetracklinkclick: { type: Function, default: null },
    editlinkclick: { type: Function, default: null },
  },

  created(){

    this.deleteLink = ()=>{
      this.deletetracklinkclick( [ this.track._id ] )
      this.close()
    }

  },

  computed: {
    openMenu(){
      if( this.counter > 0 ){
        this.open()
      }

      return 'trackMenu'
    },

  },

  template: `
    <div @click="close" :class="[
      'menu_dark_back',
      {
        'hide_dark_menu_part': !opened,
        'show_dark_menu_part': opened
      }
    ]"></div>

    <div :id="openMenu" :class="[ 'menu', { 'hide_side_menu': !opened } ]">
      <menu-link text="Edit" iconid="editIcon" @click="menuLinkClickEvent('editlinkclick')"></menu-link>
      <menu-link text="Delete" iconid="trashIcon" @click="deleteLink"></menu-link>
    </div>
  `
})



const Menus = {
  main: MainMenu,
  forTrack: TrackMenu,
}

export default Menus
