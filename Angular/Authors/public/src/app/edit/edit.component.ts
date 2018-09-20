import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  error: string;
  author: any;
  update_msg: string;
  constructor(
    private _route: ActivatedRoute,
    private _router:Router, 
    private _http:HttpService) { }

  ngOnInit() {
    this.author = "";
    this.update_msg = "";
    this._route.params.subscribe((params: Params)=> {
      console.log(params['id']);
      this.findById(params['id'])
    });
  }
  findById(id){
    this.error = ""
    let obs = this._http.find(id);
    obs.subscribe(data =>{
      console.log("subscribed this is data: ", data)
      if(data['message'] == true){
        this.author = data['data'][0]
      }else{
        this.error = "Unable to load author"
      }
    })
  }

  update(){
    this.error = "";
    this.update_msg = "";
    let obs = this._http.edit(this.author);
    console.log("What's this.author: ", this.author)
    obs.subscribe(data =>{
      console.log("subscribed update(), is data: ", data)
      if(data['message'] == true){
        this.update_msg = "Successfully updated!"
      }else{
        this.update_msg = "Unable to update."
      }
    })
  }

}
