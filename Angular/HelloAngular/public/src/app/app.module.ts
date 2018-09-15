import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//registering the "Http" service, then add to the providers array
import { HttpService } from './http.service';
import { AppComponent } from './app.component';
//set up HttpClient so it can make http requests - then add to the imports array
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'; // <--import forms momdule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
