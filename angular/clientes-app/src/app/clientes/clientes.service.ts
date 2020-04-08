import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente} from './cliente';
import  {Observable, of}  from 'rxjs';


@Injectable()
export class ClientesService {
  constructor() { }

  getClientes(): Observable<Cliente[]>{
    return of(CLIENTES);
  }
}
