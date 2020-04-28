import { ModalService } from './../modal.service';
import { timer } from 'rxjs';
import swal  from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from './../clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @ViewChild("modal")padre:ElementRef;
  @ViewChild("modal-body")hijo :ElementRef;

  @Input()  cliente: Cliente
  public titulo : string = "subir foto";
  public archivo: File;
  public progres: number = 0;
  public ruta: string ="http://localhost:8181/uploads/img/";
  constructor(private clientesService : ClientesService , public modalService : ModalService , public renderer :Renderer2) {

   }

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
            this.modalService.notificarUpload.emit(event.body["cliente"]);
            swal.fire("Se ha subido la foto con exito", `la foto subido es ` , "success")
            this.ruta = this.ruta + event.body["cliente"].foto;
            setTimeout(() => {
              this.progres = 0;
            }, 1500);
            }
      },
      err => {
        swal.fire('Error al subir la foto', "", 'error');
        this.cerrarModal()

      }
      )
    }
  }

  cerrarModal(){
    this.archivo = null;
    this.progres = 0 ;
    if (this.padre == null) {
      console.log("padre unde")
    }
    if (this.hijo == null) {
      console.log("hi unde")
    }

  }
}
