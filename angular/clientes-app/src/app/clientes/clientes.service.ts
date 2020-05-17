import { AuthService } from './../usuarios/auth.service';
import { ModalService } from './modal.service';
import { Region } from './region';
import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import  {Observable, of, throwError,  }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import  {catchError, map }  from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { routes } from '../app.module';
import { Usuario } from '../usuarios/usuario';



@Injectable()
export class ClientesService {
  private urlEndPoint:string = 'http://localhost:8080/clientes';
  constructor(private http: HttpClient , private router:Router ,
     public modalService :ModalService , public authService :AuthService) { }

  getClientes(page: number): Observable<any>{
    return this.http.get<any[]>(`${this.urlEndPoint}/pagina/${page}`)
  }

  isNotAuth(e): boolean{
    if (e.status == 401 ) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }else if( e.status == 403){
      Swal.fire(`No tienes permiso ${this.authService.usuario.username}`, e.error.mensaje, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlEndPoint.replace("/clientes", "/regiones")}`)
  }
//Devolvemos un observable de tipo Any para no que devuelva el map con todos los parametros del endpoint del backend
  postClientes(cliente : Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente )
  }

  subirfoto(archivo:File , id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id" , id);

    let token = this.authService.token;
  
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }
  getCliente(id): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`)
  }

  

  modificarCliente(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente );
  }

  deleteCliente(id): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`);
  }
}
