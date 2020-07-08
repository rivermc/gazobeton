export default class Modal {
  constructor(el) {
    this.$el = $(el);
    this.$dialog = $(this.$el.data('modal'));
    this.$el.click(this.open.bind(this));
    console.log(this.$dialog);
  }

  open(e) {
    e.preventDefault();
    this.$dialog.dialog({
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
      }
    });
  }
}
