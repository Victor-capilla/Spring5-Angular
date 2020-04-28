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



@Injectable()
export class ClientesService {
  private urlEndPoint:string = 'http://localhost:8080/clientes';
  private httpHeaders = new HttpHeaders({'content-Type' : 'application/json'});
  constructor(private http: HttpClient , private router:Router ,
     public modalService :ModalService , public authService :AuthService) { }

  getClientes(page: number): Observable<any>{
    return this.http.get<any[]>(`${this.urlEndPoint}/pagina/${page}`).pipe(

    );
  }

  agregarAuthorizationHeader(){
    let token = this.authService.token;
    if (token!= null) {
      return this.httpHeaders.append('Authorization', 'Bearer '+token)
    }
    return this.httpHeaders;
  }

  isNotAuth(e): boolean{
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }


  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlEndPoint.replace("/clientes", "/regiones")}`, {headers :this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNotAuth(e);
        return throwError(e);
      })
    );
  }
//Devolvemos un observable de tipo Any para no que devuelva el map con todos los parametros del endpoint del backend
  postClientes(cliente : Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente , {headers :this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuth(e)) {
          return throwError(e);
        }
        if (e.status===400) {
          return throwError(e);
        }
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirfoto(archivo:File , id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id" , id);

    let httpHeaders = new HttpHeaders();
    let token = (this.authService.token)?this.authService.token:"";

    httpHeaders.append('Authorization', 'Bearer '+token)
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers:  httpHeaders
    });
    return this.http.request(req).pipe(
      catchError(e => {
        this.modalService.cerrar();
        this.isNotAuth(e);
        return throwError(e);
      })
    );
    /* .pipe(
      map((response : any) =>{
     return  response.cliente as Cliente;
      }),
      catchError(e => {
        if (e.status===400) {
          return throwError(e);
        }
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    ); */
  }
  getCliente(id): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`,{ headers :this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuth(e)) {
          return throwError(e);
        }
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  

  modificarCliente(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente , {headers :this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuth(e)) {
          return throwError(e);
        }
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deleteCliente(id): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers :this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuth(e)) {
          return throwError(e);
        }
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
