import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { NumberFormatStyle } from '@angular/common';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  coin = {
    owned: 0,
    value: 1
  }
  buy_coin: any;
  response: String;
  constructor(private _http:HttpService) { }

  ngOnInit() {
    this.coin.owned = this._http.balance
  }

  buy(){
    this.response = ""
    console.log("this.buy_coin: ", this.buy_coin)
    if(this.buy_coin){
    this.coin.owned += this.buy_coin;
    this.coin.value += this.buy_coin;
    }else{
      this.response = "Need to enter number"
    }

  }
}