import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = "";

  secretKey = "Nelito";
  logindata: any
  title = 'Nelito';
  constructor(private loginservice: LoginService, private rout: Router) { }

  ngOnInit(): void {

  }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });
  loginUser() {
    this.logindata = {
      username: this.loginForm.value.password,
      password: this.encryptUsingAES256(this.loginForm.value.password)
    }
    console.log(this.encryptUsingAES256(this.loginForm.value.password))
    // console.log(this.decrypt(this.logindata.password))

    this.loginservice.loginUser(this.logindata).subscribe(data => {

      if ((data as any).respcode == 200) {
        sessionStorage.setItem("user", this.loginForm.value.username)
        this.rout.navigate(["/dashboard"]);

      }
      this.errorMessage = (data as any).respmsg;
    }, error => {
      console.log("error")
    })
  }
  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }


  encryptUsingAES256(value: string) {
    let _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

}

