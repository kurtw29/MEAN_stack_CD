import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  getWeather(city){
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=5e2795c0e2f38b6a385d46374fcf4fb1')
  }
  getWeatherByID(cityid){
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id='+cityid+'&appid=5e2795c0e2f38b6a385d46374fcf4fb1')
  }
}
