export function shouldResize(event) {
    return event.target.dataset.resize
  }

export function isCell (event){
  //console.log(event.target)
  return event.target.dataset.type === 'cell'
  }

 function range(start, end){
  
    if (start> end){
      [end, start]=[start, end]
    }
    return new Array(end- start + 1)
     .fill('')
     .map((_,index)=>start+index)
    
  
  }

  export function matrix ($target, $current){

    const target = $target.id(true)
    const current =$current.id(true)
      const cols = range(target.col, current.col)
      const rows = range(current.row, target.row)
     const ids= cols.reduce ((acc,col)=>{
        rows.forEach((row)=> {acc.push(`${row}:${col}`)})
        return acc
      },[])
      return ids
  }

  export function NextCell(key,{col,row}){
    const MIN_VALUE=0
    switch (key) {
       case 'ArrowLeft':
        col-1<MIN_VALUE? col : col--
         break;
       case 'ArrowRight':
         case 'Tab':
         col++
         break;
       case 'ArrowUp':
         row-1<MIN_VALUE? row : row--
         break;
       case 'ArrowDown':
         case 'Enter':
         row++
         break;
     }
     return `[data-id="${row}:${col}"]`
   }