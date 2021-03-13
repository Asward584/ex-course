class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
  }
  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
 
  
  clear() {
    this.html('');
    return this;
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  get data() {
    return this.$el.dataset;
  }
  findAll(select) {
    return this.$el.querySelectorAll(select);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
  focus() {
    this.$el.focus();
    return this;
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }
  getStyles(style=[]){
   return style.reduce((res,st)=>{
      res[st]= this.$el.style[st]
      return res
    },{})
  }
}
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, clases = '') => {
  const el = document.createElement(tagName);
  if (clases) {
    el.classList.add(clases);
  }
  return $(el);
};
