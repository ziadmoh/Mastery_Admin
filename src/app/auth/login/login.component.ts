import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private nav:HeaderService) { }

  loginForm!:FormGroup; 
  showHidePass:boolean = false;
  ngOnInit(): void {
    this.nav.hide();
    this.loginForm = new FormGroup({
      "emailOrUserName": new FormControl(null,Validators.required),
      "password": new FormControl(null,Validators.required)
    })
  }
  showHidePassword(){
    this.showHidePass = !this.showHidePass
  }


  onLogin(){

  }
}
