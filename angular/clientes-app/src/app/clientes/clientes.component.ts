import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { ClientesService} from './clientes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientess => this.clientes = clientess
    );
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
