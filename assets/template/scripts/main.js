import Map from './map.js';
import ToUp from './toup.js';

$(document).ready(function() {

  if (typeof ymaps != 'undefined') {
    ymaps.ready(function() {
      new Map('#Map_contact');
    });
  }

  new ToUp('.ToUp');

});


