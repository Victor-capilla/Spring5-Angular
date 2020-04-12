import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente} from './cliente';
import  {Observable, of}  from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'


@Injectable()
export class ClientesService {
  private urlEndPoint:string = 'http://localhost:8181/api/clientes';
  private httpHeaders = new HttpHeaders({'content-Type' : 'application/json'});
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  postClientes(cliente : Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente , {headers :this.httpHeaders});
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  modificarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente , {headers: this.httpHeaders});
  }

  deleteCliente(id): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,);
  }
}
