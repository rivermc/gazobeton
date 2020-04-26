import Map from './Map.js';
import ToUp from './ToUp.js';
import Modal from './Modal.js';

$(document).ready(function() {

  if (typeof ymaps != 'undefined') {
    ymaps.ready(function() {
      new Map('.js_Map');
    });
  }

  new ToUp('.js_ToUp');
  new Modal('.js_Modal');

});


