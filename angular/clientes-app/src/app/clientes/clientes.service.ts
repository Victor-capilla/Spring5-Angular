import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente} from './cliente';
import  {Observable, of}  from 'rxjs';
import { HttpClient} from '@angular/common/http'


@Injectable()
export class ClientesService {
  private urlEndPoint:string = 'http://localhost:8181/api/clientes'
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    console.log(this.http.get<Cliente[]>(this.urlEndPoint));
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}
