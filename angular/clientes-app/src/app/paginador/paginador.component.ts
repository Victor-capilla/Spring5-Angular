import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';


@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit ,OnChanges {

  constructor( private router: Router) { }
  @Input()paginador: any;
  pagina : number;
  pagesTotal: number;
  ngOnInit(): void {
  }
  ngOnChanges(){
    this.pagina = this.paginador.pageable.pageNumber
    this.pagesTotal = this.paginador.totalPages -1
  }
}
