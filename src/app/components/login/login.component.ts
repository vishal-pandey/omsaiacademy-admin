import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	message:string;
  constructor(
    public authService: AuthService, 
    public router: Router, 
    private cookieService:CookieService 
    ) 
  {
  	this.message = "Log In";
    if (this.authService.isLoggedInn()) {
      this.router.navigate(['/admin']);
    }
  }
  
  key:any;
  config: Config;

  login(id:any, pwd:any) {
    this.message = "Loggin in ... ";
    this.authService.getLogin(id,pwd).subscribe((data) => {
      this.config = { ...data }
      if (this.config.key == 'success') {
        this.message = "Logged In";
        this.cookieService.set("admin",this.config.value,360000,"/");
        // this.router.navigate(['/']);
        window.location.href = "./";
      }else{
        this.message = this.config.key;
      }

    })
  }

  ngOnInit() {
  }

}

export interface Config {
  key: string;
  value: string;
}
