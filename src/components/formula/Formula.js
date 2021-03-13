import {ExcelComponent} from '@core/ExcelComponent' 
import { $ } from '@core/dom.js';

export class Formula extends ExcelComponent{
    static className = 'excel__formula'
constructor($root, options){
  super($root,{
   name: 'Formula',
   listeners: ['input', 'keydown'],
   subscribe : ['currentText'],
   ...options

  })

}
init() {
  super.init()
  this.$formula =this.root.find('#formula')

  this.$on('table:click_on_cell',($cel)=>{
    this.$formula.text($cel.text())
    
  })

}

  storeChanged({currentText}){
    console.log('Changes',currentText)
    this.$formula.text(currentText)
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