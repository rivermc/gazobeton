import {shake, isEmail, isPhone, isPolicy} from './Tools.js';

export default class Callback {

  constructor(el, opts={}) {
    this.$el = $(el);
    this.$form = this.$el.find('form');
    this.$inputs = this.$form.find('input');
    this.regex = true;
    this.events();
  }

  events() {
    this.$form.on('submit', this.submitForm.bind(this));
  }

  submitForm(form) {
    form.preventDefault();
    this.validation();
  }

  sendForm() {
    const url = "/assets/template/php/sendForm.php";
    const formData = new FormData(this.$form[0]);
    $.ajax({
      contentType: false,
      processData: false,
      data: formData,
      type: 'POST',
      url: url,
      cache: false,
      beforeSend: () => {
        this.$form.find('[type=submit]').prop('disabled', true);
      },
      success: (/*data*/) => {
        this.successAnimation();
        this.$form.find('[type=submit]').prop('disabled', false);
      }
    });
  }

  successAnimation() {
    this.$form.css('opacity', 0).delay(8000).queue((next) => {
      this.$form.css('opacity', 1);
      this.$form.next().css('opacity', 0);
      next();
    });
    setTimeout(() => {
      this.$form.next().css('opacity', 1);
    },500);
  }

  validation() {
    const inputsChecked = [];
    this.$inputs.each((index, item) => {
      const inputName = $(item).attr('name');
      switch (inputName) {
        case 'email':
          this.regex = isEmail($(item).val());
          break;
        case 'phone':
          this.regex = isPhone($(item).val());
          break;
        case 'policy':
          this.regex = isPolicy($(item));
          break;
        case 'file':
          this.regex = !!$(item).val();
          break;
        default:
          return true;
      }
      if (!this.regex) {
        if (inputName === 'policy') {
          shake($(item).siblings('label'));
        }
        else {
          shake($(item));
        }
      }
      inputsChecked.push(this.regex);
    });

    inputsChecked.forEach((check) => {
      if (!check) {
        this.regex = false;
      }
    });
    if (this.regex) {
      this.sendForm();
    }
  }
}

$(document).ready(function() {
  $('input[name=phone], input[name=phoneShipping]').usPhoneFormat({format: 'x-xxx-xxx-xxxx'});
});