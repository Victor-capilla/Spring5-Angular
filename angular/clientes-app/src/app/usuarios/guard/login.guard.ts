import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ClientesService } from '../../clientes/clientes.service';
import Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public authService: AuthService , public router:Router, public clienteService :ClientesService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  if(this.authService.isAuthenticated() && !this.authService.isExpiredToken() ){
    Swal.fire( '', 'ya tenias la sesion guardada '+this.authService.usuario.username ,'info');
      this.router.navigate(["/clientes"]);
     }
    return true;
  }
  
}
