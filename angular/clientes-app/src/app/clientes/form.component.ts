import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';





@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo : string = "crear cliente";
  constructor(private clienteService : ClientesService ,private router: Router, private activatedRouter :ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.cargarCliente()
  }
  public crear():void {
    this.clienteService.postClientes(this.cliente).subscribe(
      paramsOfEndPoint => {
        this.router.navigate(["/clientes"])
        swal.fire('Nuevo cliente', `El Cliente ${paramsOfEndPoint.cliente.nombre} ha sido  creado con exito!  `, 'success');
    });

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

   public modificarCliente(): void {
    this.clienteService.modificarCliente(this.cliente).subscribe(
      paramsOfEndPoint => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente Actualizado' , paramsOfEndPoint["cliente"].nombre +  ' Ha sido modificado' ,'success')
      }
    )
  }
}
