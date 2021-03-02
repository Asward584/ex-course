import {ExcelComponent} from '@core/ExcelComponent' 
import { $ } from '@core/dom.js';

export class Formula extends ExcelComponent{
    static className = 'excel__formula'
constructor($root, options){
  super($root,{
   name: 'Formula',
   listeners: ['input', 'keydown'],
   ...options

  })

}
init() {
  super.init()
  this.$formula =this.root.find('#formula')

  this.$on('table:click_on_cell',($cel)=>{
    this.$formula.text($cel.text())
    
  })
  this.$on('table:input', ($cell)=>{
    //console.log($cell.text())
    this.$formula.text($cell.text())

  })
}

    toHTML(){
        return `
        <div class="info">fx</div>
      <div id ="formula" class="input" contenteditable spellcheck="false"></div>
        `
     
    }
    onInput(event){
      this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event){
      const keys = ['Enter','Tab']
      if (keys.includes(event.key)){
       event.preventDefault();
        this.$emit('formula:done')
      }
    
    }
    

}