import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  name:string;
  error: string;
  response: string;
  constructor(private _http:HttpService, private _router:Router) { }

  ngOnInit() {
  }

  add(){
    this.response = "";
    this.error = "";
    let obs = this._http.create(this.name);
    obs.subscribe(data =>{
      if(data['message'] == true){
        console.log("subscribe success data:", data)
        this.response = "Successfully added"
        this._router.navigate(['/']);
      }else{
        console.log("subscribed, error, data: ", data)
        this.error = "Unable to add author"
      }
    })
  }

}
