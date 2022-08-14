import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faFloppyDisk,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrashCanArrowUp,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  // Columnas con nombre y fields a traerse del backend
  columns = [
    { field: 'name', caption: 'Nombre' },
    { field: 'image', caption: 'Imagen' },
    { field: 'type', caption: 'Tipo' },
    { field: 'attack', caption: 'Ataque' },
    { field: 'defense', caption: 'Defensa' },
    { field: 'hp', caption: 'HP' },
  ];

  // simbolos de fontAwesome
  faMagnifyingGlass = faMagnifyingGlass;
  faPenToSquare = faPenToSquare;
  faTrashCanArrowUp = faTrashCanArrowUp;
  faPlus = faPlus;
  faFloppyDisk = faFloppyDisk;
  faxMark = faXmark;

  // Todos los pokemons de la DB
  pokemons: any[] = [];

  updateModal = false;
  newModal = false;

  showErrorSearchBar = false;

  numbersArray = Array(10)
    .fill(0)
    .map((x, i) => i + 1);

  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    attack: new FormControl('', Validators.required),
    defense: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    hp: new FormControl('', Validators.required),
  });

  newForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    attack: new FormControl('', Validators.required),
    defense: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    hp: new FormControl('', Validators.required),
  });

  updateId = 0;
  updateIndex = 0;

  constructor(private _tableService: TableService) {}

  ngOnInit() {
    this.getAllPokemons();
  }

  /**
   * Funcion para obtener los pokemones de la DB
   */
  getAllPokemons() {
    this._tableService.getAllPokemons().subscribe((data: any) => {
      this.pokemons = data;
    });
  }

  /**
   * Funcion para abrir el modal de update de un pokemon
   */
  openUpdateModal(pokemon: any, index: number) {
    this.updateModal = !this.updateModal;
    this.updateForm.setValue({
      name: pokemon.name,
      image: pokemon.image,
      attack: pokemon.attack,
      defense: pokemon.defense,
      type: pokemon.type,
      hp: pokemon.hp,
    });

    this.updateId = pokemon.id;
    this.updateIndex = index;
  }

  /**
   * Funcion para hacer la peticion de hacer update de un pokemon y manejar
   * la actualizacion en tiempo real.
   */

  updatePokemon() {
    this._tableService
      .updatePokemon(this.updateId, this.updateForm)
      .subscribe((data: any) => {
        this.pokemons[this.updateIndex] = data;
        this.updateForm.reset();
        this.updateModal = false;
      });
  }

  closeUpdateModal() {
    this.updateModal = false;
  }

  /**
   * Funcion para abrir el modal de update de un pokemon
   */
  openNewModal() {
    this.newModal = !this.newModal;
  }

  /**
   * Funcion para cerrar el modal de new pokemon
   */
  closeNewModal() {
    this.newModal = false;
  }

  /**
   * Funcion para hacer la peticion de hacer post de un pokemon y manejar
   * la actualizacion en tiempo real.
   */
  postPokemon() {
    this._tableService.postPokemon(this.newForm).subscribe((data: any) => {
      this.pokemons.push(data);
      this.newForm.reset();
      this.newModal = false;
    });
  }

  /**
   * Funcion para abrir el modal de create de un pokemon y manejar la actualiacion en tiempo real.
   */

  deletePokemon(id: number, index: number) {
    this._tableService.deletePokemon(id).subscribe((data: any) => {
      this.pokemons.splice(index, 1);
    });
  }

  /**
   * Funcion para obtener el id del pokemon seleccionado en la busqueda
   * y realizar la peticion a la DB
   * @param e evento del input de busqueda
   */
  getPokemonById(e: any) {
    console.log('Id recuperado del searchbar', e.target.value);
    const id = e.target.value;

    this._tableService.getPokemonById(id).subscribe((data: any) => {
      console.log('Pokemon encontrado', data);
      if (data) {
        this.pokemons = [data];
        this.showErrorSearchBar = false;
      } else {
        this.showErrorSearchBar = true;
      }
    });
  }

  /**
   * Funcion para obtener n pokemons de la DB
   * @param e evento del select
   */
  changeSelect(e: any) {
    const n = e.target.value;
    this._tableService.getNPokemons(n).subscribe((data: any) => {
      this.pokemons = data;
    });
  }
}
