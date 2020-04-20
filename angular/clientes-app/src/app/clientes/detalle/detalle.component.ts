import { ModalService } from './../modal.service';
import { timer } from 'rxjs';
import swal  from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from './../clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input()  cliente: Cliente
  public titulo : string = "subir foto";
  public archivo: File;
  public progres: number = 0;
  public ruta: string ="http://localhost:8181/uploads/img/";
  constructor(private clientesService : ClientesService , private modalService : ModalService) { }

  ngOnInit(): void {
    this.ruta += this.cliente.foto;
  }
  seleccionarFoto(event){
    this.archivo = event.target.files[0];
    if (this.archivo.type.indexOf('image') <0) {
      swal.fire("Error : debe seleccionar un formato que sea tipo imagen por ejemplo: ", "PNG, JPG, JPEG", "error")
      this.archivo = null;
    }

  }

  subirFoto(){
   if (!this.archivo) {
     swal.fire("Error : debe seleccionar una foto ", "", "error")
    }else{
      this.clientesService.subirfoto(this.archivo, this.cliente.id).subscribe(
        event =>{
          if (event.type === HttpEventType.UploadProgress) {
            this.progres = Math.round((event.loaded / event.total)*100);
          }else if (event.type === HttpEventType.Response){
            this.cliente = event.body["cliente"] as Cliente;
            swal.fire("Se ha subido la foto con exito", `la foto subido es ` , "success")
            this.ruta = this.ruta + event.body["cliente"].foto;
            setTimeout(() => {
              this.progres = 0;
            }, 1500);
            }
      })
    }
  }

  cerrarModal(){
    this.modalService.cerrar();
    this.archivo = null;
    this.progres = 0 ;
  }
}
