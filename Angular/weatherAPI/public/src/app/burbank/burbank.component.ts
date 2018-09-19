import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-burbank',
  templateUrl: './burbank.component.html',
  styleUrls: ['./burbank.component.css']
})
export class BurbankComponent implements OnInit {
  weather: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getWeather('burbank')
  }
  getWeather(city){
    let obs = this._httpService.getWeather(city);
    obs.subscribe(data => {
      this.weather = data;
      this.convertTemp();
      console.log("this.weather: ", this.weather)
    })
  }

  convertTemp(){
    this.weather.main.temp = (this.weather.main.temp*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_min = (this.weather.main.temp_min*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_max = (this.weather.main.temp_max*(9/5) - 459.67).toFixed(2)
    console.log("converetd temperature", this.weather.main.temp)
  }
  image_url = "https://s.abcnews.com/images/Travel/CB_burbank_california_jef_130701_33x16_992.jpg"
}
