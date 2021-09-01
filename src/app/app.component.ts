import { Component } from '@angular/core';
import {MyConfig} from "./MyConfig";
import {IgraBrief} from "./IgraBrief";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {filter} from "rxjs/operators";
import {IgraDetaljiVM} from "./IgraDetaljiVM";
import {LoginVM} from "./LoginVM";
import {AutentifikcijaLoginResultVM} from "./AutentifikcijaLoginResultVM";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string;
  user:LoginVM;
  loginToken:string;
  showRouting:boolean=false;

  constructor(private http:HttpClient) {
    this.user=new LoginVM();
    this.user.username="";
    this.user.password="";

    var token=localStorage.getItem("loginToken");
    if(token!=undefined)
      this.showRouting=true;
  }
  Show(){
    this.showRouting=true;
  }
  Login(){
    var url=MyConfig.webAppUrl+"/AutentifikacijaAngular/Login";
    const headerDict = {
      'Content-Type': 'application/json'
    };
    const requestOptions = {
      headers: new HttpHeaders (headerDict),
    };
    var body = JSON.stringify(this.user);
    this.http.post<AutentifikcijaLoginResultVM>(url, body, requestOptions).subscribe((result)=>{
      localStorage.setItem("loginToken", result.tokenString);
      this.showRouting=true;
    },error=>{
      localStorage.clear();
      this.showRouting=false;
      alert("Pogresan username ili password");
    });
  }
  Logout(){
    localStorage.clear();
    this.showRouting=false;
  }
  public BackToAuth(){
    this.showRouting=false;
  }
}
