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
  newTask: any; 
  editTask: any;

  constructor(private _httpService: HttpService){
  }

  // ngOnInIt will run when the component is initialized, after the constructor method
  ngOnInit(){
    // this.getTaskFromService();
    this.newTask = {title:"", description:""}
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

  onSubmit(){
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data =>{
      console.log("CREATED tasks, testing here's response from server:",data);
    })
    // this.newTask = {title: "", description:""}
  }

  //this is used track which user we're to edit and to re-populate our edit-form
  recall_id(data){
    this.secTask = data;
    this.editTask = {title:this.secTask.title, description:this.secTask.description, completed:this.secTask.completed, id:this.secTask._id}
    console.log("this.secTask",this.secTask)
  }

  onEdit(){
    console.log("In component.ts/onEdit: this.editTask: ", this.editTask)
    let observable = this._httpService.updateTask(this.editTask);
    observable.subscribe(data =>{
      console.log("EDITING tasks, testing here's response from server:",data);
    })
  }

  onDelete(data){
    console.log("At app.component.ts under method onDelete(data), data: ", data)
    let observable = this._httpService.deleteTask(data);
    observable.subscribe(data =>{
      console.log("Completed delete, display server response:",data);
      this.getTaskFromService();
    })
  }

  do(event){
    console.log(event)
  }
}
