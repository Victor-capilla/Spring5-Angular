import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente} from './cliente';
import  {Observable, of, throwError }  from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import  {catchError }  from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { routes } from '../app.module';




@Injectable()
export class ClientesService {
  private urlEndPoint:string = 'http://localhost:8181/api/clientes';
  private httpHeaders = new HttpHeaders({'content-Type' : 'application/json'});
  constructor(private http: HttpClient , private router:Router) { }

  getClientes(): Observable<any[]>{
    return this.http.get<any[]>(this.urlEndPoint);
  }
//Devolvemos un observable de tipo Any para no que devuelva el map con todos los parametros del endpoint del backend
  postClientes(cliente : Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente , {headers :this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error no existe el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  modificarCliente(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente , {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deleteCliente(id): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(["/clientes"])
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
