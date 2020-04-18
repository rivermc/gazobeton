import Map from './map.js';

$(document).ready(function() {

  if (typeof ymaps != 'undefined') {
    ymaps.ready(function() {
      new Map('#contactMap');
    });
  }

});


