import Dropdown from './Dropdown.js';

export default class Filter {
  constructor(el, opts) {
    this.$el = $(el);
    this.$reset = this.$el.find('[type=reset]');
    this.$buttons = this.$el.find('.js_filter_Dropdown');
    this.input = this.$el.find('input[type="checkbox"]');
    this.$enabledContainer = $('.js_filter_enabled');
    this.initDropdown();
    this.eventsInput();
    this.input.each((index, item) => {
        this.checkFilter(item);
    });

    this.$reset.on('click', () => {
      this.$enabledContainer.empty();
    })
  }

  //Events
  eventsButton($button, id) {
    $button.on('click', () => {
      $(`#mse2_filters input#${id}`).trigger('click');
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
    let $field = $(event);
    let val = $field.val();
    let id = $field.attr('id');
    let parentName = $field.data('parent_name');
    if ($field.is(':checked')) {
      if ($field.attr('name') === 'parent') {
        val = $field.data('title');
      }
      this.appendFilter(id, val, parentName);
    }
    else {
      this.removeFilter(id);
    }
  }

  appendFilter(id, val, name) {
    const $button = $(`<button class="Button Button_v1 Button_s1 Button_p1 Button_m4" id="${id}">${name}: ${val}</button>`);
    this.$enabledContainer.append($button);
    this.eventsButton($button, id);
  }

  removeFilter(id) {
    this.$enabledContainer.find(`#${id}`).remove();
  }
}
