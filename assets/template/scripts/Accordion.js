export default class Accordion {
  constructor(el, opts = {}) {
    this.$el = $(el);
    this.init();
  }

  init() {
    this.$el.accordion({
      header: '.Accordion__title',
      heightStyle: 'content',
      collapsible: true,
      icons: false,
      classes: {
        'ui-accordion-header-active': 'Accordion__title_active',
      },
    });
  }

  destroy() {
    this.$el.accordion('destroy');
  }
}