
import { defaultStyle, defaultTittle } from '../constants'
import {storage} from '../core/utilits'


const defaultState={
    rowState :{},
    colState:{},
    dataState:{},
    currentText : '',
    currentStyle: defaultStyle,
    stylesState:{},
    tittle: defaultTittle
}

const normalize = state =>({
    ...state, 
    currentStyle:defaultStyle,
    currentText:''
})
export const initialState=storage('excel-state')? 
storage('excel-state')
:defaultState