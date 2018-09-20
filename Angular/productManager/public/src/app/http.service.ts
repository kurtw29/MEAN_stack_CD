import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  getProducts(){
    console.log("service.ts / getProducts()");
    return this._http.get('/all_products');
  }

  add(data){
    console.log("service.ts / add(data), data: ", data);
    return this._http.post('/add_products', data);
  }

  edit(data){
    console.log("service.ts / edit(data), data: ", data);
    return this._http.put('/edit_products/'+data['_id'], data);
  }

  find(id){
    console.log("service.ts / find(id), id: ", id);
    return this._http.get("/product_by_id/"+id)
  }

  remove(id){
    console.log("service.ts / remove(id), id: ", id);
    return this._http.delete("/delete_products/"+id);
  }
}
