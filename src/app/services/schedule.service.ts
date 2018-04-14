import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  getSchedule(){
  	return this.http.get("https://api.omsaiacademy.com/schedule/getschedule.php");
  }

  getTheSchedule(id){
  	let tosent1 = new FormData();
    tosent1.append('id',id); 
  	return this.http.post("https://api.omsaiacademy.com/schedule/gettheschedule.php", tosent1, {responseType: 'text'});
  }

  updateSchedule(id, batch, btime, day){
  	let tosent1 = new FormData();
    tosent1.append('id',id);
    tosent1.append('batch',batch);
    tosent1.append('btime',btime);
    tosent1.append('day',day);
    return this.http.post("https://api.omsaiacademy.com/schedule/updateschedule.php", tosent1, {responseType: 'text'});
  }

  deleteSchedule(id){
  	let tosent1 = new FormData();
    tosent1.append('id',id);
    return this.http.post("https://api.omsaiacademy.com/schedule/deleteschedule.php", tosent1, {responseType: 'text'});
  }

  addSchedule(batch, btime, day){
  	let tosent1 = new FormData();
    tosent1.append('batch',batch);
    tosent1.append('btime',btime);
    tosent1.append('day',day);
    return this.http.post("https://api.omsaiacademy.com/schedule/addschedule.php", tosent1, {responseType: 'text'});
  }
}
