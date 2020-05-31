export default class SelectMenu {
  constructor(el) {
    this.$el = $(el);
    this.InstanceList = [];
    this.$el.each((index, item) => {
      const select = $(item).selectmenu({
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
      this.InstanceList.push(select);
    });
  }

  refresh() {
    this.InstanceList.forEach((item) => {
      console.log(item);
      $(item).selectmenu('refresh');
    })
  }
}
