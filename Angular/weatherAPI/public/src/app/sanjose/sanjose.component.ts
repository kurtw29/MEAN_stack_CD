import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-sanjose',
  templateUrl: './sanjose.component.html',
  styleUrls: ['./sanjose.component.css']
})
export class SanjoseComponent implements OnInit {
  weather: any;
  errorMsg: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getWeather('san jose')
  }

  getWeather(city){
    let observable = this._httpService.getWeather(city);
    observable.subscribe(data =>{
        this.weather = data;
        console.log("SUBSCRIBE - DATA: ", data);
        console.log("this.weather: ", this.weather)
        this.convertTemp();
    })
  }

  convertTemp(){
    this.weather.main.temp = (this.weather.main.temp*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_min = (this.weather.main.temp_min*(9/5) - 459.67).toFixed(2)
    this.weather.main.temp_max = (this.weather.main.temp_max*(9/5) - 459.67).toFixed(2)
    console.log("converetd temperature", this.weather.main.temp)
  }
  image_url = "https://images.pexels.com/photos/462331/pexels-photo-462331.jpeg?auto=compress&cs=tinysrgb&h=350"
}
