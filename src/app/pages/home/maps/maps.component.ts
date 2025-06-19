import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements AfterViewInit {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-23.55052, -46.633308], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    const gifIcon = L.divIcon({
      html: `<div><img src="https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif" width="60"/></div>`,
      className: '',
      iconSize: [60, 60]
    });

    L.marker([-23.55052, -46.633308], { icon: gifIcon })
      .addTo(this.map)
      .bindPopup('Centro com GIF');

    L.marker([-23.601, -46.669], { icon: gifIcon })
      .addTo(this.map)
      .bindPopup('Outro ponto');
  }
}
