import { ModalService } from './clientes/modal.service';
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
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component'


registerLocaleData(localeES , 'es');


export const routes: Routes = [
  {path: '' , redirectTo: '/login' ,pathMatch: 'full'},
  {path: 'directivas' , component : DirectivaComponent},
  {path: 'clientes' ,  component : ClientesComponent},
  {path: 'clientes/pagina/:page' ,  component : ClientesComponent},
  {path: 'clientes/formulario' ,  component : FormComponent},
  {path: 'clientes/formulario/:id' ,  component : FormComponent},
  {path: 'login' ,  component : LoginComponent},
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
    DetalleComponent,
    LoginComponent,
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
  providers: [ClientesService ,{provide: LOCALE_ID , useValue:('es')},ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
