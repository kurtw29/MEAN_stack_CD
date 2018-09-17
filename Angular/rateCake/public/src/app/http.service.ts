import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  getCakes(){
    return this._http.get('/cakes')
  }

  // Sending request to add cake, passing newCake data
  addCake(newCake){
    return this._http.post('/cakes', newCake);
  }
  rateCake(rateCake){
    console.log("in service.ts - rateCake(rateCake), rateCake:",rateCake)
    return this._http.post('/cakes/'+rateCake.cakeid, rateCake);
  }
}
