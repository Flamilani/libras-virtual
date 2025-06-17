import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent {
options = {
    layers: [
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; OpenStreetMap contributors &copy; CartoDB',
          subdomains: 'abcd',
          maxZoom: 19
        }
      )
    ],
    zoom: 13,
    center: L.latLng(-23.55052, -46.633308) // Ex.: São Paulo
  };

  // Definição dos pontos com GIFs
  layers = [
    L.marker([-23.55052, -46.633308], {
      icon: L.divIcon({
        html: `<div><img src="https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif" width="60"/></div>`,
        className: '',
        iconSize: [60, 60],
      }),
    }).bindPopup('<b>Centro</b><br>Este é o Centro.'),

  ];
}
