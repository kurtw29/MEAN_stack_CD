import { Injectable } from '@angular/core';
// set up dependency on HttpClient to make http requests - add to constructor
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) {
    //invoke the getTask function
    // this.getTask();
    // this.getTaskID('5b99ea51349ea663cdc7f9d3')
  }
  // create function to fetch data
  getTask(){
    // let tempObs = this._http.get('/tasks');
    // tempObs.subscribe(data => console.log("Got Tasks. data", data))
    return this._http.get('/tasks');
  }
  // create another function to fetch data by id
  getTaskID(id){
    // let tempObs = this._http.get('/tasks/'+id);
    // tempObs.subscribe(data => console.log("Got Task by ID data:", data))
    return this._http.get('/tasks/'+id);
  }
}