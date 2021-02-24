const CODES = {
  A: 65,
  Z: 90
};

function toCell(_, col) {
  return `
    <div class="cell" contenteditable="" data-column ="${col}"></div>
    `;
}

function toColumn(col, index) {
  console.log(index)
  return `
    <div class="column" data-type="resizable" data-col= "${index}">
    ${col}
    <div class="col-resize" data-resize = "col"></div>
    </div>


    `;
}

function createRow(content, index) {
  const resize = index ?  '<div class="row-resize" data-resize = "row"></div>' : ''
 const resizable = index? 'data-type ="resizable"' :""
  return `
    <div class="row" ${resizable} >
    <div class="row-info"  >
    ${index? index : ''}
    ${resize}
    </div>
    <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15 ) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');
  //console.log(cols)

  rows.push(createRow(cols ,null));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
    .fill('')
    .map(toCell)
    .join('')

    rows.push(createRow(cells, i+1));

  }
  return rows.join('');
}
