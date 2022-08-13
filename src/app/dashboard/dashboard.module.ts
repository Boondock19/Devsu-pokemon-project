import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';
import { NewPokemonComponent } from './components/new-pokemon/new-pokemon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent,
    NewPokemonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
})
export class DashboardModule { }
