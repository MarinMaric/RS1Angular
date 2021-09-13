import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {FileUploadService} from "../game-details/file-upload.service";
import {IgraDetaljiVM} from "../IgraDetaljiVM";
import {MyConfig} from "../MyConfig";
import {ZanrDropdownVM} from "../ZanrDropdownVM";

@Component({
  selector: 'app-upload-game',
  templateUrl: './upload-game.component.html',
  styleUrls: ['./upload-game.component.css']
})
export class UploadGameComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false;
  file:File;
  naziv:string;
  opis:string;
  cijena:number;
  linkIgre:string;
  trailerUrl:string;
  slikaPrikaz:string;

  showError:boolean;

  zanrovi:ZanrDropdownVM[];
  zanr:ZanrDropdownVM;

  apiUrl:string;

  constructor(private http:HttpClient, private route:ActivatedRoute, private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.GetZanrovi();
  }

  zanrChange(event) {
    this.zanr = event.target.files[0];
  }
  imageUpload(event) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;

    if(!this.Validate()){
      this.fileUploadService.UploadGame(null, this.naziv, this.opis, this.cijena, this.linkIgre, this.trailerUrl, this.zanr, this.file).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {

            // Short link via api response
            this.shortLink = event.link;

            this.loading = false; // Flag variable
          }
        },
        error => {
            alert("Naziv igre je zauzet");
        }
      );
    }
  }

  GetZanrovi(){
    this.http.get<ZanrDropdownVM[]>(MyConfig.webAppUrl+'/GamesAngular/GetZanroviJson').subscribe((result:ZanrDropdownVM[])=>{
      this.zanrovi=result;
    });
  }

  Validate():boolean{
    if(this.naziv==undefined || this.naziv=="")
      this.showError=true;
    else if(this.opis==undefined || this.opis=="")
      this.showError=true;
    else if(this.cijena==undefined || this.cijena<0)
      this.showError=true;
    else if(this.linkIgre==undefined || this.linkIgre=="")
      this.showError=true;
    else if(this.trailerUrl==undefined || this.trailerUrl=="")
      this.showError=true;
    else if(this.zanr==undefined)
      this.showError=true;
    else this.showError=false;

    return this.showError;
  }

}
