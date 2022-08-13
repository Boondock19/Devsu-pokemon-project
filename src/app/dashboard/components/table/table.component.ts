import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faPenToSquare, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TableService } from '../../services/table.service';

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
  faPenToSquare = faPenToSquare;
  faTrashCanArrowUp = faTrashCanArrowUp;

  pokemons: any[] = []

  constructor( private _tableService : TableService) { }

  ngOnInit(){
    this.getAllPokemons()
    console.log(this.pokemons)
  }


  getAllPokemons() {
    this._tableService.getAllPokemons()
    .subscribe((data:any) => {
      this.pokemons = data
      console.log(this.pokemons)
    })
  }
}
