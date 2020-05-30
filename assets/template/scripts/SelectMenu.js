export default class SelectMenu {
  constructor(el) {
    this.$el = $(el);
    this.$el.each((index, item) => {
      $(item).selectmenu({
        appendTo: $(item).siblings('.js_SelectMenu_target'),
        icons: { div: 'hidden' },
        classes: {
          'ui-selectmenu-button': 'Filter__select',
          'ui-selectmenu-button-open': 'Filter__select_open',
        },
        change: ( /*event, ui*/ ) => {
          mSearch2.submit();
        }
      });
    });
  }
}
