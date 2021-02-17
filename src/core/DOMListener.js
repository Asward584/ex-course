import { capitalize } from '../core/utilits';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root for DOMListener');
    }
    this.root = $root;
    this.listeners = listeners;
    // console.log("Is ", this.root)
    // console.log("Is 1", this)
    // console.log("Is 1", this.root.$el)
  }

  initDOMListener() {
    //console.log(this.listeners)
    this.listeners.forEach((listener) => {
      const method = returnEventName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        );
      }
      this[method] = this[method].bind(this)
      this.root.on(listener, this[method]);
      //console.log(this[method].bind(this));
    });
  }

  removeDOMListener() {

    this.listeners.forEach((listener) => {
        const method = returnEventName(listener);
        console.log('Meth',method)
        this.root.off(listener, this[method]);
      
  })}

}

function returnEventName(listener) {
  return 'on' + capitalize(listener);
}
