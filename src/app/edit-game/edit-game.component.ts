import {Component, Input, OnInit} from '@angular/core';
import {ZanrDropdownVM} from "../ZanrDropdownVM";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {FileUploadService} from "../game-details/file-upload.service";
import {MyConfig} from "../MyConfig";
import {IgraDetaljiVM} from "../IgraDetaljiVM";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  @Input() igraID:number;

  shortLink: string="";
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
    this.zanr=new ZanrDropdownVM();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params =>
      this.igraID = Number(params.get('igraID'))
    )

    this.GetZanrovi();

    if(this.igraID!=undefined)
      this.InitializeParameters();
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
      this.fileUploadService.UploadGame(this.igraID, this.naziv, this.opis, this.cijena, this.linkIgre, this.trailerUrl, this.zanr, this.file).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {

            this.loading = false;
          }
        }
      );
    }
  }

  GetZanrovi(){
    this.http.get<ZanrDropdownVM[]>(MyConfig.webAppUrl+'/GamesAngular/GetZanroviJson').subscribe((result:ZanrDropdownVM[])=>{
      this.zanrovi=result;
    });
  }
  InitializeParameters(){
    this.http.get<IgraDetaljiVM>(MyConfig.webAppUrl+'/GamesAngular/GameDetailsJson?igraID='+this.igraID).subscribe((result:IgraDetaljiVM)=>{
      this.naziv=result.naziv;
      this.opis=result.opis;
      this.cijena=result.cijena;
      this.linkIgre=result.linkIgre;
      this.trailerUrl=result.trailerUrl;
      this.slikaPrikaz=result.slikaPrikaz;
      this.zanr=new ZanrDropdownVM();
      this.zanr.zanrId=result.zanrValue;
      this.zanr.naziv=result.zanr;

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
