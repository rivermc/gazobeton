import Dropdown from './Dropdown.js';

export default class Filter {
  constructor(el, opts) {
    this.$el = $(el);
    this.$buttons = this.$el.find('.js_filter_Dropdown');
    this.input = this.$el.find('input[type="checkbox"]');
    this.$enabledContainer = $('.js_filter_enabled');
    this.initDropdown();
    this.eventsInput();
    this.input.each((index, item) => {
        this.checkFilter(item);
    });
  }

  //Events
  eventsButton($button, id) {
    $button.on('click', () => {
      $('#mse2_filters input#'+ id).trigger('click');
    });
  }

  eventsInput() {
    this.input.on('change', (event) => {
      this.checkFilter(event.currentTarget);
    });
  }

  //Dropdown
  initDropdown() {
    this.$buttons.each((index, btn) => {
      const $btn = $(btn);
      const opts = {
        appendTo: $btn.parent(),
        position: {
          my: 'left top',
          at: 'left bottom',
          of: btn,
        },
      };
      const dropdown = new Dropdown($btn.data('dropdown'), opts);
      $btn.click(this.openDropdown.bind(dropdown));
    });
  }

  openDropdown() {
    this.open();
  }

  //Control Filter
  checkFilter(event) {
    let $item = $(event);
    let val = $item.val();
    let id = $item.attr('id');
    if ($item.is(':checked')) {
      const name = $item.attr('name');
      if (name === 'parent') {
        val = $item.attr('name');
      }
      this.appendFilter(id, val);
    }
    else {
      this.removeFilter(id);
    }
  }

  appendFilter(id, val) {
    const $button = $('<button class="Button Button_v1" id="'+ id +'">' + val + '</button>');
    this.$enabledContainer.append($button);
    this.eventsButton($button, id);
  }

  removeFilter(id) {
    this.$enabledContainer.find('#' + id).remove();
  }
}
