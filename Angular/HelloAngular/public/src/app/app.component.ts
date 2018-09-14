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
  display_task = false;

  constructor(private _httpService: HttpService){
  }

  // ngOnInIt will run when the component is initialized, after the constructor method
  ngOnInit(){
    // this.getTaskFromService();
  }
  getTaskFromService(){
    let observable = this._httpService.getTask();
    observable.subscribe(data =>{
      console.log("Got our data!", data);
      this.tasks = data;
    })
  }
  getTaskByID(id){
    let observable = this._httpService.getTaskID(id);
    observable.subscribe(data =>{
      console.log("Got our taskbyID data!", data);
      this.secTask = data
      console.log("secTask: ", this.secTask);
    })
  }
  task_desc(){
    console.log("this.display_task: ", this.display_task);
    if(this.display_task == true){
      this.display_task = false;
    }else{
    this.display_task = true;
    }
  }
}
