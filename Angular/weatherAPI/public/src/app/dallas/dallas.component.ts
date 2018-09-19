import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-dallas',
  templateUrl: './dallas.component.html',
  styleUrls: ['./dallas.component.css']
})
export class DallasComponent implements OnInit {

  constructor(private _httpService:HttpService) { }
  weather: any;
  ngOnInit() {
    this.getWeather('dallas')
  }
  getWeather(city){
    let obs = this._httpService.getWeather(city);
    obs.subscribe(data =>{
      this.weather = data;
      this.convertTemp();
      console.log('what this.weather: ', this.weather)
    })
  }

  convertTemp(){
    this.weather.main.temp = (this.weather.main.temp*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_min = (this.weather.main.temp_min*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_max = (this.weather.main.temp_max*(9/5) - 459.67).toFixed(2)
    console.log("converetd temperature", this.weather.main.temp)
  }
  image_url = "https://images.pexels.com/photos/280193/pexels-photo-280193.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
}
