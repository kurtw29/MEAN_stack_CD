import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-dc',
  templateUrl: './dc.component.html',
  styleUrls: ['./dc.component.css']
})
export class DcComponent implements OnInit {
  weather: any;
  constructor(private _http:HttpService) { }

  ngOnInit() {
    this.getWeather('4366164');
  }

  getWeather(cityid){
    let obs = this._http.getWeatherByID(cityid);
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
  image_url = "https://images.pexels.com/photos/208702/pexels-photo-208702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
}
