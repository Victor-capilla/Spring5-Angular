import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ClientesService } from '../../clientes/clientes.service';
import  Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public authService: AuthService , public router:Router, public clienteService :ClientesService){

  }
  canActivate(
   
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = next.data['role'] as string;
    if (!this.authService.isAuthenticated() || this.authService.isExpiredToken()) {
      
      this.router.navigate(["/login"]);
      
      return false;
    }
    if (this.authService.hasRole(role)) {
      
      return true
    }
    Swal.fire(`No tienes permiso ${this.authService.usuario.username}`,  'warning');
    this.router.navigate(['/clientes']);
    return false;
  
  }


  
}
