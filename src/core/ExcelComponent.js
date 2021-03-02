import {DOMListener} from './DOMListener' 

export class ExcelComponent extends DOMListener {
constructor($root, options ={}) {
    super($root, options.listeners)
    this.name = options.name
    this.observer = options.observer
    this.unsubscribers =[]
    this.prepare()
}
    //Настраивает окмпонент до init()
    prepare(){}
    //Возвращает шаблон компанента в ``
    toHTML(){
        return ''
    }
    //Уведомляем, что событие произошло
    $emit(event, ...agrs){
        this.observer.emit(event, ...agrs)
    }
    //Подписываемся на событие
    $on(event, fn){
       const unsub = this.observer.subscribe(event, fn)
       this.unsubscribers.push(unsub)
    }
    //Инициализирует компонент
    //Добавляет dom слушателей
    init(){
        this.initDOMListener()
    }
     //Удаляет компонент
    //Удаляет dom слушателей
    destroy(){
        this.removeDOMListener()
        this.unsubscribers.forEach(unsub => unsub())
    }

}