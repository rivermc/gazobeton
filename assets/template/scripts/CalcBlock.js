export default class CalcBlock {
  constructor(el, opts={}) {
    this.$el = $(el);
    this.init();
    this.events();
  }

  init() {
    this.$button = this.$el.find('.js_calc_button');
    this.$form = this.$el.find('.js_calc_form');
    this.$inputs = this.$form.find('input');
    this.$selects = this.$form.find('selects');
    this.fields_total = [0,0,0];
    this.calc_square = 0;
  }

  events() {
    this.$el.on('keyup', this.$inputs, this.serializeForm.bind(this));
    this.$el.on('change', this.$selects, this.serializeForm.bind(this));
    this.$button.click(this.setCount.bind(this));
  }

  serializeForm(e) {
    this.$inputs = this.$form.serializeArray();
    this.field_1 = [];
    this.field_2 = [];
    this.field_3 = [];
    this.$inputs.forEach((item) => {
      if (item.name === 'height') {
        this.calc_height = item.value;
      }
      else if (item.name === 'square') {
        this.calc_square = item.value;
      }
      else if (!item.name.search(/fields_0/i)) {
        this.field_1.push(item.value);
      }
      else if (!item.name.search(/fields_1/i)) {
        this.field_2.push(item.value);
      }
      else if (!item.name.search(/fields_2/i)) {
        this.field_3.push(item.value);
      }
    });
    this.calculation('page_1');
  }

  calculation(field) {
    const field_1_total = this.calc_height * this.field_1[0] * this.field_1[1];
    const field_2_total = this.calc_height * this.field_2[0] * this.field_2[1];
    const field_3_total = this.calc_height * this.field_3[0] * this.field_3[1];
    this.fields_total = [field_1_total, field_2_total, field_3_total];
    this.setResults();
  }

  setResults() {
    this.fields_total.forEach((item, index) => {
      this.$el.find(`.js_calc_field_${index}_0`).text((item.toFixed(2) * 2) + ' шт.');
      this.$el.find(`.js_calc_field_${index}_1`).html(parseFloat(item).toFixed(2) + ' м<sup>3</sup>');
      this.$el.find(`.js_calc_field_${index}_2`).text((parseFloat(item) / 5).toFixed(2) + ' паллет');
    });
  }

  setCount() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let count = this.fields_total.reduce(reducer) - this.calc_square;
    if (isNaN(count)) {
      count = 0;
    }
    console.log(count);
    $('.ShipPriceBlock [name=count]').val(parseInt(count));
  }
}
