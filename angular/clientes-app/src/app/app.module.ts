import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesService } from './clientes/clientes.service';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './clientes/form.component';
import {FormsModule } from '@angular/forms';
import  localeES from '@angular/common/locales/es';
import { registerLocaleData} from '@angular/common';
import { PaginadorComponent } from './paginador/paginador.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMomentDateModule} from '@angular/material-moment-adapter'


registerLocaleData(localeES , 'es');


export const routes: Routes = [
  {path: '' , redirectTo: '/directivas' ,pathMatch: 'full'},
  {path: 'directivas' , component : DirectivaComponent},
  {path: 'clientes' ,  component : ClientesComponent},
  {path: 'clientes/pagina/:page' ,  component : ClientesComponent},
  {path: 'clientes/formulario' ,  component : FormComponent},
  {path: 'clientes/formulario/:id' ,  component : FormComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginadorComponent,
  ],
  exports: [
    MatFormFieldModule, 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule
  ],
  providers: [ClientesService ,{provide: LOCALE_ID , useValue:('es')}],
  bootstrap: [AppComponent]
})
export class AppModule { }
