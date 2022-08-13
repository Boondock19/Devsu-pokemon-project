import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

   // Columnas con nombre y fields a traerse del backend
  columns = [
    {field: 'name', caption: 'Nombre'},
    {field: 'image', caption: 'Imagen'}, 
    {field: 'attack', caption: 'Ataque'}, 
    {field: 'defense', caption: 'Defensa'},  
  ]

  faMagnifyingGlass = faMagnifyingGlass;

  constructor() { }

  ngOnInit(){
  }

}
