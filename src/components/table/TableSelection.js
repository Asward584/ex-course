export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }
  //$el instanceof DOM === true
  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass('selected');
    this.current = $el;
  }
  clear() {
    this.group.forEach(($el) => {
      $el.removeClass('selected');
    });
    this.group = [];
  }
  selectGroup($cells = []) {
    this.clear();
    this.group = $cells;
    //console.log(this.group)
    $cells.forEach(($el) => {
      $el.addClass('selected');
    });
  }
}
