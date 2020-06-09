import Dropdown from './Dropdown.js';

export default class Filter {
  constructor(el, opts) {
    this.$el = $(el);
    this.$reset = this.$el.find('[type=reset]');
    this.$buttons = this.$el.find('.js_filter_Dropdown');
    this.input = this.$el.find('input[type="checkbox"]');
    this.$enabledContainer = $('.js_filter_enabled');
    this.$buttons.click(this.initDropdown.bind(this));
    this.eventsInput();
    this.input.each((index, item) => {
        this.checkFilter(item);
    });
    this.$filter_input = $('.Catalog__filter [name=filter]');
    this.catalogFilter();

    this.$reset.on('click', () => {
      this.$enabledContainer.empty();
      this.$filter_input.prop('checked', false);
    });



    $(document).on('mse2_load', (/*e, data*/) => {
      this.checkShowFilter();
    });
  }

  //Events
  eventsButton($button, id) {
    $button.on('click', () => {
      $(`#mse2_filters input[data-data_id=${id}]`).trigger('click');
    });
  }

  eventsInput() {
    this.input.on('change', (event) => {
      this.checkFilter(event.currentTarget);
    });
  }

  catalogFilter() {
    this.$filter_input.on('change', (event) => {
      const $input = $(event.currentTarget);
      const id = $input.attr('id');
      this.$el.find(`[data-data_id=${id}]`).trigger('click');
    });
  }

  //Dropdown
  initDropdown(btn) {
    const $btn = $(btn.currentTarget);
    const opts = {
      appendTo: $btn.parent(),
      position: {
        my: 'left top',
        at: 'left bottom',
        of: btn.currentTarget,
      },
    };
    const dropdown = new Dropdown($btn.data('dropdown'), opts);
    dropdown.open();
  }

  //Control Filter
  checkFilter(event) {
    let $field = $(event);
    let val = $field.val();
    let id = $field.data('data_id');
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

  checkShowFilter() {
    this.input.each((index, item) => {
      const $field = $(item);
      if ($field.is(':disabled')) {
        $field.parents('.Form__fieldWrap').attr('hidden', true);
      }
      else {
        $field.parents('.Form__fieldWrap').attr('hidden', false);
      }
    });
  }

  appendFilter(id, val, name) {
    const $button = $(`<button class="Button Button_v1 Button_s1 Button_p1 Button_m4" data-data_id="${id}">${name}: ${val}</button>`);
    this.$enabledContainer.append($button);
    this.eventsButton($button, id);
  }

  removeFilter(id) {
    this.$enabledContainer.find(`[data-data_id=${id}]`).remove();
    $(`#${id}`).prop('checked', false);
  }
}
