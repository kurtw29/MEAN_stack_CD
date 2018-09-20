import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.css']
})
export class ListAuthorsComponent implements OnInit {
  authors: any;
  error: string;
  delete_msg: string;
  constructor(private _http:HttpService, private _router:Router) { }

  ngOnInit() {
    this.getAuthors();
    this.error = "";
    this.delete_msg = "";
  }

  getAuthors(){
    this.delete_msg = ""
    let obs = this._http.getAll();
    obs.subscribe(data =>{
      if(data['message'] == true){
        console.log("message == true, data: ",data)
        this.authors = data['data']
      }else{
        this.error = 'Unable to load authors'
      }
    })
  }

  delete(id){
    this.error = "";
    this.delete_msg = "";
    let obs = this._http.del(id);
    obs.subscribe(data =>{
      if(data['message'] == true){
        this.delete_msg = "Author deleted"
        this.ngOnInit();
      }else{
        this.delete_msg = "Unable to delete"
      }
    })
  }
}
