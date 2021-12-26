const SearchField = {
  props: {
    counter: { type: Number, default: 0 },
    loupeclickevent: { type: Function, default: null },
    searchcancel: { type: Function, default: null },
    keydownlistener: { type: Function, default: null },
  },

  data(){ return { hided: true } },

  methods: {
    userStartWriting(){ window.onkeydown = ()=>{} },

    userFinishWriting(){ window.onkeydown = (e)=>{ return this.keydownlistener(e) } },

    show(){ this.hided = false },

    hide(){
      this.searchcancel()
      this.hided = true
    },

    showAllLinks(){
      let allLinks = Array.from( document.getElementsByName("trackLink") )

      for ( let link of allLinks ){
        link.style.display = 'flex'
      }
    }
  },

  computed:{
    showField(){
      if( this.counter > 0 ){ this.show() }

      return "top_line"
    }
  },

  created(){
    window.addEventListener( 'keyup', (e)=>{
      if( e.keyCode == 13 && !this.hided ){
        this.loupeclickevent()
      }
    })
  },

  template:
  `
    <div :class="['column', 'fixed', 'search_inner', { 'search_close': hided }]">
      <div :class="showField"></div>

      <div class="search_inner row">
        <div @click="hide" class="button search_inner_button search_close_button"></div>
        <input
          type="text"
          class="search_text_input grid_layout_element"
          id="searchInput"
          @focus="userStartWriting"
          @blur="userFinishWriting"
        >
        <div class="button search_inner_button loupe_icon" @click="loupeclickevent"></div>
      </div>
    </div>
  `
}

export default SearchField
