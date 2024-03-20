import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  private map!: L.Map;

  constructor(private http: HttpClient, private userService: UserService) { }

  dataResponse: User[] = [];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.dataResponse = response;
        this.initMap();
      }
    )
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [36, 0],
      zoom: 2
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(this.map);

    const heatData = this.dataResponse.map(record => [record.latitude, record.longitude, 1]);
    const heatLayer = (L as any).heatLayer(heatData, {
      radius: 20,
      gradient: { 0.4: 'red', 0.65: 'lime', 1: 'blue' }
    }).addTo(this.map);
  }
}
