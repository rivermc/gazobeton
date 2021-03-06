export default class Tabs {
  constructor(el, opts) {
    this.$el = $(el);
    const defaultOpts = {};
    this.opts = $.extend(true, defaultOpts, opts);
    this.init();
  }

  init() {
    this.$menu_items = $(this.$el.find('[data-type=menu] [data-tab=button]'));
    this.$items = $(this.$el.find('[data-type=items]')).children();
    this.events();
  }

  events() {
    this.$menu_items.on('click.Tabs', this.openTab.bind(this));
  }

  openTab(event) {
    event.preventDefault();
    const $item = $(event.currentTarget);
    const item_id = $item.parent().index();
    this.$items.attr('data-status', false);
    this.$menu_items.attr('data-status', false);
    $item.attr('data-status', true);
    this.$items.eq(item_id).attr('data-status', true);
  }

  destroy() {
    this.$menu_items.off('click.Tabs');
  }
}