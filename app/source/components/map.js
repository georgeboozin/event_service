function MapController($scope, $element, $attrs, $timeout, $compile, APIClient){
  var ctrl = this;

  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(54.993437, 73.365768),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl:false,
    streetViewControl: false,
    zoomControlOptions: {
      style:google.maps.ZoomControlStyle.LARGE
    }
  };

  ctrl.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  ctrl.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  ctrl.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  };


  APIClient.observable.subscribe(function(x) {
    if(x == 'events'){
      CreateAllMarkers();
    }
  },function(e){
    console.log('onError: %s', e)
  },function(){
    console.log('onCompleted')
  });

  function createMarker(info){

    var marker = new google.maps.Marker({
      map: ctrl.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.title
    });

    google.maps.event.addListener(marker, 'click', function(){
      var content = '<md-card style="box-shadow: 0px 0px 0px 0px">'+
        '<md-card-title>'+
        '<md-card-title-text>'+
        '<span class="md-headline">'+ marker.title +'</span>'+
        '<span class="md-subhead">'+ info.description +'</span>'+
        '</md-card-title-text>'+
        '</md-card-title>'+
        '<md-card-actions layout="row" layout-align="end center">'+
        '<md-button>Подробнее</md-button>'+
        '<md-button>Пойду</md-button>'+
        '</md-card-actions>'+
        '</md-card>'+
        '';
      var compiled = $compile(content)($scope);
      infoWindow.setContent(compiled[0]);
      infoWindow.open(ctrl.map, marker);
    });
    ctrl.markers.push(marker);
  }

  function CreateAllMarkers(){
    for (var i = 0; i < ctrl.events.length; i++){
      createMarker(ctrl.events[i]);
    }
  }
}
EventService.component('map', {
  template:'<div id="map"></div>',
  bindings:{
    events:'<'
  },
  controller:MapController
});
