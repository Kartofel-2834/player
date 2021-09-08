function customAlert( text ){
  let a = document.getElementById('alerter')

  if( text ){ a.innerText = text }

  if( a.classList.contains('hide') ){
    a.classList.remove('hide')
  }

  setTimeout( ()=>{
    if( a.classList.contains('hide_opacity') ){
      a.classList.remove('hide_opacity')
    }
  }, 200 )


  a.onclick = function(){
    if( !this.classList.contains('hide_opacity') ){
      this.classList.add('hide_opacity')
    }

    setTimeout( ()=>{
      if( !a.classList.contains('hide') ){
        a.classList.add('hide')
      }
    }, 200 )
  }

  setTimeout( ()=>{ a.click() }, 3000 )
}


export default customAlert
