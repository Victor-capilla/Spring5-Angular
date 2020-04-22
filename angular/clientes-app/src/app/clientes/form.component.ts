import { Region } from './region';
import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import * as $ from 'jquery';





@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo : string = "crear cliente";
  public patron : string = "(0?[1-9]|1[0-9]|2[0-9]|3[01])/(0?[1-9]|1[012])/[0-9]{4}"
  public errores: string[];
  public regiones: Region[];
  constructor(private clienteService : ClientesService ,private router: Router, private activatedRouter :ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.cargarCliente()
    this.cargarRegiones()
  }
  public crear():void {
    this.clienteService.postClientes(this.cliente).subscribe(
      
      paramsOfEndPoint => {
        console.log(paramsOfEndPoint.cliente as Cliente);
        this.router.navigate(["/clientes"])
        swal.fire('Nuevo cliente', `El Cliente ${paramsOfEndPoint.cliente.nombre} ha sido  creado con exito!  `, 'success');
    },
      err => {
        this.errores = err.error.errores as string[];
        console.error("Codigo del error desde el backend :" +err.status)
        console.error(this.errores)
      },
    );

  }

  public cargarCliente():void {
   this.activatedRouter.params.subscribe(
    cliente => {
       let id = cliente['id']
       if (id) {
         this.clienteService.getCliente(id).subscribe(
           cliente => this.cliente = cliente
         )
       }
     }
   )}

   public cargarRegiones():void {
          this.clienteService.getRegiones().subscribe(
            regiones => {this.regiones =regiones as Region[]
              console.log(regiones);}
   )}

   public modificarCliente(): void {
    this.clienteService.modificarCliente(this.cliente).subscribe(
      paramsOfEndPoint => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente Actualizado' , paramsOfEndPoint["cliente"].nombre +  ' Ha sido modificado' ,'success')
      }
    )
  }

  compararRegion(o1:Region , o2:Region):boolean {
    return o1 == null|| o2 ==null ? false : o1.id ===o2.id;
  }
}
