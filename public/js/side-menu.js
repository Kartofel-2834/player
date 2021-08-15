const MainMenu = {
  data(){ return {
    opened: false,
    darkBackClasses: [ 'menu_dark_back' ],
  } },

  methods: {
    openOrClose(){ this.opened = !this.opened },
    close(){ this.opened = false }
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
        <div class="menu_link">Add tracks</div>
        <input type="file" class="hide" accept=".mp3" multiple="true">
      </label>

    </div>
  `
}


const Menus = {
  main: MainMenu,
  forTrack: {},
}

export default Menus
