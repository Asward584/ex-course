
import * as type from './types'
export function TableResize (data) {
    return {
        type : type.TABLE_RESIZE,
        data
    }
}

export function change_Text (data) {
    return {
        type : type.CHANGE_TEXT,
        data
    }
}
export function apply_style (data) {
    return {
        type : type.APPLY_STYLE,
        data

    }
}
export function change_style (data) {
    return {
        type : type.CHANGE_STYLE,
        data
    }
}
export function title_change(data){
    return {
        type: type.TITLE_CHANGE,
        data
    }
}
export function update_date(){
    return {
        type: type.UPDATE_DATE
    }
}
