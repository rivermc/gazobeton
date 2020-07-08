import Map from './Map.js';
import Modal from './Modal.js';
import Slider from './Slider.js';
import Filter from './Filter.js';
import Accordion from './Accordion.js';
import Scroll from './Scroll.js';
import CalcBlock from './CalcBlock.js';
import Callback from './Callback.js';


$(document).ready(function() {

  if (typeof ymaps != 'undefined') {
    ymaps.ready(function() {
      new Map('[data-js=Map]');
    });
  }

  new CalcBlock('[data-js=CalcBlock]');
  new Filter('[data-js=Filter]');
  new Accordion('[data-js=Accordion]');

  new Slider('.WhyBlock [data-js=Slider]');

  new Slider('.AboutSlider [data-js=Slider]', {
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerMode: false,
  });

  setTimeout(()=> {
    new Scroll('.ToUp[data-js=Scroll]');
    $('.Header [data-js=Scroll], .Footer [data-js=Scroll]').each((index, item) => {
      new Scroll(item, {
        fixHeader: true
      });
    });
  }, 500)

  $('.js_openMenu').click(function() {
    $(this).toggleClass('js_active');
    $('.Header__catalogWrap').slideToggle();
  });



  $('[data-js=Callback]').each((index, item) => {
    new Callback(item);
  });


  function ModalInitialization() {
    $('[data-js=Modal]').each((index, item) => {
      if ($(item).hasClass('Gallery__button')) {
        new Modal(item, {
          position: {
            my: "center",
            at: "center center+50",
            of: window
          },
          onOpen: () => {
            new Slider('.Gallery [data-js=Slider]',{
              slidesToShow: 1,
              slidesToScroll: 1,
              adaptiveHeight: true,
              centerMode: false,
            });
          },
          onBeforeClose: () => {
            const $gallery = $('.Gallery [data-js=Slider]');
            if ($gallery) {
              $gallery.slick('unslick');
            }
          }
        });
      }
      new Modal(item);
    });
  }

  ModalInitialization();


  $(document).on('mse2_load', (/*e, data*/) => {
    ModalInitialization();
  });

});


