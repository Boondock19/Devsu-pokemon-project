import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CentralizedService } from 'src/app/services/centralized.service';

import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;
  let controller : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [CentralizedService]
    });
    service = TestBed.inject(TableService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get all pokemons', () => {
    let pokemons : any[] | undefined

    const expectedResponse = [{
      "id": 2727,
      "name": "Metapod",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png",
      "attack": 1,
      "defense": 69,
      "hp": 100,
      "type": "Unknown",
      "id_author": 1
    }]

    service.getAllPokemons().subscribe((data:any) => {
      pokemons = data;
    })

    const request = controller.expectOne('https://bp-pokemons.herokuapp.com/?idAuthor=1');
    request.flush(expectedResponse)
    
    controller.verify();

    expect(pokemons).toEqual(expectedResponse)
  })

  it('Should get a pokemon by id', () => {
    let pokemon : {} | undefined

    const id = 3000;

    const expectedResponse = {
      "id": id,
      "name": "Pikachu",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
      "attack": 31,
      "defense": 64,
      "hp": 100,
      "type": "Unknown",
      "id_author": 1
    }

    

    service.getPokemonById(id).subscribe((data:any) => {
      pokemon = data;
    })

    const request = controller.expectOne(`https://bp-pokemons.herokuapp.com/${id}`);
    request.flush(expectedResponse)
    
    controller.verify();

    expect(pokemon).toEqual(expectedResponse)
  })


  it('Should get n pokemons', () => {
    let pokemon : any[] | undefined

    const n = 3;

    const expectedResponse = [
      {
          "id": 2659,
          "name": "Pikachu",
          "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
          "attack": 31,
          "defense": 64,
          "hp": 100,
          "type": "Unknown",
          "id_author": 1
      },
      {
          "id": 2662,
          "name": "vamo a calmarno 30",
          "image": "https://www.picng.com/upload/pokemon/png_pokemon_43608.png",
          "attack": 0,
          "defense": 56,
          "hp": 100,
          "type": "Base20",
          "id_author": 1
      },
      {
          "id": 2666,
          "name": "mewtwo",
          "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
          "attack": 93,
          "defense": 90,
          "hp": 1,
          "type": "Base",
          "id_author": 1
      }
  ]

    

    service.getNPokemons(n).subscribe((data:any) => {
      pokemon = data;
    })

    const request = controller.expectOne(`https://bp-pokemons.herokuapp.com/${n}?idAuthor=1`);
    request.flush(expectedResponse)
    
    controller.verify();

    expect(pokemon == expectedResponse && pokemon!.length == n).toBeTruthy();
    
  })

  it('Should update a pokemon with especific id', () => {
    const body = {
      "name": "Testing of Put",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
      "attack": 100,
      "defense": 100,
      "hp": 100,
      "type": "PUT",
      "idAuthor": 1
    }

    const id = 2727;

    const expectedResponse = {
      "id": id,
      "name": "Testing of Put",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
      "attack": 100,
      "defense": 100,
      "hp": 100,
      "type": "PUT",
      "id_author": 1
    }
     
    let res : {} | undefined;
    service.updatePokemon(id,body).subscribe((data:any) => {
      res = data;
    })

    const request = controller.expectOne(`https://bp-pokemons.herokuapp.com/${id}`);
    request.flush(expectedResponse)

    controller.verify();

    expect(res).toEqual(expectedResponse)
  })

  it('Should return empty res with wrong id', () => {
    const body = {
      "name": "Testing of Put",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
      "attack": 100,
      "defense": 100,
      "hp": 100,
      "type": "PUT",
      "idAuthor": 1
    }

    const id = 2727;

    const expectedResponse = null
     
    let res : {} | undefined | null;
    service.updatePokemon(id,body).subscribe((data:any) => {
      res = data;
    })

    const request = controller.expectOne(`https://bp-pokemons.herokuapp.com/${id}`);
    request.flush(expectedResponse)

    controller.verify();

    expect(res).toEqual(expectedResponse)
  })

  it('Should post a pokemon', () => {
    const body = {
      "name": "Testing of Post",
        "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
        "attack": 0,
        "defense": 0,
        "hp": 0,
        "type": "None",
        "idAuthor": 1
    }

    const id = 2730;

    const expectedResponse = {
      "id": id,
      "name": "Testing of Post",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
      "attack": 0,
      "defense": 0,
      "hp": 0,
      "type": "None",
      "id_author": 1
  }
     
    let res : {} | undefined;
    service.postPokemon(body).subscribe((data:any) => {
      res = data;
    })

    const request = controller.expectOne(`https://bp-pokemons.herokuapp.com/`);
    request.flush(expectedResponse)

    controller.verify();

    expect(res).toEqual(expectedResponse)
  })

  it('Should delete a pokemon by id', () => {
  
    const id = 2730;

    const expectedResponse =  {
      "success": true,
      "type": "pokemon_removed",
      "data": []
    }
     
    let res : {} | undefined;
    service.deletePokemon(id).subscribe((data:any) => {
      res = data;
    })

    const request = controller.expectOne(`https://bp-pokemons.herokuapp.com/${id}`);
    request.flush(expectedResponse)

    controller.verify();

    expect(res).toEqual(expectedResponse)
  })



 

});
