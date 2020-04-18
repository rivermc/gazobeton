export default class Map {
  constructor(id) {
    this.id = id;
    this.$map = $('#' + this.id);
    this.address = this.$map.data('address');
    new Promise((resolve) => {
      this.geocoding(resolve);
    }).then(() => {
      this.initialize();
      this.addPlacemark();
    });
  }

  initialize() {
    this.Map = new ymaps.Map(this.id, {
      center: this.coords,
      controls: ['typeSelector', 'fullscreenControl'],
      zoom: 10
    });
    if (window.innerWidth < 768) {
      this.Map.behaviors.disable('drag');
    }
  }

  addPlacemark() {
    var Placemark = new ymaps.Placemark(this.coords, {
      hintContent: this.address,
      balloonContent: '<p>' + this.address + '</p>'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/assets/template/images/icons/map-icon-0.svg',
      iconImageSize: [64, 90],
      iconImageOffset: [-32, -90]
    });
    this.Map.geoObjects.add(Placemark);
  }

  geocoding(resolve) {
    ymaps.geocode(this.address, {
      results: 1
    }).then((res) => {
      var firstGeoObject = res.geoObjects.get(0);
      this.coords = firstGeoObject.geometry.getCoordinates();
      resolve();
    });
  }
}
