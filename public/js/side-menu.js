const MainMenu = {
  props: {
    addtracklinkclick: { type: Function, default: null },
  },

  data(){ return {
    opened: false,
    linkHoverInfo: [ false ],
    darkBackClasses: [ 'menu_dark_back' ],
  } },

  methods: {
    openOrClose(){ this.opened = !this.opened },

    close(){ this.opened = false },

    addTrackChange(){ this.addtracklinkclick(); this.close() },

    changeHoverMode( linkIndex ){
      this.linkHoverInfo[ linkIndex ] = !this.linkHoverInfo[ linkIndex ]
    }
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

      <label class="">
        <div class="menu_link space_between align" @mouseover="changeHoverMode(0)" @mouseout="changeHoverMode(0)">
          <div>Add tracks</div>
          <img :class="[ 'button', { 'hide_opacity': !linkHoverInfo[0] }]" id="plusButton" src="">
        </div>
        <input type="file" class="hide" accept=".mp3" multiple="true" @change="addTrackChange">
      </label>

    </div>
  `
}


const Menus = {
  main: MainMenu,
  forTrack: {},
}

export default Menus
