import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(){
  }

}
