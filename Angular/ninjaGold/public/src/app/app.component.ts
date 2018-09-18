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
  saved: any;
  loaded: any;
  players: any;
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.score = {gold: 0, activities: [], userName: "" };
    this.saved = "";
    this.loaded = "";
    this.getTop();
  }

  onSubmit(){
    let observable = this._httpService.onSave(this.score);
    observable.subscribe(data => {
      console.log("compont.ts / onSubmit() subscribe -> data:", data)
      if(data.message == true){
        this.saved = 1;
      }else{
        this.saved = 9;
      }
    })
    this.loaded = "";
    this.getTop();
  }

  onLoad(){
    let observable = this._httpService.Load(this.score);
    observable.subscribe(data =>{
      console.log("compont.ts / onSubmit() subscribe -> data:", data)
      if(data.message == true){
        console.log("FOUND USER DATA: data", data);
        this.loaded = 1;
        this.score = data.data[0];
      }else{
        console.log("DID NOT FIND USER DATA: data:", data);
        this.score = {gold: 0, activities: [], userName: "" };
        this.ngOnInit();
        this.loaded = 9;
      }
    })
    this.saved = "";
  }

  getTop(){
    let observerable = this._httpService.Top();
    observerable.subscribe(list =>{
      if(list.message == true){
        console.log("message == true, data: ", list)
        this.players = list.data;
        console.log(this.players)
        // for(lv x in data; x <= 5; x++;){
        //   this.players.push(x);
        // }
      }else{
        this.players.push("err in getting top players")
      }
    })
  }

  // getGold(){
  //   let observable = this._httpService.getGold(this.score);
  //   observable.subscribe(data =>{
  //     console.log('getGold() data: ', data)
  //     if (data.message === true) {
  //       // this.score = data.data[0];
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
    this.saved="";
    this.loaded="";
    console.log(this.score.activities);
    // let observable = this._httpService.clickFarm(this.score);
    // observable.subscribe(data => {
    //   console.log("obserable subscribe, data.message: ", data.message);
    //   if(data.message == true) {
    //     // this.score = data;
    //     // this.getGold();
    //     console.log(this.score);
    //   }
    // });
  }
  clickCave() {
    let pts = Math.trunc(Math.random()*(10 - (5))+ (5));
    this.score.gold += pts;
    this.score.activities.push(`earned ${pts} from Cave!`);
    this.saved = "";
    this.loaded="";
    // let observable = this._httpService.clickCave(this.score);
    // observable.subscribe(data => {
    //   console.log("obserable subscribe, data: ", data);
    //   if (data.message === true) {
    //     // this.score = data;
    //     // this.getGold();
    //     console.log(this.score);
    //   }
    // });
  }
  clickHouse() {
    let pts = Math.trunc(Math.random()*(15 - (7))+ (7));
    this.score.gold += pts;
    this.score.activities.push(`earned ${pts} from Cave!`);
    this.saved = "";
    this.loaded="";
    // let observable = this._httpService.clickHouse(this.score);
    // observable.subscribe(data => {
    //   console.log("obserable subscribe, data: ", data);
    //   if (data.message === true) {
    //     // this.score = data;
    //     // this.getGold();
    //     console.log(this.score);
    //   }
    // });
  }
  clickCasino() {
    let pts = Math.trunc(Math.random()*(100 - (-100))+ (-100));
    this.score.gold += pts;
    if(pts > 0){
    this.score.activities.push(`earned ${pts} from Casino!`);
    }else{
      this.score.activities.push(`lost ${pts} from Casino!`);
    }
    this.saved = "";
    this.loaded="";
    // let observable = this._httpService.clickCasino(this.score);
    // observable.subscribe(data => {
    //   console.log("obserable subscribe, data: ", data);
    //   if (data.message === true) {
    //     // this.score = data;
    //     // this.getGold();
    //     console.log(this.score);
    //   }
    // });
  }

}

