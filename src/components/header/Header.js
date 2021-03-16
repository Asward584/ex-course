import {ExcelComponent} from '@core/ExcelComponent' 
import *as actions from "../../redux/actions"
import {$} from '../../core/dom'
import {defaultTittle} from '../../constants'
import { ActiveRoute } from '../../core/Router/ActiveRoute'

export class Header extends ExcelComponent{
    static className = 'excel__header'
    constructor($root, options){
      super($root,{
        name :"Header",
        listeners : ['input','click'],
        ...options
      })
    }


    toHTML(){
      const tittle = this.store.getState().tittle || defaultTittle
        return `
        <input type="text" class="input" value="${tittle}" />

        <div>
  
          <div class="button" data-button="remove">
            <i class="material-icons" data-button="remove">delete</i>
          </div>
  
          <div class="button" data-button="exit">
            <i class="material-icons" data-button="exit">exit_to_app</i>
          </div>
  
        </div>
        `
        // return `<h1>Header</h1>`
    }
    onInput(event){
      const target = $(event.target)
      this.$dispatch(actions.title_change(target.text()))
    }
    onClick(event){
      const $target = $(event.target)
      if($target.data.button === 'remove'){
        const decision = confirm('Удалить таблицу?')
        if(decision){
          localStorage.removeItem('excel'+ ActiveRoute.param)
        ActiveRoute.navigate('')
        }
      }else if ($target.data.button === 'exit'){
        console.log('navigate exit')
        ActiveRoute.navigate('')
      }

    }

}