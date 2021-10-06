import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = "http://localhost:8080/api/view"
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  viewUser(user: any) {
    return this.http.post(url, user, httpOptions)

  }
}
