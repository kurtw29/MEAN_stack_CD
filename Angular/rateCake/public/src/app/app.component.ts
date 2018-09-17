import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cakes: any;
  newCake: any;
  thisCake: any;
  rateCake: any;

  constructor(private _httpService: HttpService){
    this.newCake = { baker: "", url: ""};
    this.rateCake ={ stars: "", comment:"", cakeid:""};
  }
  ngOnInit(){
    this.getCakesFromService();
  }

  getCakesFromService(){
    console.log("entered app.comp.ts / getCakesFromServie()")
    let observable = this._httpService.getCakes();
    observable.subscribe(data =>{
      this.cakes = data;
      console.log("received cakes data: ", this.cakes)
    })
  }

  onAdd(){
    console.log("Adding cake")
    let observable = this._httpService.addCake(this.newCake);
    observable.subscribe(data =>{
      console.log("Successfully added cake.");
      this.getCakesFromService()
    });
    this.newCake = { baker: "", url: ""}
  }

  //MED's form submission method - cool, but not sure how to clear form
  // When someone click "rate" & submit form, runs this function, cakerating is the form data, cakeID is the id of the cake.
  // onRating(cakeID, cakerating){
  //   console.log("Adding rating for selected cake", cakerating)
  //   cakerating.cakeid = cakeID;
  //   let observable = this._httpService.rateCake(cakerating);
  //   observable.subscribe(data =>{
  //     console.log("successfully rated cake.");
  //     this.rateCake = {stars: "", comment:"", cakeid:""};
  //   })
  // }
  onRating(cakeID, other){
    // this.rateCake = other;
    other.cakeid = cakeID;
    console.log("Adding rating for selected cake", this.rateCake)
    console.log("other", other)
    let observable = this._httpService.rateCake(other);
    observable.subscribe(data =>{
      console.log("successfully rated cake.");
      this.rateCake = {stars: "", comment:"", cakeid:""};
      this.getCakesFromService();
    })
  }

  getThisCake(cake){
    console.log('In Getting THIS cake info');
    this.thisCake = cake;
    console.log('GOT thisCake info: ', this.thisCake)
    let sum = 0;
    for(let r of this.thisCake.ratings ){
      sum+=r.stars
    }
    var ave_rating = (sum/this.thisCake.ratings.length).toFixed(1);
    console.log("in app.component.ts / getThisCake() - sum: ",sum," rating array.length: ",this.thisCake.ratings," average rating: ",ave_rating);
    this.thisCake.ave_rating = ave_rating;

    
  }
}
