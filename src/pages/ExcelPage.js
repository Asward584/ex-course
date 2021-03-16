import { Page } from './Page';
import { $ } from '../core/dom';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { stateCreator } from '../core/stateCreator';
import { rootReduser } from '../redux/rootReduser';
import { storage, debounce } from '../core/utilits';
import { initialState, normalizeInizialState } from '../redux/initialState';
import { ActiveRoute } from '../core/Router/ActiveRoute';


function storageName(param){
   return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
  //  const params = this.params? this.params : Date.now().toString()
  const params = this.params
  //  console.log(ActiveRoute.param)
  //  console.log('params', this.params);
   const state =  storage(storageName(params))
    const store = new stateCreator(rootReduser, normalizeInizialState(state));
    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300);
    store.subscribe(stateListener);
    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
