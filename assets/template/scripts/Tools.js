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

/* ----------------------------------------------------------------------- */
/* Animation */
/* ----------------------------------------------------------------------- */

function shake(element) {
  element.addClass('shake').delay(800).queue(function(next){ element.removeClass('shake');  next(); });
}

/* ----------------------------------------------------------------------- */
/* Validators */
/* ----------------------------------------------------------------------- */

function isEmail(email) {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isPhone(phone) {
  const regex = /^\+?([\d]{1})\)?[- ]*[( ]*?([\d]{3})?[) ]*[- ]?([\d]{3})[- ]?([\d]{2})[- ]?([\d]{2})$/;
  return regex.test(phone);
}
function isPolicy(checkbox) {
  return checkbox.prop('checked');
}


/* ----------------------------------------------------------------------- */
/* Export function */
/* ----------------------------------------------------------------------- */

export {shake, getModule, isEmail, isPhone, isPolicy};