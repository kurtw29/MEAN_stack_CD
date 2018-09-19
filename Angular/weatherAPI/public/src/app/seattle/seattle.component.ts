import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  weather: any;
  errorMsg: any;
  image_url: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getWeather('seattle')
    this.image_url = "https://images.pexels.com/photos/656195/pexels-photo-656195.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  }

  getWeather(city){
    let observable = this._httpService.getWeather(city);
    observable.subscribe(data =>{
        this.weather = data;
        this.convertTemp;
        console.log("this.weather: ", this.weather)
      })
    }
  
    convertTemp(){
      this.weather.main.temp = this.weather.main.temp*(9/5) - 459.67
    }
  

}
