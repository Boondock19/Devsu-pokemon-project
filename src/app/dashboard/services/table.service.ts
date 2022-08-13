import { Injectable } from '@angular/core';
import { CentralizedService } from 'src/app/services/centralized.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  baseUrl = "https://bp-pokemons.herokuapp.com"

  constructor(private _centralizedService: CentralizedService) { }

  /**
   * Funcion que obtiene todos los pokemones
   * @returns Observable<any>
   */
  getAllPokemons() {
    return this._centralizedService.ExecutePetition( "?idAuthor=1", 'get', null)
  }

  /**
   * 
   * @param id id del pokemon a actualizar
   * @param body json con data
   * @returns Observable<any
   */
  updatePokemon(id:number,form:any) {
    const body = {
      ...form.value,
      idAuthor:1
    }
    
    return this._centralizedService.ExecutePetition( `${id}`, 'put', body)
  }
}
