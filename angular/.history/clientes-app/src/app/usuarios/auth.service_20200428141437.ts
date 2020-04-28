import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlEndPoint:string = 'http://localhost:8080/oauth/token';
  private credenciales = btoa('angularapp'+ ':'+ '12345');
  private httpHeaders = new HttpHeaders({'content-Type' : 'application/x-www-form-urlencoded',
  'Authorization': 'Basic '+this.credenciales});
  private params = new URLSearchParams();
  private _token: string;
  private _usuario: Usuario;
  constructor(private http: HttpClient , private router:Router ) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem('usuario')) {
      return  JSON.parse(sessionStorage.getItem('usuario')) as Usuario
    }
    return new Usuario();
  }
  public set usuario(value: Usuario) {
    this._usuario = value;
  }public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token')) {
      return  JSON.parse(sessionStorage.getItem('token'))
    }
    return null;
  }
  public set token(value: string) {
    this._token = value;
  }

  login(usuario : Usuario):Observable<any>{
    this.params.set('grant_type' ,'password')
    this.params.set('username' , usuario.username)
    this.params.set('password', usuario.password)
   return this.http.post<any>(this.urlEndPoint, this.params.toString() , {headers: this.httpHeaders})
  }

  guardarUsuario(accessToken :string){
    this.guardarToken(accessToken);
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.username;
    this._usuario.apellido = payload.apellido;
    this._usuario.email =payload.email;
    this._usuario.nombre = payload.nombre;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario))
    sessionStorage.setItem('token', JSON.stringify(this._token))

  }
  obtenerDatosToken(token : string):any{
    if (token !=null) {
      return JSON.parse(atob(token.split('.')[1]))
    }
    return null;
  }

  guardarToken(accessToken){
    this._token = accessToken;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this._token);
    console.log(this._token)
    console.log(payload)
    if (payload && payload.user_name) {
      console.log("true")
      return true
    }
    console.log("false")
     return false
  }

  logout(){
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
