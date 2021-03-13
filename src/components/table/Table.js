import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom.js';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, NextCell } from './table.functions';
import { TableSelection } from './TableSelection';
import * as actions from '../../redux/actions'
import { defaultStyle } from '../../constants';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', ],
      ...options,
    });
  }
  toHTML() {
    return createTable(24, this.store.getState());
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    const $cell = this.root.find('[data-id="0:0"]');
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
     this.selection.current.text(text);
      this.updateTextInStorage(text)
    });
    this.$on('style:selected', value =>{
      this.selection.addStyle(value)
     
      this.$dispatch(actions.apply_style({
        value,
        ids: this.selection.selectedIds
      }))

    })

    this.$on('formula:done', () => { 
      this.selection.current.focus();
    });
    // this.$subscribe((state)=>{
    //   console.log('Test Table',state)
    // })
 
  }
  selectCell($cell){
    this.selection.select($cell);
    //this.$dispatch({type:"Table:select"})
    this.$emit('table:click_on_cell', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyle))
    
    this.$dispatch(actions.change_style(styles))
  }
  async resizeTable(event){
    try{
      const data = await resizeHandler(this.root, event);
      this.$dispatch(actions.TableResize(data))
    }
    catch(e){
      console.warn('Error mesage', e)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $el = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($el, this.selection.current).map((id) =>
          this.root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($el);
      }
    }
  }
  onKeydown(event) {
    const key = event.key;
    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Enter',
      'Tab',
    ];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.root.find(NextCell(key, id));
      this.selectCell($next)
     
    }
  }
  updateTextInStorage(value){
    this.$dispatch(actions.change_Text({
      text:value,
      id: this.selection.current.id()
    }))
  }
  onInput(event){
   this.updateTextInStorage($(event.target).text())
  }
 
}
