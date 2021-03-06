function toButton(button) {
  const but = `
    data-value=${JSON.stringify(button.value)}
    data-type="button"`;
  return `
    <div class="button ${button.active ? 'active' : ''}"
  ${but}>
<i class="material-icons" ${but}>${button.icon}</i>
</div>
    `;
}

export function createToolbar(state) {
  ///console.log('render');
  let flag = false;
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'Left',
      value: { textAlign: 'Left' },
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
  ];

  return buttons.map(toButton).join('');
  //     return `
  //     <div class="button">
  //       <i class="material-icons">format_align_left</i>
  //     </div>

  //     <div class="button">
  //       <i class="material-icons">format_align_center</i>
  //     </div>

  //     <div class="button">
  //       <i class="material-icons">format_align_right</i>
  //     </div>

  //     <div class="button">
  //       <i class="material-icons">format_bold</i>
  //     </div>

  //     <div class="button">
  //       <i class="material-icons">format_italic</i>
  //     </div>

  //     <div class="button">
  //       <i class="material-icons">format_underlined</i>
  //     </div>
  //   `
}
