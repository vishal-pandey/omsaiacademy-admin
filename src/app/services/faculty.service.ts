import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class FacultyService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  getList(){
    return this.http.get("https://api.omsaiacademy.com/faculty/getlist.php");
  }

  getTeacher(id){
  	let tosent1 = new FormData();
    tosent1.append('id',id);  
  	return this.http.post("https://api.omsaiacademy.com/faculty/getteacher.php", tosent1, {responseType: 'text'});
  }

  updateTeacher(id, name, mobile, quali, about){
    let tosent1 = new FormData();
    tosent1.append('id',id); 
    tosent1.append('name',name); 
    tosent1.append('mobile',mobile); 
    tosent1.append('quali',quali); 
    tosent1.append('about',about); 
    return this.http.post("https://api.omsaiacademy.com/faculty/updateteacher.php", tosent1, {responseType: 'text'});
  }


  addTeacher(id, name, mobile, quali, about){
  	let tosent1 = new FormData();
    tosent1.append('name',name); 
    tosent1.append('mobile',mobile); 
    tosent1.append('quali',quali); 
    tosent1.append('about',about); 
  	return this.http.post("https://api.omsaiacademy.com/faculty/addteacher.php", tosent1, {responseType: 'text'});
  }

  deleteTeacher(id){
    let tosent1 = new FormData();
    tosent1.append('id',id);
    console.log(id);
    return this.http.post("https://api.omsaiacademy.com/faculty/deleteteacher.php", tosent1, {responseType: 'text'});    
  }

  uploadPhoto(photo:any, id:string){
    let tosent1 = new FormData();
    tosent1.append('id',id);
    tosent1.append('photo',photo);
    console.log(id);
    return this.http.post("https://api.omsaiacademy.com/faculty/upload.php", tosent1, {responseType: 'text'});
  }
  
}
