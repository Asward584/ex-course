import './scss/index.scss';

import {Router} from './core/Router/Router'
import {Dashboard} from './pages/DashboardPage'
import {ExcelPage} from './pages/ExcelPage'



const r =new Router('#app',{
  dashboard:Dashboard,
  excel: ExcelPage
})

