import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MyConfig} from "../MyConfig";
import {IgraDetaljiVM} from "../IgraDetaljiVM";
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  apiUrl:string;

  constructor(private http:HttpClient) { }


  UploadGame(igraId, naziv, opis, cijena, linkIgre, trailerUrl, zanr, file):Observable<any> {
    var tokenTest = localStorage.getItem('loginToken');
    var token = tokenTest !== null ? tokenTest : '{}';

    const formData = new FormData();
    if(igraId!=undefined)
      formData.append("igraId", igraId);
    formData.append("naziv", naziv);
    formData.append("opis", opis);
    formData.append("cijena", cijena);
    formData.append("linkIgre", linkIgre);
    formData.append("trailerUrl", trailerUrl);
    formData.append("zanr", zanr.zanrId);

    if(file!=undefined)
      formData.append("slikaUpload", file, file.name);

    let headers = new HttpHeaders({
      'MojAutentifikacijaToken':token
    });
    let options = { headers: headers };
    return this.http.post(MyConfig.webAppUrl+"/GamesAngular/UploadGame", formData, options);
  }

}
