import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dbservice: DashboardService, private rout: Router) { }

  tabledata: any;
  errorMessage = "";
  username = sessionStorage.getItem("user")
  ngOnInit(): void {
    this.dashboardUser();
  }
  dashboardUser() {

    this.dbservice.viewUser(JSON.stringify({
      username: sessionStorage.getItem("user")
    })).subscribe(data => {
      if ((data as any).respcode == 200) {
        console.log(data)
        this.tabledata = (data as any).resultset;
        console.log(this.tabledata);
      }
      this.errorMessage = (data as any).respmsg;

    })

  }

}
