export default class Map {
  constructor(el) {
    this.$el = $(el);
    this.id = this.$el.attr('id');
    this.address = this.$el.data('address');

    new Promise((resolve) => {
      this.geocoding(this.address, resolve);
    }).then((coords) => {
      this.coords = coords;
      this.createMap();
      this.addPlacemark();
    });
  }

  createMap() {
    this.Map = new ymaps.Map(this.id, {
      center: this.coords,
      controls: ['typeSelector', 'fullscreenControl'],
      zoom: 10
    });
    if (window.innerWidth <= 768) {
      this.Map.behaviors.disable('drag');
    }
  }

  addPlacemark() {
    const Placemark = new ymaps.Placemark(this.coords, {
      hintContent: this.address,
      balloonContent: '<p>' + this.address + '</p>'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/assets/template/images/icons/geo.svg',
      iconImageSize: [38, 46],
      iconImageOffset: [-19, -46]
    });
    this.Map.geoObjects.add(Placemark);
  }

  geocoding(address, resolve) {
    ymaps.geocode(address, {
      results: 1
    }).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);
      resolve(firstGeoObject.geometry.getCoordinates());
    });
  }
}
