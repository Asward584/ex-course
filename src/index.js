import './scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { stateCreator } from './core/stateCreator';
import { rootReduser } from './redux/rootReduser';
import { storage, debounce } from './core/utilits';
import { initialState } from './redux/initialState';
const store = new stateCreator(rootReduser, initialState);

const stateListener = debounce((state) => {
  console.log('app-state', state);
  storage('excel-state', state);
}, 300);
store.subscribe(stateListener);
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
