import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {}
  onSave(data){
    console.log("service.ts / onSave() data: ", data)
    return this._http.post('/save', data);
  }
  Load(data){
    console.log("service.ts / Load() data: ", data)
    return this._http.post('/load', data);
  }
  Top(){
    return this._http.get('/top');
  }
//   getGold(data) {
//     return this._http.post('/gold', data);
//   }
//   clickFarm(data) {
//       console.log("service.ts / clickFarm(data), data: ",data)
//       return this._http.post('/farm', data);
//   }
//   clickCave(data) {
//       console.log("service.ts / clickCave(data), data: ",data)
//       return this._http.post('/cave', data);
//   }
//   clickHouse(data) {
//       console.log("service.ts / clickHouse(data), data: ",data)
//       return this._http.post('/house', data);
//   }
//   clickCasino(data) {
//       console.log("service.ts / clickCasino(data), data: ",data)
//       return this._http.post('/casino', data);
  }
