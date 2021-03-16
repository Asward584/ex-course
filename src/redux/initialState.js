
import { defaultStyle, defaultTittle } from '../constants'
import { clone } from '../core/utilits'



const defaultState={
    rowState :{},
    colState:{},
    dataState:{},
    currentText : '',
    currentStyle: defaultStyle,
    stylesState:{},
    tittle: defaultTittle,
    openDate: new Date().toJSON()
}

const normalize = state =>({
    ...state, 
    currentStyle:defaultStyle,
    currentText:''
})
// export const initialState=storage('excel-state')? 
// storage('excel-state')
// :defaultState

export function normalizeInizialState(state){
return state? normalize(state):clone(defaultState)
}