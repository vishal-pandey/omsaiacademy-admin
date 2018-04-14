import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class DownloadService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  getFileList(folder){
  	let tosent1 = new FormData();
    tosent1.append('folder',folder);  
  	return this.http.post("https://api.omsaiacademy.com/download/getfilelist.php", tosent1, {responseType: 'json'});
  }

  uploadFile(file:any, folder){
  	let tosent1 = new FormData();
    tosent1.append('folder',folder);  
    tosent1.append('file',file);  
  	return this.http.post("https://api.omsaiacademy.com/download/upload.php", tosent1, {responseType: 'text'});
  }

  deleteFile(file:any, folder){
  	let tosent1 = new FormData();
    tosent1.append('folder',folder);  
    tosent1.append('file',file);  
  	return this.http.post("https://api.omsaiacademy.com/download/delete.php", tosent1, {responseType: 'text'});
  }

}

