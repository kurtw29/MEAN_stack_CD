import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN ';
  tasks;
  secTask: any;

  constructor(private _httpService: HttpService){
  }

  // ngOnInIt will run when the component is initialized, after the constructor method
  ngOnInit(){
    this.getTaskFromService();
  }
  getTaskFromService(){
    let observable = this._httpService.getTask();
    observable.subscribe(data =>{
      console.log("Got our data!", data);
      this.tasks = data;
      this.secTask = data[1]
    })
  }
}
