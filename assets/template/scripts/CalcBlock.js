export default class CalcBlock {
  constructor(el, opts={}) {
    this.$el = $(el);
    this.$button = $(el).find('.js_calc_button');
    this.$form = $(el).find('.js_calc_form');
    this.$inputs = this.$form.find('input');
    this.$inputs.change(this.serializeForm.bind(this));
    this.$button.click(this.setCount.bind(this));
  }

  serializeForm(e) {
    e.preventDefault();
    this.$inputs = this.$form.serializeArray();
    this.field_1 = [];
    this.field_2 = [];
    this.field_3 = [];
    this.$inputs.forEach((item) => {
      if ( item.name === 'height') {
        this.calc_height = item.value;
      }
      if ( item.name === 'square') {
        this.calc_square = item.value;
      }
      if (!item.name.search(/fields_0/i)) {
        this.field_1.push(item.value);
      }
      if (!item.name.search(/fields_1/i)) {
        this.field_2.push(item.value);
      }
      if (!item.name.search(/fields_2/i)) {
        this.field_3.push(item.value);
      }
    });
    this.calculation('page_1');
  }

  calculation(field) {
    const field_1_total = this.calc_height * this.calc_square / this.field_1[0] * this.field_1[1] * this.field_1[2];
    const field_2_total = this.calc_height * this.calc_square / this.field_2[0] * this.field_2[1] * this.field_2[2];
    const field_3_total = this.calc_height * this.calc_square / this.field_3[0] * this.field_3[1] * this.field_3[2];
    this.fields_total = [field_1_total, field_2_total, field_3_total];
    this.setResults();
  }

  setResults() {
    this.fields_total.forEach((item, index) => {
      this.$el.find(`.js_calc_field_${index}_0`).text(item.toFixed(2));
      this.$el.find(`.js_calc_field_${index}_1`).text((parseFloat(item) / 2).toFixed(2));
      this.$el.find(`.js_calc_field_${index}_2`).text((parseFloat(item) / 5).toFixed(2));
    });
  }

  setCount() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const count = this.fields_total.reduce(reducer);
    $('.ShipPriceBlock [name=count]').val(parseInt(count));
  }
}
