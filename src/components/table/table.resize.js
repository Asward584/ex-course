import {$} from '@core/dom'

export function resizeHandler($root, event) {
{
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type ="resizable"]');
  const coords = $parent.getCoords();
  //const cells = this.root.findAll(`[data-column="${$parent.data.col}"]`);
  const type = $resizer.data.resize;
  let value;
  const resize = type === 'col' ? 'bottom' : 'right';
  $resizer.css({
    opacity: 1,
    [resize]: '-5000px',
  });
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({ right: -delta + 'px' });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({ bottom: -delta + 'px' });
    }

    document.onmouseup = (e) => {
      console.log(this);
      document.onmousemove = null;
      document.onmouseup = null;
      //$parent.css({ width: value + 'px' });
      if (type === 'col') {
        $parent.css({ width: value + 'px' });
        $root.findAll(`[data-column="${$parent.data.col}"]`).forEach((el) => (el.style.width = value + 'px'));
      } else {
        $parent.css({ height: value + 'px' });
      }

      $resizer.css({
        opacity: 0,
        bottom: '0px',
        right: '0px'
      });
    };
  };
}
}