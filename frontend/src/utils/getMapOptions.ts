type Maps = typeof google.maps;

export const getMapOptions = (maps: Maps) => (
  {
    keyboardShortcuts: false,
    streetViewControl: false,
    scaleControl: false,
    fullscreenControl: false,
    mapTypeId: maps.MapTypeId.SATELLITE,
    zoomControl: false,
    clickableIcons: true,
    disableDefaultUI: true,
    draggable: true,
  });
