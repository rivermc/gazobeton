export default class Menu {
  constructor(el, opts) {
    this.$el = $(el);
    this.opts = opts;

    const defaultOpts = {
      closer: '.Menu__closer',
      toggler: '.Menu__toggler',
    };
    this.opts = $.extend(true, defaultOpts, opts);

    if (this.opts.is_catalog_toggle) {
      this.$el.click(this.catalogToggler);
    }
    else {
      this.toggler = $(this.opts.toggler);
      this.closer = this.$el.find(this.opts.closer);
      this.events();
    }
  }

  events() {
    this.toggler.on('click', this.toggleMenu.bind(this));
    this.closer.click('click', this.closeMenu.bind(this));
    $(document).on('scroll', () => {
      this.closeMenu();
    });
  }

  toggleMenu(event) {
    event.preventDefault();
    if (this.$el.attr('data-status') === 'true') {
      this.closeMenu();
    }
    else {
      this.openMenu();
    }
  }

  openMenu() {
    this.$el.attr('data-status', true);
    this.toggler.attr('data-status', true);
  }

  closeMenu() {
    this.$el.attr('data-status', false);
    this.toggler.attr('data-status', false);
  }

  catalogToggler() {
    const status = $(this).attr('data-status') === 'true';
    $(this).attr('data-status', !status);
    $('.Header__catalogWrap').attr('data-status', !status);
  }
}