import { $ } from '../../core/dom';
import { Observer } from '../../core/Observer';
import { storeSubscriber } from '../../core/storeSubscriber';
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.store = options.store || {}
    this.subscriber = new storeSubscriber(this.store)

  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const observer = {observer: this.observer}
    this.components=this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const options ={
        observer:this.observer,
        store: this.store,
      }
      const component = new Component($el, options);

      if (component.name){
        window['c'+component.name] = component
      }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
    
}
  render() {
    this.$el.append(this.getRoot());
    //console.log(this.components)
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((Component) =>Component.init())

  }
  destroy(){
    this.components.forEach((component) =>component.destroy());
    this.subscriber.subscribeComponents()
  }
}
