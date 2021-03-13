import {ExcelComponent} from '@core/ExcelComponent' 
import *as actions from "../../redux/actions"
import {$} from '../../core/dom'
import {defaultTittle} from '../../constants'

export class Header extends ExcelComponent{
    static className = 'excel__header'
    constructor($root, options){
      super($root,{
        name :"Header",
        listeners : ['input'],
        ...options
      })
    }


    toHTML(){
      const tittle = this.store.getState().tittle || defaultTittle
        return `
        <input type="text" class="input" value="${tittle}" />

        <div>
  
          <div class="button">
            <i class="material-icons">delete</i>
          </div>
  
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
  
        </div>
        `
        // return `<h1>Header</h1>`
    }
    onInput(event){
      const target = $(event.target)
      this.$dispatch(actions.title_change(target.text()))
    }

}