export default class Slider {
  constructor(el) {
    this.$el = $(el);

    this.$el.slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerMode: true,
      speed: 400,
      autoplay: true,
      prevArrow: '.Slider__button_prev',
      nextArrow: '.Slider__button_next'
    });
  }
}
