import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  balance;
  constructor(private _http:HttpClient) { }

  addCoin(num){
    this.balance+=num;
    return this.balance;
  }
}
