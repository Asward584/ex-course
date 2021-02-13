export class Excel{
    constructor(selector, options){
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    getRoot(){
    
        const $root = document.createElement('div')
        $root.classList.add('excel')

        this.components.forEach(Component=>{        
            const $el = document.createElement('div')
            $el.classList.add(Component.className)
            const component = new Component($el)
            $el.innerHTML = component.toHTML()
            console.log(component)
            $root.appendChild($el)
            
        })
        return $root
    }

    render (){

        
        this.$el.append(this.getRoot())
        
        
    }
}