import {getModule} from './Tools.js';
import Accordion from './Accordion.js';
import Tabs from './Tabs.js';

export default class CalcBlock {
  constructor(el, opts={}) {
    this.$el = $(el);
    this.init();
    this.events();
  }

  init() {
    this.$button = this.$el.find('.js_calc_button');
    this.$add_button = this.$el.find('[data-button=add]');
    this.$form = this.$el.find('.js_calc_form');
    this.$inputs = this.$form.find('input');
    this.$selects = this.$form.find('select');
    this.fields_total = [0,0,0];
    this.calc_square = [];
  }

  events() {
    this.$el.on('keyup.Calc', this.$inputs, this.getDataForm.bind(this));
    //this.$el.on('change', this.$selects, this.getDataForm.bind(this));
    this.$button.click(this.setResultCallback.bind(this));
    this.$add_button.click(this.addStage.bind(this));
  }

  reInit() {
    this.destroy();
    this.init();
    this.$el.on('keyup.Calc', this.$inputs, this.getDataForm.bind(this));
  }

  destroy() {
    this.$el.off('keyup.Calc');
  }

  addStage() {
    const self = this;
    const $calcBlock = this.$el.find('.CalcBlock__calc');
    const $tabs = this.$el.find('[data-js=Tabs]');
    getModule('Chunk', 'CalcForm', 'status => false', function (data) {
      $calcBlock.append(data);
      new Accordion($calcBlock.last());
      self.reInit();
    });
  }

  getDataForm() {
    let form_total = [];
    let data;
    if (this.$form.length > 1) {
      this.$form.each((index, item) => {
        data = this.serializeForm($(item));
        form_total.push(this.calcForm(data));
      });
    }
    else {
      data = this.serializeForm(this.$form);
      form_total.push(this.calcForm(data));
    }
    const calc_square = data[1];
    this.calcResult(form_total, calc_square);
  }

  serializeForm($form) {
    const $inputs = $form.serializeArray();
    let field_1 = [];
    let field_2 = [];
    let field_3 = [];
    let calc_height = 0;
    $inputs.forEach((item) => {
      if (item.name === 'height') {
        calc_height = item.value;
      }
      else if (item.name === 'square') {
        this.calc_square.push(item.value);
      }
      else if (!item.name.search(/fields_0/i)) {
        field_1.push(item.value);
      }
      else if (!item.name.search(/fields_1/i)) {
        field_2.push(item.value);
      }
      else if (!item.name.search(/fields_2/i)) {
        field_3.push(item.value);
      }
    });
    return [calc_height, field_1, field_2, field_3];
  }

  calcForm(data) {
    const field_1_total = data[0] * data[1][0] * data[1][1];
    const field_2_total = data[0] * data[2][0] * data[2][1];
    const field_3_total = data[0] * data[3][0] * data[3][1];
    return [field_1_total.toFixed(2), field_2_total.toFixed(2), field_3_total.toFixed(2)];
  }

  calcResult(form_total) {
    const reducer = (accumulator, currentValue) => {
      let _result = [];
      currentValue.forEach((item, index) => {
        _result.push(parseFloat(accumulator[index]) + parseFloat(currentValue[index]));
      });
      return _result;
    }
    this.total_result = form_total.reduce(reducer);
    this.setResults();
  }

  setResults() {
    this.total_result.forEach((item, index) => {
      this.$el.find(`.js_calc_field_${index}_0`).text((parseInt(item) * 2) + ' шт.');
      this.$el.find(`.js_calc_field_${index}_1`).html(parseFloat(item).toFixed(2) + ' м<sup>3</sup>');
      this.$el.find(`.js_calc_field_${index}_2`).text((parseInt(item) / 5) + ' палетт');
    });
  }

  setResultCallback() {
    let index = 0;
    console.log(this.total_result);
    const reducer = (accumulator, currentValue) => {
      const _result = accumulator + currentValue - this.calc_square[index];
      index++;
      return _result;
    }
    let count = this.total_result.reduce(reducer);
    if (isNaN(count)) {
      count = 0;
    }
    console.log(count);
    this.calc_square = [];
    $('.ShipPriceBlock [name=count]').val(parseInt(count));
  }
}
