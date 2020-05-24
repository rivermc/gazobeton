import Map from './Map.js';
import ToUp from './ToUp.js';
import Modal from './Modal.js';
import Slider from './Slider.js';

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
      new Map('.js_Map');
    });
  }

  $('input[name=phone]').usPhoneFormat({format: 'x-xxx-xxx-xxxx'});

  new ToUp('.js_ToUp');
  new Modal('.js_Modal');
  new Slider('.WhyBlock .js_Slider');
  new Slider('.AboutSlider.js_Slider', {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
  });

  $('.js_openMenu').click(function() {
    $(this).toggleClass('js_active');
    $('.Header__catalogWrap').slideToggle();
  });

});


