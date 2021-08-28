const MenuLink = {
  props: {
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
      <img :class="[ 'button', { 'hide_opacity': !hover }]" :id="iconid" src="">
    </div>
  `
}



const MainMenu = {
  props: {
    addtracklinkclick: { type: Function, default: null },
    deletetracklinkclick: { type: Function, default: null },
  },

  data(){ return {
    opened: false,
    darkBackClasses: [ 'menu_dark_back' ],
  } },

  methods: {
    openOrClose(){ this.opened = !this.opened },

    close(){ this.opened = false },

    menuLinkClickEvent( method, e ){ this[ method ](e); this.close() }
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

  components:{
    "menu-link": MenuLink,
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
        <menu-link text="Add Tracks" iconid="plusButton"></menu-link>
        <input type="file"
          class="hide" accept=".mp3" multiple="true"
          @change="menuLinkClickEvent( 'addtracklinkclick', $event )"
        >
      </label>

      <menu-link
        text="Delete tracks"
        iconid="trashButton"
        @click="menuLinkClickEvent( 'deletetracklinkclick', $event )"
      ></menu-link>

    </div>
  `
}

const Menus = {
  main: MainMenu,
  forTrack: {},
}

export default Menus
