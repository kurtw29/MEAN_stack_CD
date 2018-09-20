import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editProduct: any;
  error: any;
  success: string;
  del_error: string;
  constructor(
    private _http:HttpService, private _route:ActivatedRoute, private _router:Router) {}

  ngOnInit() {
    this.editProduct ={ title: null, price: null, image_url: null}
    this.error ={ title: null, price: null, image_url: null}
    this.success = "";
    this._route.params.subscribe((params: Params) =>{
      this.findById(params['id']);
    })
  }

  findById(id){
    this.error = "";
    let obs = this._http.find(id);
    obs.subscribe(data =>{
      console.log("subscribed this is data: ", data)
      if(data['message'] == true){
        this.editProduct = data['data'][0]
        console.log('this.editProduct: ', this.editProduct)
      }else{
        this.error = "Unable to load author"
      }
    })
  }


  onSubmit(){
    this.error = { title: "", price: "", image_url: ""}
    this.success = "";
    console.log("onSubmit(), this.editProduct: ",this.editProduct)
    let obs = this._http.edit(this.editProduct);
    obs.subscribe(data =>{
      console.log("onSubmit() -> subscribing obs. Data: ", data)
      if(data['message'] == false){
        // data object -> data[err]['errors']['price']['message'] // data.errors.title.message
        this.error = data['err']['errors'];
        console.log("this.error ", this.error )
      }else if(data['message'] == true){
        console.log("data's good")
        this.success = "Product updated!"
        this.editProduct = { title: "", price: "", image_url:""}
        this._router.navigate(['/products']);
      }
    });
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
