import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlEndPoint:string = 'http://localhost:8080/oauth/token';
  private credenciales = btoa('angularapp'+ ':'+ '12345');
  private httpHeaders = new HttpHeaders({'content-Type' : 'application/x-www-form-urlencoded',
  'Authorization': 'Basic '+this.credenciales});
  private params = new URLSearchParams();
 
  constructor(private http: HttpClient , private router:Router ) { }

  login(usuario : Usuario):Observable<any>{
    this.params.set('grant_type' ,'password')
    this.params.set('username' , usuario.username)
    this.params.set('password', usuario.password)
   return this.http.post<any>(this.urlEndPoint, this.params.toString() , {headers: this.httpHeaders})
  }
}
