import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  res:any;

  constructor(private http: HttpClient,
    private cookieService: CookieService) {

  }  

  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  getLogin(id:any, pwd:any){
    let toSend={
      id: id,
      pwd: pwd
    }
    return this.http.post<Config>('https://api.omsaiacademy.com/login/',toSend, {responseType: 'json'});
  }

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    // this.isLoggedIn = false;
    this.cookieService.delete('admin','/');
  }

  isLoggedInn(): boolean{
    if (this.cookieService.check("admin")) {
      return true;
    }else{
      return false;
    }
  }


}

export interface Config {
  key: string;
  value: string;
}

