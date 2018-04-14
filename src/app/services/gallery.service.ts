import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class GalleryService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  uploadPhoto(photo:any, folder){
    let tosent1 = new FormData();
    tosent1.append('photo',photo);
    tosent1.append('folder',folder);
    return this.http.post("https://api.omsaiacademy.com/gallery/uploadslider.php", tosent1, {responseType: 'text'});
  }

  getSliderList(){
  	return this.http.get("https://api.omsaiacademy.com/gallery/getsliderlist.php");
  }

  getOtherList(){
  	return this.http.get("https://api.omsaiacademy.com/gallery/getotherlist.php");
  }

  deleteSliderImg(img, folder){
  	let tosent1 = new FormData();
    tosent1.append('img',img);
    tosent1.append('folder',folder);
    return this.http.post("https://api.omsaiacademy.com/gallery/deletesliderimg.php", tosent1, {responseType: 'text'});
  }

}
