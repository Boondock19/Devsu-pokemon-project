import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentralizedService {

  private baseUrl = "https://bp-pokemons.herokuapp.com"

  constructor(private _httpService : HttpClient) { }

  /**
   * 
   * Servicio que controla las peticiones de la app.
   * 
   * @param endpoint direccion del endpoint
   * @param method peticion a realizar
   * @param body json con los datos a enviar
   * @returns Observable<any>
   */

  ExecutePetition (endpoint : string, method : string, body : any) {
    const url = `${this.baseUrl}/${endpoint}`

    switch (method) {
      case 'post':
        return this._httpService.post(url, body)
        break
      case 'put':
        return this._httpService.put(url, body)
        break
      case 'delete':
        return this._httpService.delete(url)
      default:
        return this._httpService.get(url)
    }
  }
}
