import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import  Swal  from 'sweetalert2';
import { Usuario } from './usuario';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnChanges{

  titulo: string ="por favor logueate para entrar o registrate";
  usuario:Usuario;
  constructor(private authService :AuthService ,private router:Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login() {
    console.log("usuario :" +this.usuario)
    if (this.usuario.username == null || this.usuario.password ==null) {
      Swal.fire('Error' , 'el usuario debe ingresar sus credenciales' , 'error');
    }else{
      this.authService.login(this.usuario).subscribe(
        response => {
          console.log(response)
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          let Usuario = this.authService.usuario;
          this.router.navigate(['/clientes'])
          Swal.fire('Bienvenido!!', (this.usuario)?this.usuario.username:Usuario.username , 'success');
        },
        err =>{
          console.error(err.error.error)
          Swal.fire('Error','Datos incorrectos', 'error')
        }
      )
    }
  }
  ngOnChanges():void{
    console.log(this.usuario)
  }

}
