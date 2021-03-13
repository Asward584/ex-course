import { defaultStyle } from "../../constants";
import { toInlineStyles } from "../../core/utilits";

const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 20;

function getWidth(index, state) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(index, state) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
  return function (_, col) {
    const width = getWidth(col, state.colState);
    const id = `${row}:${col}`;
    const data = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyle,
      ...state.stylesState[id]
    });
    return `
      <div 
      class="cell" 
      contenteditable="" 
      style="${styles}; width:${width}"
      data-column ="${col}" 
      data-type = "cell"
      data-id ="${id}"
      >
      ${data}
      </div>
   `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div class="column" data-type="resizable" data-col= "${index}" style ="width: ${width}">
    ${col}
    <div class="col-resize" data-resize = "col"></div>
    </div>
    `;
}

function createRow(content, index, state) {
  const height = getHeight(index, state);
 
  const resize = index
    ? '<div class="row-resize" data-resize = "row"></div>'
    : '';
  const resizable = index ? 'data-type ="resizable"' : '';
  return `
    <div class="row" data-row="${index}"  ${resizable} 
    style="height : ${height}"
    >
    <div class="row-info"   >
    ${index ? index : ''}
    ${resize}
    </div>
    <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function funcGetWidth(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(index, state.colState),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
 
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(funcGetWidth(state))
    .map(toColumn)
    .join('');

  rows.push(createRow(cols, null, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      //.map((_,col)=>toCell(row,col))
      .map(toCell(state, row))
      .join('');

    rows.push(createRow(cells, row + 1, state.rowState));
  }
  return rows.join('');
}
