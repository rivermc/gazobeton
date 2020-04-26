export default class ToUp {
  constructor(el) {
    this.$el = $(el);
    this.$el.click(this.goToUp);
  }

  goToUp() {
    $('html, body').animate({
      scrollTop: 0
    }, window.scrollY / 2);
  }
}
