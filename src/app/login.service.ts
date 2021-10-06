import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = "http://localhost:8080/api/login"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post(url, user, httpOptions)

  }
}
