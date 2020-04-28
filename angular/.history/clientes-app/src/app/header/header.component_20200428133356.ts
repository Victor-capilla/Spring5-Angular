import { AuthService } from './../../../../.history/clientes-app/src/app/usuarios/auth.service_20200428125130';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean = false;
  constructor(public authService : AuthService) { }

  ngOnInit(): void {
    if (this.authService.) {
      
    }
  }

}
