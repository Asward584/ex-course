import { toInlineStyles } from '../core/utilits';
import { CHANGE_TEXT, TABLE_RESIZE, APPLY_STYLE,CHANGE_STYLE, TITLE_CHANGE } from './types';
export function rootReduser(state, action) {
  let field 
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
       field = action.data.type === 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value;
      return { ...state, [field]: prevState }; //id,value
    case CHANGE_TEXT:
       field = 'dataState' || {}
       prevState = state[field]||{}
      prevState[action.data.id] = action.data.text
      
      return {
        ...state,
        currentText: action.data.text,
        dataState:prevState,
      };
      case APPLY_STYLE: 
      console.log('before',action.data.value)
      field = 'stylesState' || {}
      prevState = state[field]||{}
      action.data.ids.forEach(id =>{
        prevState[id]= {...prevState[id], ...action.data.value}
    
      })
      console.log('after',prevState)
      return {...state, [field]:prevState, currentStyle:{...state.currentStyle, ...action.value} };
      case CHANGE_STYLE:

      return {...state, currentStyle: action.data};
      case TITLE_CHANGE :
        return {...state, tittle:action.data}
      
    default: 
      return state;
  }
}


