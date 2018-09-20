import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct: any;
  error: any;
  success: string;
  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router) {
  }
  
  ngOnInit() {
    this.newProduct ={ title: null, price: null, image_url: null}
    this.error ={ title: null, price: null, image_url: null}
    this.success = "";
  }

  onSubmit(){
    this.error = { title: "", price: "", image_url: ""}
    this.success = "";
    console.log("onSubmit(), this.newProuct: ",this.newProduct)
    let obs = this._http.add(this.newProduct);
    obs.subscribe(data =>{
      console.log("onSubmit() -> subscribing obs. Data: ", data)
      if(data['message'] == false){
        // data object -> data[err]['errors']['price']['message'] // data.errors.title.message
        this.error = data['err']['errors'];
        console.log("this.error ", this.error )
      }else if(data['message'] == true){
        console.log("data's good")
        this.success = "Product added"
        this.newProduct = { title: "", price: "", image_url:""}
        this._router.navigate(['/products']);
      }
    });
  }
}
