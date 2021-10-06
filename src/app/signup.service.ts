import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = "http://localhost:8080/api/signup"
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signupUser(user: any) {
    return this.http.post(url, user, httpOptions)
  }
}
