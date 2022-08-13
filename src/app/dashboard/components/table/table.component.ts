import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  newModal = true;

  updateForm : FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    image: new FormControl('',Validators.required),
    attack: new FormControl('',Validators.required),
    defense: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    hp: new FormControl('',Validators.required),
  })


  newForm : FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    image: new FormControl('',Validators.required),
    attack: new FormControl('',Validators.required),
    defense: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    hp: new FormControl('',Validators.required),
  })

  constructor( private _tableService : TableService) { }

  ngOnInit(){
    this.getAllPokemons()
  }


  /**
   * Funcion para obtener los pokemones de la DB
   */
  getAllPokemons() {
    this._tableService.getAllPokemons()
    .subscribe((data:any) => {
      this.pokemons = data
    })
  }

  /**
   * Funcion para abrir el modal de update de un pokemon
   */
  openUpdateModal(pokemon:any) {
    this.updateModal = !this.updateModal
    console.log(pokemon)
    console.log(this.updateForm)
  }

  /**
   * Funcion para hacer la peticion de hacer update de un pokemon
   */

  updatePokemon() {
    console.log("Actualizamos pokemon")
    console.log('alo?S')
  }

  closeUpdateModal() {
    this.updateModal = false
  }

   /**
   * Funcion para abrir el modal de update de un pokemon
   */
    openNewModal() {
      this.newModal = !this.newModal
    }
  

  /**
   * Funcion para abrir el modal de create de un pokemon
   */

  deletePokemon(id:string) {
    console.log(`Borramos pokemon con id ${id}`)
  }


}
