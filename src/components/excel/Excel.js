import { $ } from '../../core/dom';
import { Observer } from '../../core/Observer';
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.observer = new Observer();

  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const observer = {observer: this.observer}
    this.components=this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, observer);

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
    this.components.forEach((Component) =>Component.init())

  }
  destroy(){
    this.components.forEach((component) =>component.destroy());
  }
}
