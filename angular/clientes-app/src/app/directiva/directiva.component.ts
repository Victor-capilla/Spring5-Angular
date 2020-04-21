import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  listaCurso : String[]= ['java' , 'php' , 'javascript', 'angular', 'spring']
  desactivarCarta : boolean;
  constructor() {
    this.desactivarCarta = false;
   }

  ngOnInit(): void {
  }

  habilitarCarta() {
    if (this.desactivarCarta == true) {
      this.desactivarCarta = false;
    }else{
      this.desactivarCarta = true;
    }
    console.log("des :" +this.desactivarCarta);
  }
}
