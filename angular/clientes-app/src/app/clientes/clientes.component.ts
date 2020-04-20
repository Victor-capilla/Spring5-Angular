import { ModalService } from './modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente} from './cliente';
import { ClientesService} from './clientes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  clienteSeleccionado : Cliente;
  paginador : any;
  constructor(private clienteService: ClientesService , private activatedRoute: ActivatedRoute ,public modalService: ModalService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page:number = params.get('page')?.length>0 ? +params.get('page') :0;
      this.clienteService.getClientes(page).subscribe(
      response => {
        console.log(response)
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      }
      )
     }
    )
  }

  seleccionarCliente(cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrir;
    console.log(cliente);
  }

  eliminarCliente(cliente : Cliente): void {
    console.log(cliente.nombre);
        Swal.fire({
          title: `¿Estas seguro que quieres eliminar al cliente ${cliente.nombre} ?`,
          text: "No podras revertir esta accion",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar!'
        }).then((result) => {
          if (result.value) {
            this.clienteService.deleteCliente(cliente.id).subscribe(
              response => {
                this.clientes = this.clientes.filter(cli => cli!== cliente)
                Swal.fire(
                  'Eliminado!',
                  `El cliente ${cliente.nombre} ha sido eliminado`,
                  'success'
                )
              }
            )
          }
        })
      }

}
