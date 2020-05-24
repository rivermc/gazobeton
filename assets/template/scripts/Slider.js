export default class Slider {
  constructor(el, opts) {
    this.$el = $(el);
    this.opts = opts;

    const default_opts = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerMode: true,
      speed: 400,
      autoplay: true,
      prevArrow: '.Slider__button_prev',
      nextArrow: '.Slider__button_next'
    };
    this.opts = Object.assign(default_opts, opts);

    this.$el.slick(this.opts);
  }
}
