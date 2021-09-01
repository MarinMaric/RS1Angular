import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {IgraDetaljiVM} from "../IgraDetaljiVM";
import {MyConfig} from "../MyConfig";
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  @Input() igraID:number;
  igraDetalji:IgraDetaljiVM;

  constructor(private http:HttpClient, private route:ActivatedRoute, private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params =>
      this.igraID = Number(params.get('igraID'))
    )
    this.GameDetails();
  }
  GameDetails(){
    this.http.get<IgraDetaljiVM>(MyConfig.webAppUrl+'/GamesAngular/GameDetailsJson?igraID='+this.igraID).subscribe((result:IgraDetaljiVM)=>{
      this.igraDetalji=result;
    });
  }
}
