import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage = "";

  successMessage = "";
  signupdata: any

  secretKey = "Nelito";

  title = 'signupform';

  constructor(private signupserv: SignupService, private rout: Router) { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    // emailid: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });

  signupUser() {
    this.signupForm.value.password = this.encryptUsingAES256(this.signupForm.value.password);
    this.signupdata = {
      username: this.signupForm.value.username,
      password: this.encryptUsingAES256(this.signupForm.value.password),
      email: this.signupForm.value.email,
      phone: this.signupForm.value.phone
    }

    console.log(this.encryptUsingAES256(this.signupForm.value.password));


    this.signupserv.signupUser(this.signupForm.value).subscribe(data => {

      if ((data as any).respcode == 200) {

        this.successMessage = (data as any).respmsg;
        setTimeout(() => { this.rout.navigate(["/login"]); }, 3000);

        ;
      } else {
        this.errorMessage = (data as any).respmsg;
      }

    }, error => {
      console.log("error")
    })



  }

  get username() {
    return this.signupForm.get("username");
  }
  get password() {
    return this.signupForm.get("password");
  }
  get email() {
    return this.signupForm.get("email");
  }
  get phone() {
    return this.signupForm.get("phone");
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
