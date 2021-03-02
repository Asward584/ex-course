import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom.js';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, NextCell } from './table.functions';
import { TableSelection } from './TableSelection';

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
    return createTable(24);
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
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }
  selectCell($cell){
    this.selection.select($cell);
    this.$emit('table:click_on_cell', $cell);
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.root, event);
    } else if (isCell(event)) {
      const $el = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($el, this.selection.current).map((id) =>
          this.root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($el);
      }
    }
  }
  onKeydown(event) {
    //console.log(event)
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
  onInput(event){
    this.$emit('table:input', $(event.target))
  }
 
}
