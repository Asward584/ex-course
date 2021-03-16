import { $ } from '../../core/dom';
import { Page } from '../../pages/Page';
import { ActiveRoute } from './ActiveRoute';
export class Router {
  constructor(selector, routes = {}) {
    if (!selector) {
      throw new Error('There is no selector!');
    }
    this.routes = routes;
    this.$placeholder = $(selector);
    this.page = null
    this.PageURLHandler = this.PageURLHandler.bind(this);
    this.init();
  }
  init() {
    window.addEventListener('hashchange', this.PageURLHandler);
    this.PageURLHandler();
  }

  PageURLHandler() {
    if (this.page){
      this.page.destroy();
    }
    this.$placeholder.clear()
    const Page = ActiveRoute.path.includes('excel')
    ?this.routes.excel
    : this.routes.dashboard
     this.page = new Page(ActiveRoute.param)
    
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
  destroy() {
    window.removeEventListener('hashchange', this.PageURLHandler);
  }
}
