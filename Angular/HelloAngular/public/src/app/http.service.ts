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
    console.log('in sevice gettaskid:(id); ', id)
    return this._http.get('/tasks/'+id);
  }
  addTask(data){
    return this._http.post('/tasks', data);
  }

  updateTask(data){
    console.log("In service.ts: updateTask data: ", data)
    return this._http.put('/tasks/'+data.id, data);
  }

  deleteTask(id){
    console.log("In service.ts/ under deleteTask, received data from component - data:", id)
    return this._http.delete('/tasks/'+id)
  }
}