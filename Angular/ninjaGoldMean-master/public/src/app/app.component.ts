import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'public';
  score: any;
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.score = {gold: 0, activities: [], userName: 'playerOne' };
  }

  // getGold(){
  //   let observable = this._httpService.getGold();
  //   observable.subscribe(data =>{
  //     if (data.message === true) {
  //       this.score = data.data[0];
  //       console.log("getGold() this.score: data.data", data.data);
  //       // console.log("compt.ts getGold(): this.score: ",this.score);
  //     }else{
  //       console.log("there's an error in getGold() comp.ts ")
  //     }
  //   })
  // }

  clickFarm() {
    let pts = Math.trunc(Math.random()*(5 - (2))+ (2));
    this.score.gold += pts;
    this.score.activities.push(`earned ${pts} from Farm!`);
    console.log(this.score.activities);
    let observable = this._httpService.clickFarm(this.score);
    observable.subscribe(data => {
      console.log("obserable subscribe, data: ", data);
      if (data.message === true) {
        // this.score = data;
        // this.getGold();
        console.log(this.score);
      }
    });
  }
  clickCave() {
    
    let pts = Math.trunc(Math.random()*(10 - (5))+ (5));
    this.score.gold += pts;
    this.score.activities.push(`earned ${pts} from Cave!`);
    let observable = this._httpService.clickCave(this.score);
    observable.subscribe(data => {
      console.log("obserable subscribe, data: ", data);
      if (data.message === true) {
        // this.score = data;
        // this.getGold();
        console.log(this.score);
      }
    });
  }
  clickHouse() {
    let pts = Math.trunc(Math.random()*(15 - (7))+ (7));
    this.score.gold += pts;
    this.score.activities.push(`earned ${pts} from Cave!`);
    let observable = this._httpService.clickHouse(this.score);
    observable.subscribe(data => {
      console.log("obserable subscribe, data: ", data);
      if (data.message === true) {
        // this.score = data;
        // this.getGold();
        console.log(this.score);
      }
    });
  }
  clickCasino() {
    let pts = Math.trunc(Math.random()*(100 - (-100))+ (-100));
    this.score.gold += pts;
    if(pts > 0){
    this.score.activities.push(`earned ${pts} from Casino!`);
    }else{
      this.score.activities.push(`lost ${pts} from Casino!`);
    }
    let observable = this._httpService.clickCasino(this.score);
    observable.subscribe(data => {
      console.log("obserable subscribe, data: ", data);
      if (data.message === true) {
        // this.score = data;
        // this.getGold();
        console.log(this.score);
      }
    });
  }

}

