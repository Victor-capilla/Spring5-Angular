import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean = false;
  constructor(public authService : AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isAuth = true;
    }
  }

}
