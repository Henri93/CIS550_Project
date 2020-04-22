export default [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#004358"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2eeed"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2eeed"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffa500"
      },
      {
        lightness: 10
      }
      
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffa500"
      },
      {
        lightness: 35
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffa500"
      },
      {
        lightness: 50
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "black"
      },
      {
        visibility: "on"
      },
      
      {
        weight: 7
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "black"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#1f8a70"
      },
      {
        lightness: -10
      }
    ]
  },
  {},
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#1f8a70"
      },
      {
        weight: 0.7
      }
    ]
  }
];
