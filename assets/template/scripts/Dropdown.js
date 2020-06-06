export default class Dropdown {
  constructor(el, opts = {}) {
    this.$el = $(el);
    this.instanceId = this.generateId();
    this.$window = $(window);
    const defaultOpts = {
      classes: {
        'ui-dialog-titlebar': 'Dropdown__titleBar',
        'ui-dialog': 'Dropdown'
      },
      draggable: false,
      resizable: false,
      modal: true,
      autoOpen: false,
      minHeight: 0,
      open: () => {
        const $overlay = $('.ui-widget-overlay');
        $overlay.addClass('Dropdown__dialogOverlay');
        $overlay.on('click', (event) => {
          event.preventDefault();
          this.close();
        });
      },
    };

    this.$el.dialog($.extend(true, defaultOpts, opts));

  }

  open() {
    this.$window.one(`scroll.${this.instanceId}`, () => {
      this.close();
    });
    this.$el.dialog('open');
  }

  close() {
    this.$el.dialog('close');
  }

  destroy() {
    this.$el.dialog('destroy');
  }

  generateId() {
    return 'dropdown_' + Math.random().toString(36).substring(7);
  }
}