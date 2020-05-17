export class Token {
}
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ClientesService } from '../../clientes/clientes.service';
import Swal from 'sweetalert2';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class EnterInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, public router: Router
    , public clientesService: ClientesService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        } else if (e.status == 403) {
          Swal.fire(`No tienes permiso ${this.authService.usuario.username}`, e.error.mensaje, 'warning');
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      }
      )
    );
  }
}