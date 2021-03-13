import {ExcelStateComponent} from '../../core/ExcelStateComponent' 
import { createToolbar } from './createToolbar'
import {$} from '../../core/dom'
import { defaultStyle } from '../../constants'

export class Toolbar extends ExcelStateComponent{
    static className = 'excel__toolbar'
    constructor($root, options){
      super($root,{
        name :"Toolbar",
        listeners :['click'],
        subscribe:['currentStyle'],
        ...options
      })
    }
    prepare() {
      
      this.initState(defaultStyle)
    }
    storeChanged(changes){
    console.log('changes',changes)
    this.setState(changes.currentStyle)
    }
    get template(){return createToolbar(this.state)}
    toHTML(){
      return this.template
    // return `<h1>Toolbar</h1>`
  
    } 

    onClick(event){
      const target = $(event.target)
      if(target.data.type === 'button') {
      const value =JSON.parse(target.data.value)
      this.$emit('style:selected', value)
      
      
    
    
    }
    }
}