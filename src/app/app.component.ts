import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'YourFriend';

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.handleError.bind(this),{
        enableHighAccuracy: true, // Request high accuracy
        timeout: 10000, // Max wait time in milliseconds
        maximumAge: 0, // Do not use cached location
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position: GeolocationPosition) {
    console.log("Latitude: " + position.coords.latitude +
      " Longitude: " + position.coords.longitude, position);
  }

  handleError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      default:
        console.log("An unknown error occurred.");
        break;
    }
  }
}