import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom.js';
import { createTable } from './table.template';
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, isShift} from './table.functions'
import {TableSelection} from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(24);
  }
  prepare(){
    this.selection = new TableSelection()

  }
 init(){
   super.init();
  const $cell = this.root.find('[data-id="0:0"]')
   this.selection.select($cell)
 }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.root, event)
    }else if (isCell(event)){
      const $el = $(event.target)
      if (event.shiftKey){
        const target = $el.id(true)
        const current =this.selection.current.id(true)
        // console.log(target.col, current.col)
        // console.log(target.row, current.row)
        const cols = range(target.col, current.col)
        const rows = range(current.row, target.row)
        const ids= cols.reduce ((acc,col)=>{
          rows.forEach((row)=> {acc.push(`${row}:${col}`)})
          return acc
        },[])
      const $cells = ids.map(id=> this.root.find(`[data-id="${id}"]`))
    this.selection.selectGroup($cells)  
    }
      this.selection.select($el)
    }
    
  }
}
function range(start, end){
  
  if (start> end){
    [end, start]=[start, end]
  }
  return new Array(end- start + 1)
   .fill('')
   .map((_,index)=>start+index)
  

}
