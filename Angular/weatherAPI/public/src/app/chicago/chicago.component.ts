import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  weather: any;
  constructor(private _http:HttpService) { }

  ngOnInit() {
    this.getWeather('chicago')
  }

  getWeather(city){
    let obs = this._http.getWeather(city);
    obs.subscribe(data =>{
      this.weather = data;
      this.convertTemp();
    })
  }
  convertTemp(){
    this.weather.main.temp = (this.weather.main.temp*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_min = (this.weather.main.temp_min*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_max = (this.weather.main.temp_max*(9/5) - 459.67).toFixed(2)
    console.log("converetd temperature", this.weather.main.temp)
  }
  
  image_url = "https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
}
