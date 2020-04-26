export default class Modal {
  constructor(el) {
    this.$el = $(el);
    this.$dialog = $(this.$el.data('modal'));
    this.$el.click(this.open.bind(this));
  }

  open(e) {
    e.preventDefault();
    this.$dialog.dialog({
      modal: true,
      maxWidth: 800
    });
  }
}
