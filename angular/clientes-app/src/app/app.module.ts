import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


export const routes: Routes = [
  {path: '' , redirectTo: '/directivas' ,pathMatch: 'full'},
  {path: 'directivas' , component : DirectivaComponent},
  {path: 'clientes' ,  component : ClientesComponent},
  {path: 'clientes/formulario' ,  component : FormComponent},
  {path: 'clientes/formulario/:id' ,  component : FormComponent},
]

ClientesService
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
