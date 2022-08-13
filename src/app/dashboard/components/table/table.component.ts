import { Component, OnInit } from '@angular/core';
import { faFloppyDisk, faMagnifyingGlass, faPenToSquare, faPlus, faTrashCanArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
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

  // simbolos de fontAwesome
  faMagnifyingGlass = faMagnifyingGlass;
  faPenToSquare = faPenToSquare;
  faTrashCanArrowUp = faTrashCanArrowUp;
  faPlus = faPlus;
  faFloppyDisk = faFloppyDisk;
  faxMark = faXmark;

  // Todos los pokemons de la DB
  pokemons: any[] = []


  updateModal = false;
  newModal = false;

  constructor( private _tableService : TableService) { }

  ngOnInit(){
    this.getAllPokemons()
    console.log(this.pokemons)
  }


  /**
   * Funcion para obtener los pokemones de la DB
   */
  getAllPokemons() {
    this._tableService.getAllPokemons()
    .subscribe((data:any) => {
      this.pokemons = data
      console.log(this.pokemons)
    })
  }

  /**
   * Funcion para abrir el modal de update de un pokemon
   */
  openUpdateModal() {
    console.log("Abrimos modal de update")
  }

  /**
   * Funcion para hacer la peticion de hacer update de un pokemon
   */

  updatePokemon() {
    console.log("Actualizamos pokemon")
  }
  

  /**
   * Funcion para abrir el modal de create de un pokemon
   */

  deletePokemon(id:string) {
    console.log(`Borramos pokemon con id ${id}`)
  }


}
