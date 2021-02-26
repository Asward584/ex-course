export function shouldResize(event) {
    return event.target.dataset.resize
  }

export function isCell (event){
  //console.log(event.target)
  return event.target.dataset.type === 'cell'
  }

 