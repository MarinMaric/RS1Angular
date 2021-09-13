import { Component, OnInit } from '@angular/core';
import {IgraBrief} from "../IgraBrief";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MyConfig} from "../MyConfig";

@Component({
  selector: 'app-view-games',
  templateUrl: './view-games.component.html',
  styleUrls: ['./view-games.component.css']
})
export class ViewGamesComponent implements OnInit {

  igre:IgraBrief[];
  title:string;
  currentPage:number;
  colSize:number;
  itemsPerPage:number=5;
  filterNaziv:string="";

  constructor(private http:HttpClient) {
  }
  ngOnInit(): void {
    this.ViewGames();
  }

  ViewGames(){
    let url:string = MyConfig.webAppUrl + "/GamesAngular/ViewGamesJson";
    var tokenTest = localStorage.getItem('loginToken');
    var token = tokenTest !== null ? tokenTest : '{}';

    if(this.currentPage!=0)
      url+="?currentPage="+this.currentPage+"&itemsPerPage="+this.itemsPerPage+"&filter="+this.filterNaziv;

    const headerDict = {
      'Content-Type': 'application/json',
      'MojAutentifikacijaToken': token
    };

    const requestOptions = {
      headers: new HttpHeaders (headerDict),
    };
    this.http.get<number>(MyConfig.webAppUrl+"/GamesAngular/CollectionSize?filter="+this.filterNaziv, requestOptions).subscribe((result:number)=>{
      this.colSize=result;
    })
    this.http.get<IgraBrief[]>(url, requestOptions).subscribe((result:IgraBrief[])=>{
      this.igre=result;
    });
  }


  EditGame(i:IgraBrief){}
  DeleteGame(i:IgraBrief){
    this.http.get(MyConfig.webAppUrl+'/GamesAngular/DeleteGame?igraID='+i.igraId).subscribe((result)=>{
      var indexOf=this.igre.indexOf(i);
      this.igre.splice(indexOf, 1);
    });
  }

  loadPage($event:any){
    this.ViewGames();
  }
  filterGames():Array<IgraBrief>{
    //if(this.filterNaziv!="")
      //return this.igre.filter(x=>x.naziv.includes(this.filterNaziv))
    //else
    return this.igre;
  }

  SearchButton(){
    this.currentPage=1;
    this.ViewGames();
  }

}
