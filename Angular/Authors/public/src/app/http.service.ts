import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  create(data){
    // console.log("calling service.ts.create(name) name:", data);
    let newauthor = {name: data};
    // console.log(newauthor)

    return this._http.post("/authors", newauthor);
  }

  getAll(){
    console.log("calling service.ts.getAll():");
    return this._http.get("/authors");
  }

  del(id){
    console.log("Calling service.ts. del(id) id: ", id)
    return this._http.delete("/authors/"+id);
  }

  find(id){
    console.log("Calling service.ts. find(id) id: ", id)
    return this._http.get("/authors/"+id);
  }
  edit(data){
    console.log("Calling service.ts. edit(id) id: ", data)
    return this._http.put("/authors/"+data._id, data);
  }
}
