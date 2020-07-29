export default class Slider {
  constructor(el, opts) {
    this.$el = $(el);
    this.opts = opts;

    const defaultOpts = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerMode: true,
      speed: 400,
      autoplay: false,
      prevArrow: '.Slider__button_prev',
      nextArrow: '.Slider__button_next'
    };

    this.opts = $.extend(true, defaultOpts, opts);

    this.$el.slick(this.opts);

    if (this.opts.goToIndex) {
      this.$el.slick('slickGoTo', opts.goToIndex, true);
    }
  }
}
