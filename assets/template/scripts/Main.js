import Map from './Map.js';
import ToUp from './ToUp.js';
import Modal from './Modal.js';
import Slider from './Slider.js';
import Filter from './Filter.js';
import Accordion from './Accordion.js';

/* ----------------------------------------------------------------------- */
/* Get Module Function */
/* ----------------------------------------------------------------------- */

function getModule(action, module, params, cb, delimiter = ',') {
  $.ajax({
    type:'POST',
    url:"/assets/template/php/getModule.php",
    data:'action=' + action + '&chunk=' + module + '&params=' + params + '&delimiter=' + delimiter,
    cache:false,
    success:function(data) {
      cb(data);
    }
  });
}


function animation_shake(element) {
  element.addClass('shake').delay(800).queue(function(next){ element.removeClass('shake');  next(); });
}

$(document).ready(function() {

  if (typeof ymaps != 'undefined') {
    ymaps.ready(function() {
      new Map('[data-js=Map]');
    });
  }

  $('input[name=phone]').usPhoneFormat({format: 'x-xxx-xxx-xxxx'});

  new ToUp('[data-js=ToUp]');
  new Modal('[data-js=Modal]');
  const CatalogFilter = new Filter('[data-js=Filter]');
  new Accordion('[data-js=Accordion]');

  new Slider('.WhyBlock [data-js=Slider]');

  new Slider('.AboutSlider [data-js=Slider]', {
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerMode: false,
  });

  $('.js_openMenu').click(function() {
    $(this).toggleClass('js_active');
    $('.Header__catalogWrap').slideToggle();
  });

});


