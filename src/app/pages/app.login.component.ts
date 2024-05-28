import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {
  constructor(private route: Router) { }
  ngOnInit(): void {

  }


  signIn() {
    this.route.navigate(['/piechart'])
  }
}
