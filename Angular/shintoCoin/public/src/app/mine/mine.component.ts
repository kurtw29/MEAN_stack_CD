import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  answer: number;
  response: string;
  coin: any;
  constructor(private _http:HttpService) { }

  ngOnInit() {
  }

  mine(){
    this.response = "";
    if(this.answer == 13){
      this.coin = this._http.addCoin(1);
      this.response ="You're right! it's "+ this.answer+"! 1 ShintoCoin added!";
      console.log(this.response)
      console.log("Current coins: ", this.coin)
    }else{
      this.response = "Try again."
    }
  }
}
