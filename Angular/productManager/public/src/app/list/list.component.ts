import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _http:HttpService) { }
  products: any;
  error: string;
  del_error: string;
  ngOnInit() {
    this.findProducts();
    this.del_error="";
  }

  findProducts(){
    this.del_error = "";
    this.error = "";
    let obs = this._http.getProducts();
    obs.subscribe(data =>{
      // console.log('findProducts(), data: ', data )
      if(data['message'] == true){
        this.products = data['data']    //data['data'] is an array of objects (keys: title, price, image_url)
      }else{
        this.error = "Sorry, unable to retrive products."
      }
    })
  }

  delete(data){
    this.del_error = "";
    this.error = "";
    let obs = this._http.remove(data['_id']);
    obs.subscribe(data =>{
      if(data['message'] == true){
        this.ngOnInit()   //reload the page to show the new product list
      }else{
        this.del_error = "Sorry, unable to retrive products."
      }
    })
  }
}
