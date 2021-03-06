export class Observer{
constructor(){
this.listeners = {}

}
//уведомляем слушателей если они есть 
//'formula:done"
//table.emit('table:select', {a:1})
emit(event, ...args){
    if (Array.isArray(this.listeners[event]))
    this.listeners[event].forEach((listener)=>{
        listener(...args)
    })

}

//Подписываемся на уведомление  
//'formula.subscribe('table:select, ()=>{})
subscribe(event, fn){
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return ()=>{
        this.listener = this.listener.filter(listener => listener !== fn)}
    

}


}
//Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('vladilen', data => console.log(data))
// emitter.emit('1231231', 42)

// setTimeout(() => {
//   emitter.emit('vladilen', 'After 2 seconds')
// }, 2000)

// setTimeout(() => {
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('vladilen', 'After 4 seconds')
// }, 4000)
