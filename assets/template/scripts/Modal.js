import Slider from "./Slider.js";

export default class Modal {
  constructor(el, opts={}) {
    this.$el = $(el);
    this.$dialog = $(this.$el.data('modal'));
    this.$el.click(this.open.bind(this));

    const defaultOpts = {
      modal: true,
      maxWidth: 800,
      width: 600,
      resizable: false,
      classes: {
        'ui-dialog': 'Modal',
        'ui-dialog-titlebar': 'hidden',
      },
      open: () => {
        $('.ui-widget-overlay').addClass('Modal__overlay').click(() => {
          this.$dialog.dialog('close');
        });
        if (this.opts.onOpen) {
          this.opts.onOpen();
        }
      },
      close: () => {
        if (this.opts.onClose) {
          this.opts.onClose();
        }
      },
      beforeClose: () => {
        if (this.opts.onBeforeClose) {
          this.opts.onBeforeClose();
        }
      }
    };

    this.opts = $.extend(true, defaultOpts, opts);
  }

  open(e) {
    e.preventDefault();
    this.$dialog.dialog(this.opts);
  }
}
