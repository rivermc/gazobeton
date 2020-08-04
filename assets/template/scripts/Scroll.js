export default class Scroll {
  constructor(el, opts={}) {
    this.$el = $(el);
    this.$toElem = $(this.$el.data('scroll_to'));
    if (this.$toElem.length) {
      this.toTop = this.$toElem.offset().top;
      const defaultOpts = {
        timer: 600,
        fixHeader: true
      }
      this.opts = $.extend(true, defaultOpts, opts);
      if (this.opts.fixHeader) {
        this.fixHeader();
      }
      this.$el.click(this.goTo.bind(this));
    }
  }

  goTo(e) {
    e.preventDefault();
    $('html').animate({
      scrollTop: this.toTop
    }, this.opts.timer);
  }

  fixHeader() {
    this.toTop = this.toTop - parseInt($('.Header').height());
  }
}
